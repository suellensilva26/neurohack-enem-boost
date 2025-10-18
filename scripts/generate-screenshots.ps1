param()
Add-Type -AssemblyName System.Drawing
$green=[System.Drawing.Color]::FromArgb(255,16,185,129)
$black=[System.Drawing.Color]::FromArgb(255,0,0,0)

function New-Screenshot($w,$h,$text,$path){
  $bmp = New-Object System.Drawing.Bitmap($w,$h)
  $gfx = [System.Drawing.Graphics]::FromImage($bmp)
  $gfx.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $gfx.Clear($black)
  $fontTitle = New-Object System.Drawing.Font('Segoe UI', 48, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
  $brush = New-Object System.Drawing.SolidBrush($green)
  $gfx.DrawString($text,$fontTitle,$brush,[float]($w/2),[float]($h/2),$sf)
  $bmp.Save($path,[System.Drawing.Imaging.ImageFormat]::Png)
  $gfx.Dispose(); $bmp.Dispose()
}

New-Item -ItemType Directory -Force -Path 'public/screenshots' | Out-Null
New-Screenshot 540 720 'Home' 'public/screenshots/home.png'
New-Screenshot 540 720 'Quiz' 'public/screenshots/quiz.png'