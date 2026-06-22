from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Comprehensive dataset containing 12 distinct items
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
    {
        "id": 5,
        "title": "iPhone 15 Pro",
        "category": "Electronics",
        "status": "Lost",
        "location": "Science Lab B",
        "foundBy": "",
        "date": "2026-06-18",
        "description": "Titanium gray finish with a clear plastic case. Lock screen has a mountain wallpaper.",
    },
    {
        "id": 6,
        "title": "Silver Wedding Band",
        "category": "Jewelry",
        "status": "Found",
        "location": "Gymnasium Locker Rooms",
        "foundBy": "Staff assignment",
        "date": "2026-06-19",
        "description": "Simple silver band with a small inscription on the inside curve.",
    },
    {
        "id": 7,
        "title": "Sony WH-1000XM4 Headphones",
        "category": "Electronics",
        "status": "Lost",
        "location": "Student Lounge",
        "foundBy": "",
        "date": "2026-06-11",
        "description": "Black over-ear noise-canceling headphones inside a dark gray zip case.",
    },
    {
        "id": 8,
        "title": "Hydro Flask Water Bottle",
        "category": "Other",
        "status": "Found",
        "location": "Auditorium Row G",
        "foundBy": "Community report",
        "date": "2026-06-20",
        "description": "Olive green 32oz wide-mouth bottle covered in various skate brand stickers.",
    },
    {
        "id": 9,
        "title": "Ray-Ban Wayfarer Sunglasses",
        "category": "Accessories",
        "status": "Lost",
        "location": "Courtyard Benches",
        "foundBy": "",
        "date": "2026-06-15",
        "description": "Classic black frames with dark green lenses. Left arm is slightly loose.",
    },
    {
        "id": 10,
        "title": "MacBook Air M2 Charging Brick",
        "category": "Electronics",
        "status": "Found",
        "location": "Computer Lab 3",
        "foundBy": "Staff assignment",
        "date": "2026-06-21",
        "description": "White 35W dual USB-C port power adapter with a 2-meter braided cable attached.",
    },
    {
        "id": 11,
        "title": "Denim Jacket",
        "category": "Clothing",
        "status": "Lost",
        "location": "Campus Library 2nd Floor",
        "foundBy": "",
        "date": "2026-06-13",
        "description": "Light wash oversized denim jacket with bronze buttons. Left pocket has a black pen inside.",
    },
    {
        "id": 12,
        "title": "Leather Pencil Case",
        "category": "Other",
        "status": "Found",
        "location": "Mathematics Seminar Room",
        "foundBy": "Community report",
        "date": "2026-06-22",
        "description": "Brown vintage zip pouch containing 3 premium mechanical pencils and a metal ruler.",
    },
]

@app.route('/api/items', methods=['GET'])
def get_items():
    return jsonify(ITEMS)

if __name__ == '__main__':
    app.run(debug=True, port=5000)