# system imports
from flask import Blueprint, jsonify, request
import datetime

# relative imports
from forum.root.stument import StudentMentorForum
from forum.root.serializer import MentorSchema

# Initialize the forum and schema objects
forum = StudentMentorForum()
mentor_schema = MentorSchema()
mentors_schema = MentorSchema(many=True)

name = "mentors"
bp = Blueprint(name, __name__)

@bp.route('/add_mentor', methods=['POST'])
def add_mentor():
    if request.method == 'POST':
        data = request.json
        
        mentor_name = data.get('name')
        mentor_email = data.get('email')
        expertise = data.get('expertise')
        
        if not mentor_name or not mentor_email or not expertise:
            return jsonify({'error': 'Missing required fields'}), 400

        mentor_exists = forum.find_mentor_by_email(email=mentor_email)
        if mentor_exists:
            return jsonify({'authorization': 'Authorized'}), 400
        
        mentor_id = forum.add_mentor(mentor_name, mentor_email, expertise)
        
        return jsonify({'mentor_id': str(mentor_id)}), 201
    
    return jsonify({'error': 'Method not allowed'}), 405


@bp.route('/find_mentor', methods=['POST'])
def find_mentor():
    if request.method == 'POST':
        data = request.json

        mentor_email = data.get('email')

        if not mentor_email:
            return jsonify({'error': 'Missing email'}), 400

        mentor = forum.find_mentor_by_email(email=mentor_email)
        if mentor:
            serialized_mentor = mentor_schema.dump(mentor)
            return jsonify({'authorization': 'registered', 'mentor': serialized_mentor}), 200

        return jsonify({'authorization': 'Unregistered mentor'}), 401

    return jsonify({'error': 'Method not allowed'}), 405


@bp.route('/update_mentor', methods=['POST'])
def update_mentor():
    if request.method == 'POST':
        data = request.json
        
        mentor_email = data.get('email')
        mentor_name = data.get('name')
        expertise = data.get('expertise')
        
        if not mentor_email:
            return jsonify({'error': 'Missing email'}), 400
        
        mentor_exists = forum.find_mentor_by_email(email=mentor_email)
        if not mentor_exists:
            return jsonify({'authorization': 'Unregistered mentor'}), 401
        
        updates = {
            'name': mentor_name,
            'email': mentor_email,
            'expertise': expertise
        }
        mentor_id = mentor_exists["_id"]
        mentor_ = forum.update_mentor_by_id(mentor_id=mentor_id, updates=updates)
        
        return jsonify({"success": "Profile Edited", 'edited fields': str(mentor_)}), 201

    return jsonify({'error': 'Method not allowed'}), 405

@bp.route('/search_mentors', methods=['GET'])
def search_mentors():
    expertise = request.args.get('expertise')
    
    mentors = forum.search_mentors(expertise=expertise)
    serialized_mentors = mentors_schema.dump(mentors)
    return jsonify({'mentors': serialized_mentors}), 200