import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'

const MovieCard = ({id,poster_path,title,vote_average,release_date}:Movie) => {
  return (
    <View className='w-[30%]'>
        <Link href={`/movie/${id}`} asChild>
        <TouchableOpacity >
          <Image
          source={{
            uri:poster_path?`https://image.tmdb.org/t/p/w500${poster_path}`:
            `https://placehold.co/600x400/1a1a1a/ffffff.png`

          }}
          className='w-full h-52 rounded-lg'
          resizeMode='cover'
          />
        <Text className='text-sm text-white font-bold mt-2' numberOfLines={1}>{title}</Text>
        
        <View className='flex-row items-center justify-start mt-2'>
          <Image
        source={icons.star}
        className='size-4'
        />
        <Text className='text-white font-bold ml-1 uppercase text-xs'>{Math.round(vote_average/2)}</Text>
</View>

<View className='flex-row items-center justify-between'>
<Text className='text-white text-xs mt-1'>{release_date.split('-')[0]}</Text>
          {/* <Text className='text-lime-300 uppercase font-mw
          text-xs'>Movie</Text> */}
</View>
          </TouchableOpacity>
          </Link>
    </View>
  )
}

export default MovieCard

const styles = StyleSheet.create({})