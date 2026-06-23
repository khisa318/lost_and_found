# Lost & Found Platform

A full-stack web application that helps users report and find lost or found items in their community. Users can browse listings, report items, and admins can manage the platform.

## Project Overview

The Lost & Found platform is a community-driven application that simplifies the process of reporting and locating lost or found items. It features:

- **User Authentication**: Secure login system for regular users and admins
- **Item Browsing**: Browse all lost and found items with search and filtering
- **Item Reporting**: Users can report items as lost or found
- **Item Details**: View detailed information about specific items
- **Admin Dashboard**: Admins can manage and moderate all reported items
- **Protected Routes**: Role-based access control for admin and user dashboards
- **Responsive Design**: Built with Tailwind CSS for mobile-friendly experience

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client for API calls
- **ESLint** - Code linting

### Backend
- **Flask** - Web framework
- **Flask-SQLAlchemy** - Database ORM
- **Flask-CORS** - Cross-origin request handling
- **SQLite** - Database

## Project Structure

```
lost-and-found/
├── src/                          # Frontend (React)
│   ├── pages/
│   │   ├── Home.jsx              # Landing page with hero and CTAs
│   │   ├── Items.jsx             # Browse/search items page
│   │   ├── ItemsDetailPage.jsx   # Individual item details
│   │   ├── About.jsx             # How the platform works
│   │   ├── Admin.jsx             # Admin login/entry
│   │   ├── AdminDashboard.jsx    # Admin management dashboard
│   │   ├── UserDashboard.jsx     # User dashboard
│   │   ├── AuthUser.jsx          # User login/registration
│   │   ├── Navbar.jsx            # Navigation component
│   │   ├── ProtectedRoute.jsx    # Route protection wrapper
│   │   └── NotFoundPage.jsx      # 404 page
│   ├── App.jsx                   # Main app with routing
│   ├── api.js                    # API client calls
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── server/                        # Backend (Flask)
│   ├── app.py                    # Main Flask application
│   ├── seed.py                   # Database seeding script
│   ├── requirements.txt          # Python dependencies
│   └── instance/                 # Instance folder (database, config)
├── public/                        # Static assets
├── package.json                  # Frontend dependencies
├── vite.config.js                # Vite configuration
├── eslint.config.js              # ESLint configuration
└── README.md                     # This file
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- pip (Python package manager)

### Frontend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

### Backend Setup

1. **Navigate to the server directory**
   ```bash
   cd server
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python -m venv venv
   source venv/bin/activate     # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Seed the database** (optional - populates sample data)
   ```bash
   python seed.py
   ```

5. **Run the Flask server**
   ```bash
   python app.py
   ```
   The backend API will be available at `http://localhost:5000/api`

## Running the Application

To run the complete application, you need both frontend and backend running:

### Terminal 1: Frontend
```bash
npm run dev
```

### Terminal 2: Backend
```bash
cd server
python app.py
```

Then open your browser and navigate to `http://localhost:5173`

## How It Works

### User Flow

1. **Home Page**: Users land on the home page with information about the platform
2. **Browse Items**: Users can visit `/items` to browse all reported lost and found items
3. **Item Details**: Clicking an item shows detailed information at `/items/:id`
4. **Authentication**: Users can log in via `/login` or admin login at `/admin`
5. **User Dashboard**: Authenticated users can access their dashboard at `/user-dashboard`
6. **Admin Dashboard**: Admins can access management features at `/admin-dashboard`

### Authentication System

The platform uses a token-based authentication system:
- Users log in with their credentials
- The username is used as a session token
- Token is sent via `Authorization` header in API requests
- Protected routes verify the token before allowing access

### Database Models

**User**
- Stores user credentials (username, email, password)
- Links to items reported by the user

**Admin**
- Stores admin usernames with elevated permissions

**Item**
- Represents lost or found items
- Connected to the user who reported it

## Available Scripts

### Frontend Scripts
- `npm run dev` — Start Vite development server
- `npm run build` — Build production bundle
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint code linter

### Backend Scripts
- `python app.py` — Start Flask development server
- `python seed.py` — Populate database with sample data

## API Endpoints

The backend provides RESTful API endpoints at `http://localhost:5000/api`:

- `GET /api/items` — Fetch all items
- `GET /api/items/:id` — Fetch a specific item
- `POST /api/items` — Create a new item (requires auth)
- `POST /api/login` — User login
- `POST /api/admin-login` — Admin login
- Additional endpoints for user and admin management

## Key Features

✅ **Browse Lost & Found Items** - View all community reports  
✅ **Search & Filter** - Find specific items easily  
✅ **Report Items** - Users can report lost or found items  
✅ **User Authentication** - Secure login system  
✅ **Admin Panel** - Manage and moderate content  
✅ **Item Details** - Comprehensive information about each item  
✅ **Responsive Design** - Works on desktop and mobile  
✅ **Protected Routes** - Role-based access control  

## Development Tips

- The backend runs on port `5000` and must be started for API calls to work
- The frontend runs on port `5173` by default
- CORS is enabled on the backend for local development
- Database is stored as SQLite in `server/instance/app.db`
- Use `npm run lint` to check code quality before committing

## Troubleshooting

**Frontend can't connect to backend?**
- Ensure the Flask server is running on `http://localhost:5000`
- Check that CORS is enabled in `server/app.py`

**Database errors?**
- Delete `server/instance/app.db` and run `python seed.py` again
- Make sure you're in the correct directory when running scripts

**Port already in use?**
- Change Vite port: `npm run dev -- --port 3000`
- Change Flask port in `server/app.py`: modify `app.run(port=5000)`

## Future Enhancements

Potential features for future versions:
- Image uploads for items
- Email notifications
- Advanced search filters
- Item status tracking (resolved/closed)
- User reviews and ratings
- Map view for item locations

## License

This project is open source and available for educational purposes.
 