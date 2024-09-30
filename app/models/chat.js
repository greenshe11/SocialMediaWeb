import mongoose, {Schema} from "mongoose";

const chatSchema = new Schema(
    {
        roomId: String,
        userId: String,
        message: String
    },{
        timestamps: true
    }    
);

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);
export default Chat;