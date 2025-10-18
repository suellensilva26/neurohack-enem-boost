param()
Add-Type -AssemblyName System.Drawing
$green=[System.Drawing.Color]::FromArgb(255,16,185,129)
$black=[System.Drawing.Color]::FromArgb(255,0,0,0)

function New-Icon($size, $path) {
  $bmp = New-Object System.Drawing.Bitmap($size,$size)
  $gfx = [System.Drawing.Graphics]::FromImage($bmp)
  $gfx.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $gfx.Clear($black)
  $margin = [int]([math]::Round($size * 0.12))
  $penWidth = [float]([math]::Round($size * 0.08))
  $pen = New-Object System.Drawing.Pen($green,$penWidth)
  $w = [int]($size - 2 * $margin)
  $h = [int]($size - 2 * $margin)
  $rect = New-Object System.Drawing.Rectangle($margin,$margin,$w,$h)
  $gfx.DrawEllipse($pen,$rect)
  $fontSize = [float]([math]::Round($size * 0.38))
  $font = New-Object System.Drawing.Font('Segoe UI',$fontSize,[System.Drawing.FontStyle]::Bold,[System.Drawing.GraphicsUnit]::Pixel)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
  $brush = New-Object System.Drawing.SolidBrush($green)
  $gfx.DrawString('NH',$font,$brush,[float]($size/2),[float]($size/2),$sf)
  $bmp.Save($path,[System.Drawing.Imaging.ImageFormat]::Png)
  $gfx.Dispose(); $bmp.Dispose()
}

function New-Maskable($size,$path){
  $bmp = New-Object System.Drawing.Bitmap($size,$size)
  $gfx = [System.Drawing.Graphics]::FromImage($bmp)
  $gfx.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $gfx.Clear($black)
  $margin = [int]([math]::Round($size * 0.22))
  $penWidth = [float]([math]::Round($size * 0.07))
  $pen = New-Object System.Drawing.Pen($green,$penWidth)
  $w = [int]($size - 2 * $margin)
  $h = [int]($size - 2 * $margin)
  $rect = New-Object System.Drawing.Rectangle($margin,$margin,$w,$h)
  $gfx.DrawEllipse($pen,$rect)
  $fontSize = [float]([math]::Round($size * 0.32))
  $font = New-Object System.Drawing.Font('Segoe UI',$fontSize,[System.Drawing.FontStyle]::Bold,[System.Drawing.GraphicsUnit]::Pixel)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
  $brush = New-Object System.Drawing.SolidBrush($green)
  $gfx.DrawString('NH',$font,$brush,[float]($size/2),[float]($size/2),$sf)
  $bmp.Save($path,[System.Drawing.Imaging.ImageFormat]::Png)
  $gfx.Dispose(); $bmp.Dispose()
}

New-Item -ItemType Directory -Force -Path 'public/icons' | Out-Null
New-Icon 72 'public/icons/icon-72x72.png'
New-Icon 144 'public/icons/icon-144x144.png'
New-Icon 192 'public/icons/icon-192x192.png'
New-Icon 512 'public/icons/icon-512x512.png'
New-Maskable 512 'public/icons/icon-512x512-maskable.png'