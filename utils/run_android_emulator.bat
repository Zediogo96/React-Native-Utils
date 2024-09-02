@REM This batch file is used to run the Android emulator for example directly from the Desktop on Windows, 
@REM as I was getting tired of opening Android Studio all the time eheh

@REM In this case, the emulator used has the identifier Pixel_8_API_34, adjust accordingly:
set android_name=Pixel_8_API_34

@echo off
cd %LOCALAPPDATA%\Android\Sdk\emulator
emulator.exe -avd %android_name%