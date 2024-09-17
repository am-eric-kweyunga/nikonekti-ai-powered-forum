from .extentions import socketio
from flask_socketio import emit, join_room, leave_room


from forum.root.stument import StudentMentorForum 

forum = StudentMentorForum()

# Event handler for WebSocket connection
@socketio.on('connect')
def handle_connect():
    emit('response', {'message': 'Connected successfully'})

# Event handler for WebSocket disconnection
@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

# Event handler for sending a message
@socketio.on('send_message')
def handle_message(data):
    room = data.get('room')
    message = data.get('message')
    
    # finding the existing room by participants
    participants = room.split('-')
    existing_room = forum.find_room_by_participants(
        participants=participants
    )
    print(existing_room)
    print(f'participants: {participants}')
    if existing_room:
        print('room found')
        # updating the message to the database
        try:
            
            
        
            # sending the message to the existing room
            emit('receive_message', {"room": room, 'message': message}, room=room)
            print('message sent')
            return
        except Exception as e:
            print(e)
            emit('error', {'message': 'Error posting message'})
            return
            
    print('room not found')
    # disconecting from the room
    leave_room(room)
    print(f" Disconected from room {room}")

# Event handler for joining a room
@socketio.on('join_room')
def handle_join_room(data):
    print(data)
    room: str = data.get('room')
    
    join_room(room)
    
    # fetching participants
    participants = room.split('-')
    
    # finding the existing room
    existing_room = forum.find_room_by_participants(
        participants=participants
    )
    
    if existing_room:
        emit('notification', {'note': f'Joined room {room}'}, room=room)
        print(f" Joined room {room}")
        
        # finding the messages in the room
        message = forum.get_messages_by_room(room_id=existing_room['_id'])
        
        return
    
    # creating a new room if no room existing
    new_room = forum.create_room(room_name=room, participants=participants)
    
    emit('response', {'message': f'Joined room {room}'}, room=room)

# Event handler for leaving a room
@socketio.on('leave_room')
def handle_leave_room(data):
    room = data.json('room')
    leave_room(room)
    emit('response', {'message': f'Left room {room}'}, room=room)