# LuxAI Tools - Premium AI Productivity Suite

A luxury-style AI productivity application featuring advanced tools for text summarization, translation, and meeting notes generation. Built with Next.js, Django, Redis, and styled with elegant glassmorphic UI components powered by TailwindCSS and GSAP animations.

## 🎨 Features

### Frontend (Next.js)
- **Landing Page**: Cinematic intro with particle animations and smooth transitions
- **Glassmorphic Design**: Elegant frosted glass cards with premium styling
- **Smooth Animations**: GSAP-powered interactions and transitions
- **Responsive Layout**: Mobile-first design with Tailwind CSS
- **Interactive Dashboard**: Real-time productivity metrics with Recharts

### Tools
1. **Summarizer** 📝
   - Input lengthy text
   - AI-powered summarization
   - Language-specific summaries
   - Character count statistics

2. **Translator** 🌐
   - Support for 50+ languages with flag icons
   - Premium dropdown selector with animated language flags
   - Real-time translation feedback
   - Cached translations for performance

3. **Meeting Note Generator** 📊
   - Upload meeting transcripts (TXT, PDF, DOCX)
   - Auto-generate polished notes
   - Elegant timeline visualization
   - Key moments extraction

### Dashboard
- Productivity metrics visualization
- Activity trends (6-month chart)
- Tool usage distribution (pie chart)
- Performance comparison (bar chart)
- Beautiful statistics cards

### Backend (Django)
- RESTful API endpoints for all tools
- Redis caching for performance
- AI model integration (transformers)
- Comprehensive error handling
- Database models for analytics

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Styling**: TailwindCSS 3.3
- **Animations**: GSAP 3.12
- **Charts**: Recharts 2.10
- **HTTP Client**: Axios 1.6
- **Icons**: Lucide React

### Backend
- **Framework**: Django 4.2
- **API**: Django REST Framework 3.14
- **Cache**: Redis 5.0
- **AI/ML**: Transformers, Torch
- **Task Queue**: Celery 5.3
- **CORS**: django-cors-headers

## 📋 Project Structure

```
LuxAI-Tools/
├── frontend/                 # Next.js application
│   ├── app/                 # App directory
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Landing page
│   │   ├── summarizer/      # Summarizer page
│   │   ├── translator/      # Translator page
│   │   ├── meeting-notes/   # Meeting notes page
│   │   └── dashboard/       # Dashboard page
│   ├── components/          # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── GlassmorphicCard.tsx
│   │   └── OutputCard.tsx
│   ├── lib/                 # Utilities
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/                  # Django application
│   ├── config/              # Django configuration
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── api/                 # API app
│   │   ├── views.py         # API endpoints
│   │   ├── serializers.py   # Request/response serializers
│   │   ├── services.py      # AI processing services
│   │   ├── models.py        # Database models
│   │   ├── urls.py
│   │   └── admin.py
│   ├── manage.py
│   └── requirements.txt
│
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.9+
- Node.js 16+
- Redis server
- pip & npm/yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment** (Windows)
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```
   
   (macOS/Linux)
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**
   ```bash
   # Create .env file
   copy .env
   # Edit .env with your settings
   ```

5. **Run migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser** (optional)
   ```bash
   python manage.py createsuperuser
   ```

7. **Start Django development server**
   ```bash
   python manage.py runserver
   ```
   Server runs on: http://localhost:8000

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment**
   ```bash
   # Edit .env.local
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Frontend runs on: http://localhost:3000

### Redis Setup

1. **Install Redis** (if not already installed)
   - Windows: Download from https://github.com/microsoftarchive/redis/releases
   - macOS: `brew install redis`
   - Linux: `sudo apt-get install redis-server`

2. **Start Redis server**
   ```bash
   redis-server
   ```
   Default: localhost:6379

## 📡 API Endpoints

### Summarization
```
POST /api/summarize/
Content-Type: application/json

{
  "text": "Your text here...",
  "language": "english"
}
```

### Translation
```
POST /api/translate/
Content-Type: application/json

{
  "text": "Text to translate",
  "target_language": "es"  # es, fr, de, it, pt, ja, zh, ko
}
```

### Meeting Notes
```
POST /api/meeting-notes/
Content-Type: multipart/form-data

file: <transcript file or>
transcript: "Meeting transcript text"
```

### Statistics
```
GET /api/stats/
```

### Health Check
```
GET /api/health/
```

## 🎯 Usage Examples

### Summarizing Text
1. Navigate to Summarizer page
2. Paste or type your text (minimum 100 characters)
3. Select language preference
4. Click "Summarize"
5. View results in luxury-styled output cards

### Translating Content
1. Go to Translator page
2. Enter text to translate
3. Select target language from premium dropdown
4. Click "Translate"
5. View translation with flag icon

### Generating Meeting Notes
1. Visit Meeting Notes page
2. Upload transcript file (TXT, PDF, DOCX) or paste text
3. Click "Generate Notes"
4. View polished notes and timeline visualization

### Viewing Dashboard
1. Access Dashboard from navbar
2. View productivity metrics
3. Monitor activity trends
4. Check tool usage distribution

## 🎨 Design Features

- **Glassmorphic Cards**: Semi-transparent frosted glass effect with backdrop blur
- **Luxury Color Palette**: Gold (#d4af37) accents on deep navy background
- **Glow Effects**: Subtle glowing borders and shadows on interactive elements
- **Smooth Animations**: GSAP-powered transitions and hover effects
- **Particle Background**: Animated particle system on landing page
- **Responsive Grid**: Adapts seamlessly from mobile to desktop
- **Premium Typography**: Elegant font stack with proper hierarchy

## 🔐 Security Considerations

- Change `SECRET_KEY` in production
- Set `DEBUG=False` in production
- Use environment variables for sensitive data
- Enable HTTPS in production
- Configure proper CORS settings
- Use database authentication in production

## 📈 Performance Optimizations

- Redis caching for API responses (24-hour TTL)
- GSAP animations using GPU acceleration
- Lazy loading for chart components
- Optimized image compression
- CSS minification via Tailwind

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
npm start
```

### Backend (Heroku/Railway/PythonAnywhere)
```bash
pip install gunicorn
gunicorn config.wsgi
```

## 📝 License

This project is created as a demonstration of modern web development practices.

## 🤝 Support

For issues, questions, or improvements, please refer to the project documentation.

---

**Built with ✨ luxury and intelligence**

Version: 1.0.0
Last Updated: December 2025
