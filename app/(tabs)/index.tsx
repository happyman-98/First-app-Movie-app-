import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/sevices/useFetch";
import { fetchMovise } from "@/sevices/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/sevices/appwirte";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router= useRouter();
 
  const {
    data:tredingMovies,
    loading:trendingLoading,
    error:trendingError

  }=useFetch(getTrendingMovies)

  const { data:movies,loading:moviesloading,error:moviesError}=useFetch(()=>fetchMovise({
    query:''
  }))

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />


      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{
        minHeight: '100%', paddingBottom: 10
      }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
     
{/* <Text className="text-white">{String(moviesloading)}</Text>
<Text className="text-white">{String(movies)}</Text>
<Text className="text-white">{String(moviesError)}</Text> */}


        {moviesloading||trendingLoading?(
          <ActivityIndicator
          size='large'
          color="#0000ff"
          className="mt-10 self-center"
          />
        ):moviesError||trendingError?(
          <Text className="text-white">Error : {moviesError?.message||trendingError?.message}</Text>
        ):(

          <View className="flex-1 mt-5">
          <SearchBar
          onPress={()=>router.push('/search')}
          placeholder='Search for a movie'
          />

          {tredingMovies&&(
            <View className="mt-10">
              <Text className="text-white text-lg font-bold mb-3 ">
                Trending movies
              </Text>
              <FlatList 
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={()=>(<View className="w-4"></View>)}
             
              data={tredingMovies} 
              renderItem={({item,index})=>(
               <TrendingCard movie={item} index={index}/>)}
              keyExtractor={(item)=>item.movie_id.toString()}
              />
            </View>
          )}

          <>
          <Text className="text-lg text-white font-bold mt-5 mb-3">
            Latest Movies
          </Text>
          <FlatList 
          data={movies || []}
          renderItem={({item})=>(
            
            <MovieCard
            {...item}
            />
          
          )}
          keyExtractor={(item)=>item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent:'flex-start',
            gap:20,
            paddingRight:5,
            marginBottom:10
          }}
          className="mt-2 pd-32"
          scrollEnabled={false}
          />
          </>

        </View>

        )}

      </ScrollView>


    </View>
  );
}
