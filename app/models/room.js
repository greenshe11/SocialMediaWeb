import mongoose, {Schema} from "mongoose";

const roomSchema = new Schema(
    {
    //room creator
    },{
        timestamps: true
    }    
);

const Room = mongoose.models.room || mongoose.model("room", roomSchema);
export default Room;