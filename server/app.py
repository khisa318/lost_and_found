from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS so your frontend (React/Vite) can fetch this data without blocks
CORS(app)

# Combined, comprehensive items array
ITEMS = [
    {
        "id": 1,
        "title": "Black wallet",
        "category": "Wallet",
        "status": "Lost",
        "location": "Main Hall",
        "foundBy": "",
        "date": "2026-06-10",
        "description": "Black leather wallet with 3 cards inside.",
    },
    {
        "id": 2,
        "title": "Keys (car + house)",
        "category": "Keys",
        "status": "Found",
        "location": "Library entrance",
        "foundBy": "Community report",
        "date": "2026-06-14",
        "description": "Two keys with a red keychain.",
    },
    {
        "id": 3,
        "title": "Blue backpack",
        "category": "Bag",
        "status": "Lost",
        "location": "Sports building",
        "foundBy": "",
        "date": "2026-06-08",
        "description": "Blue backpack with a water bottle pocket.",
    },
    {
        "id": 4,
        "title": "Student ID card",
        "category": "ID",
        "status": "Found",
        "location": "Cafeteria",
        "foundBy": "Community report",
        "date": "2026-06-16",
        "description": "ID card with photo; name visible.",
    },
]

@app.route('/api/items', methods=['GET'])
def get_items():
    # Returns the complete list of items matching the requested keys
    return jsonify(ITEMS)

if __name__ == '__main__':
    # Runs the server locally on http://127.0.0.1:5000
    app.run(debug=True, port=5000)