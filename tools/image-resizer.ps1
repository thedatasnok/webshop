# Powershell script to produce downscaled variants of an image

param (
  [Parameter(Mandatory)]
  [ValidateScript({Test-Path $_})]
  [string]$Path
)

mkdir output
magick.exe $Path -resize 2048x2048 output\2048.jpg
magick.exe $Path -resize 1024x1024 output\1024.jpg
