from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from flask import Blueprint, request, jsonify, url_for
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
import os, smtplib

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

    frontend_url = "http://localhost:3000/mentorship/application/verification-challenge"
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
        
        # smtp_server.quit()
        print(msg.as_string())
        
        # Return success response
        return jsonify({"status": "success", "message": "Verification email sent!"}), 200
    
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500
    
    
    
@bp.route('/verify-email', methods=['POST'])
def verify_email():
    token = request.json.get('token')
    try:
        # Deserialize token (validate token and extract email)
        email = serializer.loads(token, salt=os.getenv("SECURITY_PASSWORD_SALT"), max_age=3600)  # Token valid for 1 hour
        # Set mentor as verified in the database (implement your database logic here)
        return jsonify({"status": "success", "message": "Email verified successfully!"}), 200
    except SignatureExpired:
        return jsonify({"status": "expired"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400

