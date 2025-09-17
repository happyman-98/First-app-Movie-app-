import Constants from "expo-constants";
import {create} from 'zustand'
import { Account, Client, Databases } from "react-native-appwrite";

const APPWRITE_PROJECT_ID=Constants.expoConfig?.extra?.APPWRITE_PROJECT_ID;
interface UserStoreState{

}
const client= new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject(APPWRITE_PROJECT_ID)
const account= new Account(client)

export const signInUser=async({firstName,lastName,email,password}:user)=>{
    const name=`${firstName} ${lastName}`
    try
    {
const user =await account.create("unique()",email,password,name)
    return user;
}
    catch(error)
    {
        console.log(error);
        throw error;
    }
    
}
export const logInUser=async({email,password}:user)=>{
    try{
        const user=await account.createEmailPasswordSession(email,password);
        return user;
    }
    catch(error)
    {
        console.log(error);
        throw error;
    }
}
export const getCurrentUser=async()=>{
    try{
        const user=await account.get();
        return user
    }
    catch(error){
        console.log('NO acctive session : ',error)
        throw error
        
    }
}
// 

// export const useUserStore=create((set,get)=>({
//     user:null,
//     loading:true,
//     fetchuser:async()=>{
//         try{
//             const user=await account.get()
//             set({user,loading:false})
//         }catch{
//             set({user:null,loading:false})
//         }

//     },
//     login:async({email,password}:user)=>{
//         await account.createEmailPasswordSession(email,password)
//         await get().fetchuser()
//     },
//     logout:async()=>{
//         await account.deleteSession("current")
//         set({user:null})
//     }
// }))


// 
export const logout=async()=>{
    try{
        await account.deleteSession('current');
    }
    catch(error)
    {
        console.log('error while logout :',error)
        throw error
    }
}
//
export const createGuestSession = async () => {
  try {
    const session = await account.createAnonymousSession();
    console.log("Guest session created:", session);
    return session;
  } catch (error) {
    console.error("Error creating guest session:", error);
    throw error;
  }
};