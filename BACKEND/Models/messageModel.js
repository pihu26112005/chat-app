import mongoose from 'mongoose';
// sender
//content 
//chat


const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;
