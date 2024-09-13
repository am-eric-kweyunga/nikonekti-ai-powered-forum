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


@bp.route("/add_student", methods=["POST"])
def add_student():
    if request.method == "POST":
        data = request.json

        student_name = data.get("name")
        student_email = data.get("email")
        bio = data.get("bio", "")
        education_level = data.get("educationLevel", "")
        institution = data.get("institution", "")
        subjects = data.get("subjects", "")
        career_interest = data.get("careerInterest, " "")
        dream_job = data.get("dreamJob", "")
        soft_skills = data.get("softSkills", "")
        mentorship_help = data.get("mentorshipHelp", "")
        goals = data.get("goals", "")
        profile_visibility = data.get("profileVisibility", True)

        student_exists = forum.find_student_by_email(email=student_email)
        if student_exists:
            return jsonify({"authorization": "Authorized"}), 201

        student_id = forum.add_student(
            student_name=student_name,
            student_email=student_email,
            bio=bio,
            education_level=education_level,
            institution=institution,
            subjects=subjects,
            career_interest=career_interest,
            dream_job=dream_job,
            soft_skills=soft_skills,
            mentorship_help=mentorship_help,
            goals=goals,
            profile_visibility=profile_visibility,
        )

        return jsonify({"status": "success"}), 201

    return jsonify({"status": "error", "error": "Method not allowed"}), 405


@bp.route("/find_student", methods=["POST"])
def find_student():
    if request.method == "POST":
        data = request.json
        print(data)

        student_email = data.get("email")

        student = forum.find_student_by_email(email=student_email)
        if student:
            serialized_student = student_schema.dump(student)
            return (
                jsonify(
                    {
                        "status": "success",
                        "authorization": "registered",
                        "student": serialized_student,
                    }
                ),
                200,
            )

        return jsonify({"status": "error", "authorization": "Student not found"}), 401

    return jsonify({"status": "error", "error": "Method not allowed"}), 405


@bp.route("/update_student", methods=["POST"])
def update_student():
    if request.method == "POST":

        data = request.json

        print(data)
        student_email = data.get("email")
        bio = data.get("bio")
        education_level = data.get("educationLevel")
        institution = data.get("institution")
        subjects = data.get("subjects")
        career_interest = data.get("careerInterest")
        dream_job = data.get("dreamJob")
        soft_skills = data.get("softSkills")
        mentorship_help = data.get("mentorshipHelp")
        goals = data.get("goals")
        profile_visibility = data.get("profileVisibility")

        student_exists = forum.find_student_by_email(email=student_email)
        print(student_exists)
        if student_exists == None:
            return jsonify({"authorization": "UnAuthorized"}), 401

        updates = {
            "bio": bio,
            "education_level": education_level,
            "institution": institution,
            "subjects": subjects,
            "career_interest": career_interest,
            "dream_job": dream_job,
            "soft_skills": soft_skills,
            "mentorship_help": mentorship_help,
            "goals": goals,
            "profile_visibility": profile_visibility,
        }
        student_ = forum.update_student_by_id(
            student_id=student_exists["_id"], updates=updates
        )

        return jsonify({"status": "success", "eddited": str(student_)}), 201


@bp.route("/add_student_profile", methods=["POST"])
def add_student_profile():
    if request.method == "POST":
        data = request.json

        # Collect the basic fields
        student_name = data.get("name")
        student_email = data.get("email")

        # Check if the student already exists
        student_exists = forum.find_student_by_email(email=student_email)
        if student_exists:
            return jsonify({"authorization": "Student already exists"}), 400

        # Collect additional fields from the form
        bio = data.get("bio", "")
        education_level = data.get("educationLevel", "")
        institution = data.get("institution", "")
        subjects = data.get("subjects", "")
        career_interest = data.get("careerInterest", "")
        dream_job = data.get("dreamJob", "")
        soft_skills = data.get("softSkills", "")
        mentorship_help = data.get("mentorshipHelp", "")
        goals = data.get("goals", "")
        profile_visibility = data.get("profileVisibility", False)

        # Add the student data to the database
        student_id = forum.add_student(
            name=student_name,
            email=student_email,
            bio=bio,
            education_level=education_level,
            institution=institution,
            subjects=subjects,
            career_interest=career_interest,
            dream_job=dream_job,
            soft_skills=soft_skills,
            mentorship_help=mentorship_help,
            goals=goals,
            profile_visibility=profile_visibility,
        )

        # Return a success response
        return (
            jsonify(
                {
                    "student_id": str(student_id),
                    "message": "Student profile created successfully",
                }
            ),
            201,
        )

    return jsonify({"error": "Method not allowed"}), 405


@bp.route("/delete_student", methods=["DELETE"])
def delete_student():
    if request.method == "DELETE":
        data = request.json
        student_email = data.get("email")

        # Check if the student's email is provided
        if not student_email:
            return jsonify({"status": "error", "message": "Email is required"}), 400

        # Check if the student exists in the database
        student_exists = forum.find_student_by_email(email=student_email)
        if student_exists is None:
            return jsonify({"status": "error", "message": "Student not found"}), 404

        # Delete the student
        forum.delete_student_by_id(id=student_exists["_id"])

        return (
            jsonify(
                {"status": "success", "message": "Student account deleted successfully"}
            ),
            200,
        )

    return jsonify({"error": "Method not allowed"}), 405
