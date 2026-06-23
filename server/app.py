from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from functools import wraps

app = Flask(__name__)
# Enable CORS for your local frontend dev environment (Vite default port 5173)
CORS(app)

# Configure database filepath mapping
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


# --- ROUTE GUARD DECORATORS (TOKEN SYSTEM VERIFICATION) ---

def require_user_auth(f):
    """
    Looks at the incoming HTTP request Authorization header, extracts the user 
    session identifier, and injects the User context directly into protected routes.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token_identifier = request.headers.get('Authorization')
        
        # Since we use the username as the active session token string, look it up directly
        user = User.query.filter_by(username=token_identifier).first() if token_identifier else None
        if not user or not token_identifier:
            return jsonify({"success": False, "message": "Access Denied: Valid user session token required."}), 401
        return f(user, *args, **kwargs)
    return decorated


# --- DATABASE RELATIONAL SCHEMAS ---

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    emailadress = db.Column(db.String(100), unique=True, nullable=False) # Standardized database schema naming format
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    
    # Establish dynamic link: a user profile can track many reported missing items
    items = db.relationship('Item', backref='reporter', lazy=True)

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50))
    status = db.Column(db.String(20), nullable=False) # 'Lost' or 'Found'
    location = db.Column(db.String(100))
    foundBy = db.Column(db.String(100))
    date = db.Column(db.String(20), default=lambda: datetime.today().strftime("%Y-%m-%d"))
    description = db.Column(db.Text)
    
    # Foreign Key Linkage: References the specific primary ID row of the user who owns this record
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

    def to_dict(self):
        """Transforms relational data records into plain JSON dictionaries for your UI loops"""
        return {
            "id": self.id,
            "title": self.title,
            "category": self.category,
            "status": self.status,
            "location": self.location,
            "foundBy": self.foundBy,
            "date": self.date,
            "description": self.description,
            "user_id": self.user_id
        }


# --- CONTROL ROUTE ENDPOINTS ---

# 1. ITEM INVENTORY CONTROL ROUTING MANAGER
@app.route('/api/items', methods=['GET', 'POST'])
def handle_global_items():
    if request.method == 'POST':
        data = request.get_json() or {}
        
        # Pull optional authorization header to see if the item submission belongs to a logged-in account
        token_identifier = request.headers.get('Authorization')
        current_user = User.query.filter_by(username=token_identifier).first() if token_identifier else None

        new_item = Item(
            title=data.get('title'),
            category=data.get('category'),
            status=data.get('status', 'Found'),
            location=data.get('location'),
            foundBy=current_user.username if current_user else data.get('foundBy', 'Community Reporter'),
            date=datetime.today().strftime("%Y-%m-%d"),
            description=data.get('description'),
            user_id=current_user.id if current_user else None # Attaches user key ownership context safely
        )

        if not new_item.title or not new_item.category:
            return jsonify({"success": False, "message": "Missing required fields: Title and Category are mandatory."}), 400

        db.session.add(new_item)
        db.session.commit()
        return jsonify({"success": True, "message": "Item reported successfully!", "item": new_item.to_dict()}), 201
    
    db_items = Item.query.all()
    return jsonify([item.to_dict() for item in db_items]), 200


@app.route('/api/items/<int:item_id>', methods=['GET', 'DELETE'])
def handle_single_item(item_id):
    item = Item.query.get(item_id)
    if not item:
        return jsonify({"success": False, "message": "Target item not found inside database registers."}), 404
        
    if request.method == 'DELETE':
        db.session.delete(item)
        db.session.commit()
        return jsonify({"success": True, "message": "Item dropped from active logging records successfully."}), 200

    return jsonify(item.to_dict()), 200


# 2. SYSTEM ADMINISTRATION PIPELINE (WITH TOKENS)
@app.route('/api/admin', methods=['POST'])
def admin_login():
    data = request.get_json() or {}
    username = data.get('username')
    password = data.get('password')

    admin = Admin.query.filter_by(username=username).first()
    if admin and admin.password == password:
        return jsonify({
            "success": True, 
            "message": "Administrative credentials cleared.",
            # Emits both variables to cover any differences in your admin components
            "token": "secret_admin_token_string",
            "adminToken": "secret_admin_token_string"
        }), 200
    return jsonify({"success": False, "message": "Invalid administrative credentials."}), 401


# 3. PUBLIC PUBLIC USER REGISTER & LOGIN PIPELINE (WITH TOKENS)
@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.get_json() or {}
    emailadress = data.get('email') or data.get('emailadress')
    username = data.get('username')
    password = data.get('password')

    if not emailadress or not username or not password:
        return jsonify({"success": False, "message": "Registration parameters missing."}), 400

    existing_user = User.query.filter((User.emailadress == emailadress) | (User.username == username)).first()
    if existing_user:
        return jsonify({"success": False, "message": "Username or email is already registered to another user profile."}), 400

    new_user = User(emailadress=emailadress, username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"success": True, "message": "Community profile created successfully!"}), 201


@app.route('/api/login', methods=['POST'])
def login_user():
    data = request.get_json() or {}
    identity = data.get('email') or data.get('emailadress') or data.get('username')
    password = data.get('password')

    if not identity or not password:
        return jsonify({"success": False, "message": "Email address and password variables are required."}), 400

    # Smart Search: Matches identity string to either username OR email column rows
    user = User.query.filter((User.username == identity) | (User.emailadress == identity)).first()
    
    if user and user.password == password:
        return jsonify({
            "success": True, 
            "message": "User validation authorized.", 
            "username": user.username,
            # CONFIGURATION FIX: Returns token as your username string to provide what frontend state reads
            "token": user.username 
        }), 200
    return jsonify({"success": False, "message": "Invalid credentials. Please verify data and try again."}), 401


# 4. PROTECTED HISTORY RECORDS FOR USER PROFILES
@app.route('/api/user/items', methods=['GET'])
@require_user_auth
def get_user_items(current_user):
    """
    Intercepted path: delivers a targeted array list containing only the items 
    reported by the user who passed token validation.
    """
    user_items = Item.query.filter_by(user_id=current_user.id).all()
    return jsonify([item.to_dict() for item in user_items]), 200


# --- INIT APP LIFECYCLE CONTROLLERS ---
if __name__ == '__main__':
    with app.app_context():
        db.create_all() 
    app.run(debug=True, port=5000)