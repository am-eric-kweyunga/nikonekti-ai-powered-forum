# system imports
from flask import Blueprint, jsonify, request

# relative imports
from forum.root.stument import StudentMentorForum
from forum.root.serializer import MentorSchema, ConnectionSchema

# Initialize the forum and schema objects
forum = StudentMentorForum()
mentor_schema = MentorSchema()
mentors_schema = MentorSchema(many=True)
connection_schema = ConnectionSchema()

# Initialize the blueprint
name = "connection"
bp = Blueprint(name, __name__)


@bp.route('/connect', methods=['POST'])
def connect():
    data = request.json
    
    student_email = data.get('student_email')
    mentor_email = data.get('mentor_email')
    note = data.get('note')
    
    # validating student and mentor emails in database
    exst_student = forum.find_student_by_email(email=student_email)
    exst_mentor = forum.find_mentor_by_email(email=mentor_email)
    
    if not student_email or not mentor_email:
        return jsonify({"status":"error",'message': 'Missing student_email or mentor_email'}), 400
    
    if not exst_student:
        return jsonify({"status":"error",'message': 'Student not found'}), 404
    
    if not exst_mentor:
        return jsonify({"status":"error",'message': 'Mentor not found'}), 404

    # connecting student and mentor
    connection_id = forum.connect_student_to_mentor(student_email, mentor_email, note=note)
    if not connection_id:
        return jsonify({"status":"error",'message': 'Connection not created'}), 500
    
    return jsonify({"status": "success",}), 201

@bp.route('/mentor_connections', methods=['POST'])
def mentor_connections():
    data = request.json

    mentor_email = data.get('mentor_email')

    # validating mentor email
    exst_mentor = forum.find_mentor_by_email(email=mentor_email)
    
    if not exst_mentor:
        return jsonify({"status":"error",'message': 'Mentor not found'}), 404
    
    connections = forum.find_connection_by_mentor_email(mentor_email)
    if not connections:
        return jsonify({"status":"error",'message': 'No connections found'}), 404
    
    all_connections = []
    for connection in connections:
        serialized_connection = connection_schema.dump(connection)
        all_connections.append(serialized_connection)
    
    return jsonify({'connections': all_connections}), 200

@bp.route('/student_connections', methods=['POST'])
def student_connections():
    data = request.json

    student_email = data.get('student_email')
    print(student_email)
    # validating student email
    exst_student = forum.find_student_by_email(email=student_email)
    
    if not exst_student:
        return jsonify({"status":"error",'message': 'student not found'}), 404
    
    connections = forum.find_connection_by_student_email(student_email)
    if not connections:
        return jsonify({"status":"error",'message': 'No connections found'}), 404
    
    all_connections = []
    for connection in connections:
        serialized_connection = connection_schema.dump(connection)
        all_connections.append(serialized_connection)
    
    return jsonify({'status': 'success', 'connections': all_connections}), 200

@bp.route('/delete_connection', methods=['DELETE'])
def delete_connection():
    data = request.json
    connection_id = data.get('connection_id')
    user_type = data.get('user_type')
    email = data.get('email')
    
    # validating user type
    if user_type not in ['student', 'mentor']:
        return jsonify({"status":"error",'message': 'Invalid user type'}), 400
    
    # checking user type
    if user_type == 'student':
        student_email = email
        exst_student = forum.find_student_by_email(email=student_email)
        if not exst_student:
            return jsonify({"status":"error",'message': 'Student not found'}), 404
        
    if user_type == 'mentor':
        mentor_email = email
        exst_mentor = forum.find_mentor_by_email(email=mentor_email)
        if not exst_mentor:
            return jsonify({"status":"error",'message': 'Mentor not found'}), 404
    
    # validating connection id
    exst_connection = forum.find_connection_by_id(connection_id)
    if not exst_connection:
        return jsonify({"status":"error",'message': 'Connection not found'}), 404
    
    # checking if mentor or student is the owner of the connection
    if user_type == 'student':
        if exst_connection['student_email'] != student_email:
            return jsonify({"status":"error",'message': 'You are not the owner of this connection'}), 403
        
    if user_type == 'mentor':
        if exst_connection['mentor_email'] != mentor_email:
            return jsonify({"status":"error",'message': 'You are not the owner of this connection'}), 403
    
    forum.delete_connection(connection_id)
    return jsonify({'success': 'Connection deleted'}), 200

@bp.route('/my_mentors', methods=['POST'])
def full_connection():
    data = request.json
    email = data.get('student_email')
    
    # finding student
    exst_student = forum.find_student_by_email(email=email)
    if not exst_student:
        return jsonify({"status":"error", 'message': 'Student not found'})

    # finding connection
    connections = forum.find_connection_by_student_email(student_email=email)
    if not connections:
        return jsonify({"status":"noconnection",'mentors': []})
    
    all_connections = []
    for connection in connections:
        serialized_connection = connection_schema.dump(connection)
        all_connections.append(serialized_connection)
    
    all_mentors = []
    # getting mentor details
    for connection in all_connections:
        mentor = forum.find_mentor_by_email(email=connection['mentor_email'])
        mentor_details = mentor_schema.dump(mentor)
        all_mentors.append(mentor_details)
        
    return jsonify({'status': 'success', 'connections': all_connections, 'mentors': all_mentors}), 200