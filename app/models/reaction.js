import mongoose, {Schema} from "mongoose";

const reactionSchema = new Schema(
    {
        reactorId: String,
        posterId: String,
        postId: String,
        reaction: String,
    },{
     timestamps: true
    }    
);

const Reaction = mongoose.models.Reaction || mongoose.model("Reaction", reactionSchema);
export default Reaction;