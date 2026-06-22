from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/items', methods=['GET'])
def get_items():
    # Sample data for demonstration purposes
    items = [
        {"id": 1, "title": "Lost Wallet", "status": "Lost"},
        {"id": 2, "title": "Found Keys", "status": "Found"}
    ]
    return jsonify(items)

if __name__ == '__main__':
    app.run(debug=True, port=5000)