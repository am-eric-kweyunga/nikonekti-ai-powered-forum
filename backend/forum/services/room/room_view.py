
# system imports
from flask import Blueprint, jsonify, request

# relative imports
from forum.root.stument import StudentMentorForum
from forum.root.serializer import MentorSchema, ConnectionSchema, ChatRoomSchema, MessageSchema

# Initialize the forum and schema objects
forum = StudentMentorForum()

# seiralizers
mentor_schema = MentorSchema()
mentors_schema = MentorSchema(many=True)
connection_schema = ConnectionSchema()
chat_rooms_schema = ChatRoomSchema(many=True)
messages_schema = MessageSchema(many=True)

# Initialize the blueprint
name = "room"
bp = Blueprint(name, __name__)


@bp.route('/create_room', methods=['POST'])
def create_room():
    data = request.json
    
    room_name = data.get('room_name')
    participants: list = data.get('participants', [])

    if not room_name or not participants:
        return jsonify({'error': 'Missing room_name or participants'}), 400
    
    # validating if room does not exist by participants
    room_exists = forum.find_room_by_participants(participants)
    if room_exists:
        return jsonify({'error': 'Room already exists'}), 400
    
    # creating room
    room_id = forum.create_room(room_name, participants)
    return jsonify({'room_id': str(room_id)}), 201



@bp.route('/delete_room/<room_id>', methods=['DELETE'])
def delete_room(room_id):
    
    data = request.json
    
    email = data.get('email')
    
    # validate if email is in a participants list
    room_exists = forum.get_room_by_id(room_id)
    if not room_exists:
            return jsonify({'error': 'Room not found'}), 404
        
    if email not in room_exists['participants']:
        return jsonify({'error': 'You are not a participant in this room'}), 400
    
    # deleting room
    forum.delete_room(room_id)
    return jsonify({'success': 'Room deleted'}), 200
    


@bp.route('/rooms', methods=['GET'])
def get_rooms():
    rooms = forum.get_rooms()
    if not rooms:
        return jsonify({'error': 'No rooms found'}), 404
    serialized_rooms = chat_rooms_schema.dump(rooms)
    return jsonify({'rooms': serialized_rooms}), 200


##################################################################################################################
# Messages in chat rooms
##################################################################################################################

@bp.route('/messages/<room_id>', methods=['GET'])
def get_messages(room_id):
    messages = forum.get_messages_by_room(room_id)
    serialized_messages = messages_schema.dump(messages)
    return jsonify({'messages': serialized_messages}), 200

@bp.route('/send_message', methods=['POST'])
def send_message():
    
    data = request.json
    
    room_id = data.get('room_id')
    sender_email = data.get('sender_email')
    message = data.get('message')

    if not room_id or not sender_email or not message:
        return jsonify({'error': 'Missing room_id, sender_email, or message'}), 400
    
    # validating if room exists
    room_exists = forum.get_room_by_id(room_id)
    if not room_exists:
            return jsonify({'error': 'Room not found'}), 404

    # validating if sender is exist in participants list
    if sender_email not in room_exists['participants']:
        return jsonify({'error': 'You are not a participant in this room'}), 400
    
    # creating message
    message_id = forum.post_message(room_id, sender_email, message)
    return jsonify({'message_id': str(message_id)}), 201