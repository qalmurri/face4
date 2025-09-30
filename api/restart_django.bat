@echo off

cd "auth\api\api\__pycache__"
dir /b | findstr "." >nul
if %errorlevel%==0 (
    echo "auth\api\api\__pycache__" Found. Delete
    del /f /q *.*
    echo Successfully deleted
) else (
    echo No file
)

cd "..\..\accounts\__pycache__"
dir /b | findstr "." >nul
if %errorlevel%==0 (
    echo "..\..\accounts\__pycache__" Found. Delete
    del /f /q *.*
    echo Successfully deleted
) else (
    echo No file
)

cd "..\migrations\__pycache__"
dir /b | findstr "." >nul
if %errorlevel%==0 (
    echo "..\migrations\__pycache__" Found. Delete
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

cd "..\..\..\core\Scripts\"
call activate.bat

cd "..\..\api"
if exist db.sqlite3 (
    echo Delete db.sqlite3
    del db.sqlite3
    echo succeed
) else (
    echo No file db.sqlite3
)
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
