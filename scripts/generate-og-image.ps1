param()
Add-Type -AssemblyName System.Drawing
$green=[System.Drawing.Color]::FromArgb(255,16,185,129)
$black=[System.Drawing.Color]::FromArgb(255,0,0,0)
$bmp = New-Object System.Drawing.Bitmap(1200,630)
$gfx = [System.Drawing.Graphics]::FromImage($bmp)
$gfx.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$gfx.Clear($black)
$fontTitle = New-Object System.Drawing.Font('Segoe UI', 72, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fontSubtitle = New-Object System.Drawing.Font('Segoe UI', 36, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$brush = New-Object System.Drawing.SolidBrush($green)
$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = [System.Drawing.StringAlignment]::Center
$gfx.DrawString('NeuroHack ENEM',$fontTitle,$brush,[float]600,[float]240,$sf)
$gfx.DrawString('Aprovação com IA e Neurociência',$fontSubtitle,$brush,[float]600,[float]360,$sf)
$bmp.Save('public/og-image.png',[System.Drawing.Imaging.ImageFormat]::Png)
$gfx.Dispose(); $bmp.Dispose()