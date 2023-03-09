# Powershell script to produce downscaled variants of an image or images in a given directory
# Requires ImageMagick
# Run with -Path <pathToImageOrDirectory>

param (
  [parameter(mandatory)]
  [validateScript({Test-Path $_})]
  [string]$path
)

$images = Get-ChildItem -Path $path -Recurse -Filter "*original*"

foreach ($image in $images) {
  $outputFilename2048 = $image.basename.substring(0, $image.basename.indexOf("original"))+"2048.jpg"
  $outputFilename1024 = $image.basename.substring(0, $image.basename.indexOf("original"))+"1024.jpg"

  magick.exe $image.fullname -resize 2048x2048 $outputFilename2048
  magick.exe $image.fullname -resize 1024x1024 $outputFilename1024
}
