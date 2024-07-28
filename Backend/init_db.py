
#  This Script initializes  the database by creating tables 
# is defined in the models 

from app import app
from models import db

with app.app_context():
    db.create_all()