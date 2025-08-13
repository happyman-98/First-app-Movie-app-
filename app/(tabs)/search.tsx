import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/sevices/useFetch'
import { icons } from '@/constants/icons'
import { fetchMovise } from '@/sevices/api'
import SearchBar from '@/components/SearchBar'


const search = () => {
  const  [SearchQuery, setSearchQuery] = useState('');
  const { data:movies,loading:moviesloading,error:moviesError,refetch:loadmovies,reset}=useFetch(()=>fetchMovise({
    query:SearchQuery
  }),false)

useEffect(()=>{
  const timeOutId=setTimeout(async()=>{
    if( SearchQuery.trim())
    {
      await loadmovies();
    }
    else{
      reset()
    }

  },500)
  return ()=>clearTimeout(timeOutId);
},[SearchQuery])


  return (
    
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0'/>
      <FlatList data={movies||[]} renderItem={({item})=><MovieCard{...item}/>}
      keyExtractor={(item)=>item.id.toString()}
      numColumns={3}
      columnWrapperStyle={{
        justifyContent:'center',
        gap:16,
        marginVertical:16,

      }}
      contentContainerStyle={{
        paddingBottom:100
      }}
      ListHeaderComponent={
        <>
       <View className='w-full flex-row justify-center mt-20 items-center'>
          <Image
           source={icons.logo}
           />
        </View>
        <View className='my-5'>
        <SearchBar 
        value={SearchQuery}
        onChangeText={(text:string)=>(setSearchQuery(text))}
        
        placeholder='Search for the movies ...'/>
        </View>
        {moviesloading&&( <ActivityIndicator size='large' color='#0000ff' className='my-3'/>)}
        {moviesError&& (<Text className='text-red-500 px-5 my-3 '>Error:{moviesError.message}</Text>)}
        {!moviesloading && !moviesError &&SearchQuery.trim()&&movies?.length>0&&(
          <Text className='text-white text-xl font-bold'>
            Search Results <Text className='text-accent'>
              {SearchQuery}
            </Text>
          </Text>
        )}
        </>
        
      }
      ListEmptyComponent={
        !moviesloading && !moviesError?(
          <View className=' mt-10 px-5'>
            <Text className='text-gray-500 text-center'>{SearchQuery.trim()?'No movies found ':'Serch for a movie'}</Text>

          </View>
        ):null
      }
      />
    </View>
  )
}

export default search