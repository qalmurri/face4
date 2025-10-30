@echo off
cd "data\api\api\__pycache__"
dir /b | findstr "." >nul
if %errorlevel%==0 (
    echo "data\api\api\__pycache__" Found.
    dir
    del /f /q *.*
    echo Successfully deleted
) else (
    echo No file
)
cd "..\..\accounts\__pycache__"
dir /b | findstr "." >nul
if %errorlevel%==0 (
    echo "..\..\accounts\__pycache__" Found.
    dir
    del /f /q *.*
    echo Successfully deleted
) else (
    echo No file
)
cd "..\migrations\__pycache__"
dir /b | findstr "." >nul
if %errorlevel%==0 (
    echo "..\migrations\__pycache__" Found.
    dir
    del /f /q *.*
    echo Successfully deleted
) else (
    echo No file
)
cd "..\"
for %%F in (*) do (
    if /I NOT "%%F"=="__init__.py" (
        if NOT "%%~xF"=="" (
            echo Delete: %%F
            del "%%F"
        )
    )
)
cd "..\..\"
cd "authentication\__pycache__"
dir /b | findstr "." >nul
if %errorlevel%==0 (
    echo "authentication\__pycache__" Found.
    dir
    del /f /q *.*
    echo Successfully deleted
) else (
    echo No file
)
cd "..\migrations\__pycache__"
dir /b | findstr "." >nul
if %errorlevel%==0 (
    echo "..\migrations\__pycache__" Found.
    dir
    del /f /q *.*
    echo Successfully deleted
) else (
    echo No file
)
cd "..\"
for %%F in (*) do (
    if /I NOT "%%F"=="__init__.py" (
        if NOT "%%~xF"=="" (
            echo Delete: %%F
            del "%%F"
        )
    )
)
cd "..\..\"
cd "request\__pycache__"
dir /b | findstr "." >nul
if %errorlevel%==0 (
    echo "request\__pycache__" Found.
    dir
    del /f /q *.*
    echo Successfully deleted
) else (
    echo No file
)
cd "..\migrations\__pycache__"
dir /b | findstr "." >nul
if %errorlevel%==0 (
    echo "..\migrations\__pycache__" Found.
    dir
    del /f /q *.*
    echo Successfully deleted
) else (
    echo No file
)
cd "..\"
for %%F in (*) do (
    if /I NOT "%%F"=="__init__.py" (
        if NOT "%%~xF"=="" (
            echo Delete: %%F
            del "%%F"
        )
    )
)
cd "..\..\"
if exist db.sqlite3 (
    echo Delete db.sqlite3
    del db.sqlite3
    echo succeed
) else (
    echo No file db.sqlite3
)

cd "utils\__pycache__"
dir /b | findstr "." >nul
if %errorlevel%==0 (
    echo "utils\__pycache__" Found.
    dir
    del /f /q *.*
    echo Successfully deleted
) else (
    echo No file
)
cd "..\..\"
dir
pause