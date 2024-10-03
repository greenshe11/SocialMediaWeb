import mongoose, {Schema} from "mongoose";

const roomMembersSchema = new Schema(
    {
        roomId: String,
        userId: String
    },{
        timestamps: true
    }    
);

const RoomMembers = mongoose.models.roomMembers || mongoose.model("roomMembers", roomMembersSchema);
export default RoomMembers;