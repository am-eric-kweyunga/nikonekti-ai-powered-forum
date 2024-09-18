from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from werkzeug.security import generate_password_hash, check_password_hash

from flask import Blueprint, request, jsonify, url_for
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
import os, smtplib

from forum.utilities.password_gen import generate_random_password
from forum.services.mailer import email_template
from forum.root.stument import StudentMentorForum

# Create a Blueprint
bp = Blueprint('auth', __name__)

# Initialize the forum and schema objects
forum = StudentMentorForum()

# Create the URL serializer
serializer = URLSafeTimedSerializer(os.getenv("SECRET_KEY"))

@bp.route('/send-verification-email', methods=['POST'])
def send_verification_email():
    data = request.json
    
    email = data.get('email')
    
    if not email:
        return jsonify({"error": "Email is required"}), 400
    
    # Search mentor by email
    mentor = forum.find_mentor_by_email(email)
    
    if not mentor:
        return jsonify({"error": "Unknown email Address"})
    
    mentor_name = mentor.get('name')

    # Generate a token for email verification
    token = serializer.dumps(email, salt=os.getenv("SECURITY_PASSWORD_SALT"))

    frontend_url = "https://forumnikonekti.vercel.app/mentorship/application/verification-challenge"
    verification_url = f"{frontend_url}?token={token}"
    
    # Create the SMTP server
    smtp_server = smtplib.SMTP(os.getenv("MAIL_SERVER"), os.getenv("MAIL_PORT"))
    smtp_server.starttls()
    smtp_server.login(os.getenv("MAIL_USERNAME"), os.getenv("MAIL_PASSWORD"))
    
    # Prepare the email
    msg = MIMEMultipart('alternative')
    msg['Subject'] = 'Nikonekti Email Verification Request'
    msg['From'] = os.getenv("MAIL_DEFAULT_SENDER")
    msg['To'] = f'{email}'
    
    # HTML content
    html = email_template.html.format(mentor_name=mentor_name, verification_url=verification_url)
    html_utf8 = html.encode('utf-8')
    html_content = MIMEText(html_utf8, 'html', 'utf-8')
    msg.attach(html_content)
    
    try: 
        # Send the email
        smtp_server.sendmail(str(os.getenv("MAIL_DEFAULT_SENDER")), email, msg.as_string())
        
        # Return success response
        return jsonify({"status": "success", "message": "Verification email sent!"}), 200
    
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500
    
    
    
@bp.route('/verify-email', methods=['POST'])
def verify_email():
    token = request.json.get('token')
    if not token:
        return jsonify({"status": "error", "message": "Token is required"})

    try:
        
        # Deserialize token (validate token and extract email)
        email = serializer.loads(token, salt=os.getenv("SECURITY_PASSWORD_SALT"), max_age=3600)
        print(email)
        
        # Find the mentor in the database
        mentor = forum.find_mentor_by_email(email=email)
        if not mentor:
            return jsonify({"status": "error", "message": "Mentor not found"})
        
        if mentor.get("verification_status"):
            return jsonify({"status": "verified", "message": "Email already verified redirecting to login page"})
        
        # Set mentor with update_mentor_by_id_with_password
        mentor_id = mentor.get("_id")
        mentor_password = generate_random_password()
        hashed_password = generate_password_hash(mentor_password)
        
        updates = {
            "password": hashed_password,
            "verification_status": True
        }
        updated_mentor = forum.update_mentor_by_id_with_password(mentor_id, updates)
        
        if not updated_mentor:
            return jsonify({"status": "error", "message": "Failed to update mentor"})
        
        mentor_name = mentor.get("name")
        mentor_email = mentor.get("email")
        guidebook_url = "https://forumnikonekti.com/mentorship/guidebook"
        
        # Create the SMTP server
        smtp_server = smtplib.SMTP(os.getenv("MAIL_SERVER"), os.getenv("MAIL_PORT"))
        smtp_server.starttls()
        smtp_server.login(os.getenv("MAIL_USERNAME"), os.getenv("MAIL_PASSWORD"))
        
        # Prepare the email
        msg = MIMEMultipart('alternative')
        msg['Subject'] = 'Nikonekti Email Verification Request'
        msg['From'] = os.getenv("MAIL_DEFAULT_SENDER")
        msg['To'] = f'{email}'
        
        # HTML content
        welcome_html = email_template.welcome_html.format(mentor_name=mentor_name, mentor_email=mentor_email, mentor_password=mentor_password, guidebook_url=guidebook_url)
        html_utf8 = welcome_html.encode('utf-8')
        html_content = MIMEText(html_utf8, 'html', 'utf-8')
        msg.attach(html_content)
        print(msg.as_string())
        
        try: 
            # Send the email
            smtp_server.sendmail(str(os.getenv("MAIL_DEFAULT_SENDER")), email, msg.as_string())
            print("sent")
            # Return success response
            return jsonify({"status": "success", "message": "Your one time password was sent to your email, check your email!"}), 200
        
        except Exception as e:
            print(e)
            return jsonify({"error": str(e)}), 500
        
        
    
    except SignatureExpired:
        return jsonify({"status": "expired"}), 400