# system imports
from flask import Blueprint, jsonify, request

# relative imports
from forum.root.stument import StudentMentorForum
from forum.root.serializer import StudentSchema

forum = StudentMentorForum()
student_schema = StudentSchema()
students_schema = StudentSchema(many=True)

name = "students"
bp = Blueprint(name, __name__)

@bp.route('/add_student', methods=['POST'])
def add_student():
    if request.method == 'POST':
        data = request.json
        
        student_name = data.get('name')
        student_email = data.get('email')
        
        student_exists = forum.find_student_by_email(email=student_email)
        if student_exists:
            return jsonify({'authorization': 'Authorized'}), 400
        
        student_id = forum.add_student(student_name, student_email)
        
        return jsonify({'student_id': str(student_id)}), 201
    
    return jsonify({'error': 'Method not allowed'}), 405


@bp.route('/find_student', methods=['POST'])
def find_student():
    if request.method == 'POST':
        data = request.json

        student_email = data.get('email')

        student = forum.find_student_by_email(email=student_email)
        if student:
            serialized_student = student_schema.dump(student)
            return jsonify({'authorization': 'registered', 'student': serialized_student }), 200

        return jsonify({'authorization': 'Un registered student'}), 401

    return jsonify({'error': 'Method not allowed'}), 405


@bp.route('/update_student', methods=['POST'])
def update_student():
    if request.method == 'POST':
        data = request.json
        
        student_email = data.get('email')
        student_name = data.get('name')
        
        student_exists = forum.find_student_by_email(email=student_email)
        if not student_exists:
            return jsonify({'authorization': 'Un registered student'}), 401
        
        updates = {
            'name': student_name,
            'email': student_email
        }
        student_ = forum.update_student_by_id(student_id=student_exists["_id"], updates=updates)
        
        return jsonify({"success": "Profile Editted", 'edited fields': str(student_)}), 201
    