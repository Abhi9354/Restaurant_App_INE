import mongoose from "mongoose";

export const dbConnectionLoad = () => {
  console.log("connection file loaded");

  const promise = mongoose.connect("mongodb+srv://AdminUser:Abhishek123@cluster9354.nl5ubjl.mongodb.net/userdb?retryWrites=true&w=majority&appName=Cluster9354");
  return promise;
};
export default mongoose;
