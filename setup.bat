@echo off
REM LuxAI Tools - Development Environment Setup Script (Windows)

echo.
echo 🚀 Setting up LuxAI Tools Development Environment...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python not found. Please install Python 3.9+
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found. Please install Node.js 16+
    exit /b 1
)

echo ✅ Python and Node.js found

REM Setup Backend
echo.
echo 📦 Setting up Backend...
cd backend

REM Create virtual environment
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

REM Run migrations
echo Running database migrations...
python manage.py migrate

echo ✅ Backend setup complete

REM Setup Frontend
echo.
echo 📦 Setting up Frontend...
cd ..\frontend

REM Install dependencies
echo Installing Node dependencies...
npm install

echo ✅ Frontend setup complete

echo.
echo 🎉 Setup complete!
echo.
echo To start development:
echo   Backend:  cd backend ^&^& venv\Scripts\activate ^&^& python manage.py runserver
echo   Frontend: cd frontend ^&^& npm run dev
echo   Redis:    redis-server
echo.
