import mongoose, {Schema} from "mongoose";

const roomSchema = new Schema(
    {
        userId: String
    },{
        timestamps: true
    }    
);

const Room = mongoose.models.room || mongoose.model("room", roomSchema);
export default Room;