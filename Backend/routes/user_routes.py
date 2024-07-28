from flask import Blueprint, request, jsonify
from models import db, User

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/volunteer', methods=['POST'])
def create_volunteer():
    data = request.get_json()
    name = data.get('name')
    bio = data.get('bio')
    disability = data.get('disability')

    if not name or not bio or not disability:
        return jsonify({"error": "Name, bio, and disability are required"}), 400

    new_volunteer = User(name=name, bio=bio, disability=disability, user_type='volunteer')
    db.session.add(new_volunteer)
    db.session.commit()

    return jsonify({"message": "Profile created successfully!"}), 201

@user_bp.route('/search', methods=['GET'])
def search():
    disability = request.args.get('disability')
    if not disability:
        return jsonify({"error": "Disability is required"}), 400

    volunteers = User.query.filter_by(user_type='volunteer').filter(User.disability.like(f"%{disability}%")).all()
    results = [{"id": v.id, "name": v.name, "bio": v.bio, "disability": v.disability, "hobbies": v.hobbies} for v in volunteers]

    return jsonify(results)