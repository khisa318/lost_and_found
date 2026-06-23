from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configure your database file name
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Model tracking all properties matching your React component layout
class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50))
    status = db.Column(db.String(20), nullable=False) # 'Lost' or 'Found'
    location = db.Column(db.String(100))
    foundBy = db.Column(db.String(100))
    date = db.Column(db.String(20), default=datetime.utcnow)
    description = db.Column(db.Text)

    def to_dict(self):
        """Converts database records directly into JSON format for your frontend"""
        return {
            "id": self.id,
            "title": self.title,
            "category": self.category,
            "status": self.status,
            "location": self.location,
            "foundBy": self.foundBy,
            "date": self.date,
            "description": self.description
        }

@app.route('/api/items', methods=['GET' , 'POST'])
def get_items():
    if request.method == 'POST':
        data = request.get_json() or {} # Fallback to empty dict if payload missing)

        new_item = Item(
            title=data.get('title'),
            category=data.get('category'),
            status="Found",
            location=data.get('location'),
            foundBy="Community Reporter",
            date=datetime.today().strftime("%Y-%m-%d"),
            description=data.get('description')
        )

        if not new_item.title or not new_item.category:
            return jsonify({"error": "Missing required fields"}), 400
        

        db.session.add(new_item)
        db.session.commit()

        return jsonify({"success": True, "message": "Item reported successfully!", "item": new_item.to_dict()}), 201
    
    db_items = Item.query.all()
    return jsonify([item.to_dict() for item in db_items])

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)  # In production, store hashed passwords

# FIXED: Changed methods to ['POST'] so it can accept login credentials securely
@app.route('/api/admin', methods=['POST'])
def admin_login():
    data = request.get_json() or {} # Fallback to empty dict if payload missing
    username = data.get('username')
    password = data.get('password')

    # Simple admin authentication verification logic
    admin = Admin.query.filter_by(username=username).first()
    if admin and admin.password == password:
        return jsonify({"success": True, "message": "Login successful"}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401\
        
@app.route('/api/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = Item.query.get(item_id)

    if not item:
        return jsonify({
            "message": "Item not found"
        }), 404

    return jsonify(item.to_dict())
if __name__ == '__main__':
    with app.app_context():
        db.create_all() # Recreates app.db structure automatically
    app.run(debug=True, port=5000)