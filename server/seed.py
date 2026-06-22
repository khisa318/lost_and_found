from app import app, db, Item

# Use the app context to access the database
with app.app_context():
    # Create some items
    item1 = Item(title="Lost Wallet", status="Lost")
    item2 = Item(title="Found Keys", status="Found")
    
    # Add to session and commit
    db.session.add(item1)
    db.session.add(item2)
    db.session.commit()
    print("Database seeded with 2 items!")