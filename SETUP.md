# LuxAI Tools - Setup Guide

## Quick Start

### 1. Backend Setup (5 minutes)

```bash
cd backend

# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

Backend URL: http://localhost:8000

### 2. Frontend Setup (5 minutes)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend URL: http://localhost:3000

### 3. Redis Setup

**Windows:**
1. Download from: https://github.com/microsoftarchive/redis/releases
2. Run redis-server.exe

**macOS:**
```bash
brew install redis
redis-server
```

**Linux:**
```bash
sudo apt-get install redis-server
sudo systemctl start redis-server
```

## File Structure

```
LuxAI-Tools/
├── frontend/
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── summarizer/        # Summarizer tool
│   │   ├── translator/        # Translator tool
│   │   ├── meeting-notes/     # Meeting notes generator
│   │   └── dashboard/         # Analytics dashboard
│   ├── components/            # Reusable UI components
│   ├── globals.css           # Global styles
│   └── package.json
│
├── backend/
│   ├── api/
│   │   ├── views.py          # API endpoints
│   │   ├── services.py       # AI processing
│   │   ├── models.py         # Database models
│   │   └── serializers.py    # Request validation
│   ├── config/
│   │   ├── settings.py       # Django config
│   │   └── urls.py           # URL routing
│   ├── manage.py
│   └── requirements.txt
│
└── README.md
```

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/summarize/ | Summarize text |
| POST | /api/translate/ | Translate text |
| POST | /api/meeting-notes/ | Generate meeting notes |
| GET | /api/stats/ | Get productivity stats |
| GET | /api/health/ | Health check |

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Backend (.env)
```
DEBUG=True
SECRET_KEY=your-secret-key
REDIS_URL=redis://localhost:6379
ALLOWED_HOSTS=localhost,127.0.0.1
```

## Troubleshooting

**Port already in use?**
```bash
# Frontend (use different port)
npm run dev -- -p 3001

# Backend (use different port)
python manage.py runserver 8001
```

**Redis connection error?**
- Ensure Redis server is running
- Check REDIS_URL in backend .env

**Module not found errors?**
- Frontend: `npm install`
- Backend: `pip install -r requirements.txt`

## Next Steps

1. Explore the landing page at http://localhost:3000
2. Try the Summarizer tool
3. Test the Translator with different languages
4. Upload meeting transcripts to Meeting Notes
5. View productivity stats in Dashboard
6. Check API responses in browser DevTools

## Admin Panel

Access Django admin at: http://localhost:8000/admin

Create superuser:
```bash
python manage.py createsuperuser
```

## Features Overview

✨ **Luxury UI** - Glassmorphic cards with gold accents
🎬 **Animations** - GSAP-powered smooth transitions
🤖 **AI Tools** - Summarization, translation, meeting notes
📊 **Dashboard** - Real-time productivity metrics
🔄 **Caching** - Redis for optimal performance
📱 **Responsive** - Works on all devices

---

Enjoy your LuxAI Tools! 🚀
