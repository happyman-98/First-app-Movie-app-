import { Image, ScrollView, StyleSheet, Text, TextComponent, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import useFetch from '@/sevices/useFetch';
import { fetchMoviseDetails } from '@/sevices/api';
import { icons } from '@/constants/icons';

interface MovieInfoProps {
  label:string,
  value?:string|Number|null
}
const Movieinfo=({label,value}:MovieInfoProps)=>(
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 text-sm font-horizontal'>
{label}
    </Text>
    <Text className='text-light-100 font-bold text-sm mt-2'>
  {value || 'N/A'}
    </Text>

  </View>
)

const moviedetials = () => {
    const {id}=useLocalSearchParams();
    const {data:movie,loading}=useFetch(()=>fetchMoviseDetails(id as string))


  return (
    <View className='bg-primary flex-1 p-3'>
      <ScrollView contentContainerStyle={{
        paddingBottom:80
      }}>
        <View>
          <Image source={{uri:`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}} className='w-full h-[500px]'
          resizeMode='stretch'/>
          <View className='flex-col items-start justify-center mt-5 px-5'>
      <Text className='text-white font-bold text-xl'>
        {movie?.title}
      </Text>

      <View className="flex-row items-center gap-x-1 text-sm mt-2">
      <Text className='text-light-200 text-sm'>{movie?.release_date.split('-')[0]}</Text>
      <Text className='text-light-200 text-sm'>{movie?.runtime} min</Text>

      

      </View>
      <View className='flex-row items-start bg-dark-100 px-200 rounded-md gap-x-1 mt-2'>
        <Image
        source={icons.star}
        className='size-4'
        />
        <Text className='text-light-200 text-sm'>
          {Math.round(movie?.vote_average ?? 0)}/10  
        </Text>
        <Text className='text-light-200 text-sm'>
          ({(movie?.vote_count)} )  vote count
        </Text>

      </View>

    <Movieinfo label="overview" value={movie?.overview}/>
    <Movieinfo label="Genres" value={movie?.genres?.map((g)=>g.name).join('-')|| 'N/A'}/>
      <Movieinfo label='Budget' value={`$${movie?.budget/1_000_000} million`}/>
    <Movieinfo label="Revenue" value={`$${Math.round(movie?.revenue)/1_000_000} million`}/>
    <Movieinfo label="Production Company " value={movie?.production_companies?.map((c)=>(c.name)).join(',')}/>
      
      </View>
        </View>

      </ScrollView>
      <TouchableOpacity className='absolute bottom-5 mb-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50' onPress={router.back}>
        <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor='#fff'/>
        <Text className='text-white font-semibold text-base'>Go back</Text>
      </TouchableOpacity>

    </View>
  )
}

export default moviedetials

const styles = StyleSheet.create({})