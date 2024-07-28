from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy() # Initializing SQLAlchemy

class User(db.Model): 
    id = db.Column(db.Integer, primary_key=True)  #id to identify the user 
    name = db.Column(db.String(255), nullable=False) #User's name 
    user_type = db.Column(db.String(50), nullable=False) 
    disability = db.Column(db.String(255), nullable=False) #Disability type
    bio = db.Column(db.Text, nullable=True)
    hobbies = db.Column(db.Text, nullable=True)
    skills = db.Column(db.Text, nullable=True)
    goals = db.Column(db.Text, nullable=True)