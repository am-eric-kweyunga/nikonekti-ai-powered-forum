// import { NextApiRequest, NextApiResponse } from 'next';
// import { Server as NetServer } from 'http';
// import { Server as SocketIOServer } from 'socket.io';

// type NextApiResponseWithSocket = NextApiResponse & {
//     socket: {
//         server: NetServer & { io?: SocketIOServer };
//     };
// };

// const SocketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
//     if (!res.socket.server.io) {

//         console.log('Initializing Socket.IO');

//         const io = new SocketIOServer(res.socket.server);
//         res.socket.server.io = io;

//         io.on('connection', (socket) => {
//             console.log('A user connected');

//             socket.on('message', (msg) => {
//                 console.log('Message received:', msg);
//                 // Broadcast to all clients except the sender
//                 socket.broadcast.emit('message', msg);
//             });

//             socket.on('disconnect', () => {
//                 console.log('A user disconnected');
//             });
//         });
//     } else {
//         console.log('Socket.IO already running');
//     }
//     res.end();
// };

// export default SocketHandler;