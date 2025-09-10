import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.extra?.MOVIE_API_KEY;
export const TMDB_CONFIG={
    BASE_URL:'https://api.themoviedb.org/3',
    API_KEY:API_KEY,
    headers:{
        accept:'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}
export const fetchMovise=async({query}:{query:string})=>{
    const endpoint=query 
    ?`${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    :`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
    
    const response=await fetch(endpoint, {
         method:'GET',
         headers:TMDB_CONFIG.headers,
    });

    if (!response.ok){
        throw new Error('Failed to fetch movies ', response.statusText);
    }
    const data=await response.json();
    return data.results;
}


export const fetchMoviseDetails = async (movieId : string):Promise<MovieDetails>=>
{
    try {

        const response= await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
            {
                method:'GET',
                headers:TMDB_CONFIG.headers,


            }
        );
        if(!response.ok) throw new Error('Failed to fetch movie data')
       const data= await response.json();
    return data
    }
    catch (error){
        console.log(error);
        throw error;

    }
}



