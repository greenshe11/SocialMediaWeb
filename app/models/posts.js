import mongoose, {Schema} from "mongoose";

const postSchema = new Schema(
    {
        userId: String,
        description: String
    },{
     timestamps: true
    }    
);

const Posts = mongoose.models.Posts || mongoose.model("Posts", postSchema);
export default Posts;