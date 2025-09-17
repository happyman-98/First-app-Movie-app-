import Constants from "expo-constants"
import { Client, Databases, ID, Query } from "react-native-appwrite";
import { getCurrentUser } from "./loginpage";


const APPWRITE_PROJECT_ID = Constants.expoConfig?.extra?.APPWRITE_PROJECT_ID;
const EXPO_PUBLIC_DATABASE_ID = Constants.expoConfig?.extra?.EXPO_PUBLIC_DATABASE_ID;
const EXPO_SAVE_MOVIES_COLLECTION_ID = Constants.expoConfig?.extra?.EXPO_SAVE_MOVIES_COLLECTION_ID;

const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject(APPWRITE_PROJECT_ID)
const database = new Databases(client);
/////

export const checkMovies = async (movie: Movie) => {
    try {
        const user = await getCurrentUser()
        if (user) {
            const result = await database.listDocuments(EXPO_PUBLIC_DATABASE_ID, EXPO_SAVE_MOVIES_COLLECTION_ID, [Query.equal('movie_id', movie.id), Query.equal('userId', user.$id)])
            if (result.documents.length > 0) {
                const doc = result.documents[0]
                return { movieExist: true, doccumentId: doc.$id }
            }
            else {
                return { movieExist: false, doccumentId: '' }
            }
        }

        else {
            return { movieExist: false, doccumentId: '' }
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

/////

export const saveMovies = async (movie: Movie, userId: string) => {
    try {
        await database.createDocument(EXPO_PUBLIC_DATABASE_ID, EXPO_SAVE_MOVIES_COLLECTION_ID, ID.unique(),
            {
                movie_id: movie.id,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                userId: userId
            }
        )

    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
/// delet movies
export const deletMovies = async (id: databaseId) => {
    try {
        await database.deleteDocument(EXPO_PUBLIC_DATABASE_ID, EXPO_SAVE_MOVIES_COLLECTION_ID, id)
        console.log('movies deleted')
    }
    catch (error) {
        console.log(error)
        throw error
    }
}
///
export const getsavedmovies = async (): Promise<SavedMoveis[] | undefined> => {
    try {
        const user = await getCurrentUser()

        const result = await database.listDocuments(EXPO_PUBLIC_DATABASE_ID, EXPO_SAVE_MOVIES_COLLECTION_ID, [Query.equal('userId', user.$id)]);
        return result.documents as unknown as SavedMoveis[];
    } catch (error) {
        console.log(error)
        throw error
    }
}
/// guset account
