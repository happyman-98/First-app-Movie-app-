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






// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGE1YzEwYmNkM2RmNTU1OGQwZTg2NTFhNjkzODU3NyIsIm5iZiI6MTc1NDMxNDI2Ni43MzQwMDAyLCJzdWIiOiI2ODkwYjYxYTI4MmI4Y2I1MGRiMjMxN2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Q8Cmd0DBan1RLslLDEHgPBL_UDX1n2uk-TgF5piQiJI'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));