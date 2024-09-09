from .extentions import socketio
from flask_socketio import emit, join_room, leave_room

# Event handler for WebSocket connection
@socketio.on('connect')
def handle_connect():
    print('Client connected')
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
    emit('receive_message', {'message': message}, room=room)

# Event handler for joining a room
@socketio.on('join_room')
def handle_join_room(data):
    room = data.get('room')
    join_room(room)
    emit('response', {'message': f'Joined room {room}'}, room=room)

# Event handler for leaving a room
@socketio.on('leave_room')
def handle_leave_room(data):
    room = data.json('room')
    leave_room(room)
    emit('response', {'message': f'Left room {room}'}, room=room)