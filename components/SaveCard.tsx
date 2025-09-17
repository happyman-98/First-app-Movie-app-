import { View, Text, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'


const SaveCard =({movie:{movie_id,poster_url,title}}:SaveCardProps) => {
  return (
<Link href={`/movies/${movie_id}`} asChild>
    <TouchableOpacity className='w-32 relative pl-5'>
    <Image source={{uri:poster_url}}
    className='w-32 h-48 rounded-lg'
    resizeMode='cover'/>
    <Text className='text-sm text-white font-bold mt-2' numberOfLines={1}>
        {title}
    </Text>
    </TouchableOpacity>
</Link>
  )
}

export default SaveCard