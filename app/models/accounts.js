import mongoose, {Schema} from "mongoose";

const accountSchema = new Schema(
    {
        email: String,
        username: String,
        password: String,
        profileImg: String,
        address: String,
        birthdate: Date,
        
    },{
     timestamps: true
     
    }    
);

const Account = mongoose.models.Account || mongoose.model("Account", accountSchema);
export default Account;
