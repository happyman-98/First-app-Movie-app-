import  Constants  from "expo-constants"
import {Client, Databases, ID, Query} from 'react-native-appwrite'

const APPWRITE_PROJECT_ID=Constants.expoConfig?.extra?.APPWRITE_PROJECT_ID;
const  EXPO_PUBLIC_DATABASE_ID=Constants.expoConfig?.extra?.EXPO_PUBLIC_DATABASE_ID;
const EXPO_PUBLIC_COLLECTION_ID=Constants.expoConfig?.extra?.EXPO_PUBLIC_COLLECTION_ID;


const client =new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject(APPWRITE_PROJECT_ID)
const database = new Databases(client);

export const updateSearchCount=async(query:string,movie:Movie)=>{

   const normalizedQuery = query.trim().toLowerCase();

 try{

   
    const result=await database.listDocuments(EXPO_PUBLIC_DATABASE_ID,EXPO_PUBLIC_COLLECTION_ID,[Query.equal('searchTerm',normalizedQuery)]);
    console.log(result)
if (result.documents.length>0)
{
   const existingMovie=result.documents[0]
   await database.updateDocument(
      EXPO_PUBLIC_DATABASE_ID,
      EXPO_PUBLIC_COLLECTION_ID,
      existingMovie.$id,
      {
         count:existingMovie.count+1
      }
   )
}
else{
   await database.createDocument(EXPO_PUBLIC_DATABASE_ID,EXPO_PUBLIC_COLLECTION_ID,ID.unique(),
{
   searchTerm:normalizedQuery,
   movie_id:movie.id,
   count:1,
   title:movie.title,
   poster_url:`https://image.tmdb.org/t/p/w500${movie.poster_path}`
}

)
console.log(`new data was added ${query}` )
}
 }
 catch(error)
 {
   console.log(error);
   throw error;
 }

}


export const getTrendingMovies =async():Promise<TrendingMovie[]| undefined> =>
{
 try{
  const result=await database.listDocuments(EXPO_PUBLIC_DATABASE_ID,EXPO_PUBLIC_COLLECTION_ID,[Query.limit(5),Query.orderDesc('count')]);
  return result.documents as unknown as TrendingMovie[];
 }
 catch(error){
   console.log(error)
   return undefined
 }
}
