import { hashPassword, verifyPassword } from "../../../shared/utils/password-hash.js";
import { restaurantModel } from "../db/models/restaurant-schema.js";
import { userModel } from "../db/models/user-schema.js";

export const userService =  {
   async register(userData){
    try{
        userData.password=hashPassword(userData.password)
        const doc= await userModel.create(userData)
        console.log("service screen");
        return doc
    }catch(err){
throw err    }
   
    },
    async login(userData){
        try{
            const doc=await userModel.findOne({"email":userData.email}).select("name password role -_id").exec()
            console.log('doc service',doc);

            if(doc){
             const hashPassword=doc.password;
             const plaintextPassword=userData.password;
             const isMatch= verifyPassword(plaintextPassword,hashPassword)
             if(isMatch){
                 return {name:doc.name,role:doc.role,email:userData.email};
             }
             else{
                 return null
             }
            }
            else{
                return null
            }
        }
        catch(err){
throw err        }
        
    },
    async addRestaurantData(){
        try {
            const doc = await restaurantModel.find()
            console.log('doc',doc);
            return doc
        } catch (error) {
            console.log('error',error);
            throw error
        }
       
    }
};