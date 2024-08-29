import mongoose, {Schema} from "mongoose";

const mediaSchema = new Schema(
    {
        mediaData: Buffer,
        postId: String,
        mediaType: String,
    },{
     timestamps: true
    }    
);

const Media = mongoose.models.Media || mongoose.model("Media", mediaSchema);
export default Media;