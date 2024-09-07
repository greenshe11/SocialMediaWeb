import mongoose, {Schema} from "mongoose";

const reactionSchema = new Schema(
    {
        sourceUserId: String,
        targetUserId: String,
        state: String,
    },{
     timestamps: true
    }    
);

const FriendRequest = mongoose.models.FriendRequest || mongoose.model("FriendRequest", reactionSchema);
export default FriendRequest;