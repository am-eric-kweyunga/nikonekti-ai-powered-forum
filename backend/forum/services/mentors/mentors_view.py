# system imports
import os
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
        
        name = request.form.get('name')
        email = request.form.get('email')
        location = request.form.get('location')
        occupation = request.form.get('occupation')
        experience = request.form.get('experience')
        interests = request.form.get('interests')
        goals = request.form.get('goals')
        availability = request.form.get('availability')
        additional_info = request.form.get('additionalInfo')
        ratings = int(request.form.get('ratings', 0))
        image = request.form.get('image')

        if not name or not email or not location or not occupation or not experience or not interests or not goals or not availability:
            return jsonify({'error': 'Missing required fields'})

        mentor_exists = forum.find_mentor_by_email(email=email)
        if mentor_exists:
            return jsonify({'authorization': 'Email already taken, try using another email'})

        mentor_id = forum.add_mentor(
            name, email, location, occupation, experience, interests, goals, availability, additional_info, ratings, image
        )
        
        return jsonify({"status": "success", "mentor_id": str(mentor_id)}), 201

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