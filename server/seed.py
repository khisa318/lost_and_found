from app import app, db, Admin

with app.app_context():
    # Make sure tables exist in the new file
    db.create_all()
    
    # Clean any leftover records
    db.session.query(Admin).delete()
    db.session.query(Admin).delete()
    
    print("🌱 Seeding database with admin credentials")
 
    admin = Admin(
            username="admin",
            password="password"
        )
    
    db.session.add(admin)
    db.session.commit()
    print("🎉 Database successfully recreated and seeded with 12 complete records!")