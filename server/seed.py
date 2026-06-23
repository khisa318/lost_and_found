from app import app, db, Admin, User, Item
from datetime import datetime, timedelta
import random

def seed_database():
    print("Initializing database seeder matrix...")
    
    with app.app_context():
        # Drop all tables to clean up old structural debris, then create fresh schemas
        db.drop_all()
        db.create_all()
        print("Database schemas initialized from scratch.")

        # 1. SEED SYSTEM ADMINISTRATOR ACCOUNT
        admin_account = Admin(
            username='admin',
            password='password'  # Standard development clear-text password
        )
        db.session.add(admin_account)
        print("System administrator seeded: username='admin', password='password'")

        # 2. SEED REGULAR USER PORTFOLIO ACCOUNT
        test_user = User(
            emailadress='user@gmail.com',
            username='User',
            password='User12345'
        )
        db.session.add(test_user)
        db.session.flush() # Flushes record to grab the assigned auto-incremented test_user.id
        print("Test user seeded: email='user@gmail.com', username='User', password='User12345'")

        # 3. SEED 15 LOGGED PORTFOLIO PRODUCTS / ITEMS
        categories = ["Electronics", "Documents", "Accessories", "Keys", "Clothing"]
        locations = ["Main Cafeteria", "Science Lab Building", "Campus Library Lounge", "West Parking Lot", "Student Gym Center"]
        
        item_templates = [
            ("Midnight Black iPhone 14", "Electronics", "Found an iPhone with a cracked screen protector and a clear silicone case."),
            ("Leather Bi-Fold Wallet", "Accessories", "Brown leather wallet containing a transit pass and campus bookstore receipts. No cash found."),
            ("Silver MacBook Pro 13\"", "Electronics", "Left on a study desk on the second floor. Has a sticker of a rocket ship on the top lid."),
            ("Chemistry 101 Binder", "Documents", "Blue 3-ring binder containing detailed handwritten lab lecture notes and assignments."),
            ("Honda Car Key Fob", "Keys", "A single electronic key fob attached to a silver carabiner clip and a small red lanyard."),
            ("Sony Noise-Canceling Headphones", "Electronics", "Black over-ear headphones left hanging on a treadmill station."),
            ("Hydro Flask Water Bottle", "Accessories", "Olive green 32oz wide-mouth flask covered in various national park decals."),
            ("Denim Jacket", "Clothing", "Blue vintage denim jacket, size Medium. Left over the back of a chair in the dining hall."),
            ("JanSport Backpack", "Accessories", "Dark green canvas backpack containing a couple of textbooks and an empty lunchbox."),
            ("Student ID Badge Card", "Documents", "Found near the main security gate entrance. Belongs to an engineering student."),
            ("Ray-Ban Aviator Sunglasses", "Accessories", "Gold-rimmed sunglasses inside a black protective snap-case left on a bench."),
            ("Dorm Room Key Assembly", "Keys", "Three brass keys held together by a brass ring and a plastic novelty keychain charm."),
            ("Kindle Paperwhite E-Reader", "Electronics", "Housed in a teal fabric smart-shell cover. Left near the window seating rows."),
            ("Calculus Textbook", "Documents", "Hardcover edition of Early Transcendentals. Looks brand new with no names written inside."),
            ("Knitted Winter Scarf", "Clothing", "Grey and burgundy striped wool scarf, perfect condition, smelling lightly of vanilla.")
        ]

        # Populate records shifting dates backward to create a realistic logging timeline
        base_date = datetime.today()
        
        for i, (title, category, description) in enumerate(item_templates):
            item_date = (base_date - timedelta(days=random.randint(0, 10))).strftime("%Y-%m-%d")
            status = "Found" if i % 2 == 0 else "Lost"
            
            seeded_item = Item(
                title=title,
                category=category,
                status=status,
                location=random.choice(locations),
                foundBy="User" if status == "Found" else None,
                date=item_date,
                description=description,
                user_id=test_user.id # Directly attributes all 15 entries to the seeded test account portfolio
            )
            db.session.add(seeded_item)

        db.session.commit()
        print("Successfully injected 15 tracking listings linked to 'User' account.")
        print("Database seed matrix processing complete!")

if __name__ == '__main__':
    seed_database()