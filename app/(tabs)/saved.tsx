import { View, Text, Image, TouchableOpacity, ScrollView, ActionSheetIOS, ActivityIndicator, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { icons } from '@/constants/icons'
import { router, useFocusEffect } from 'expo-router'
import useFetch from '@/sevices/useFetch'
import { getsavedmovies } from '@/sevices/saveMovies';
import SaveCard from '@/components/SaveCard';
import { getCurrentUser } from '@/sevices/loginpage'



const Saved = () => {
  const { data: user, loading: userLoading } = useFetch(getCurrentUser)
  const { data: movies, loading: moviesloading, error: moviesError,refetch } = useFetch(getsavedmovies);
 useFocusEffect(useCallback(()=>refetch,[user])
)
const isEmpty = !moviesloading && !moviesError && (!movies || movies.length === 0);
if (!user && !userLoading) {
    return (
      <View className="flex-1 bg-primary">

        <View className="ml-2">
          <TouchableOpacity className="mt-10" onPress={router.back}>
            <Image source={icons.back} className="mt-10" />
          </TouchableOpacity>
          <View className="flex-col mt-5 ml-4">
            <Text className="text-[#A8B5DB] text-xl font-bold">Saved Movies</Text>
          </View>
        </View>
        <View className="flex-1 flex-col justify-center items-center">
          <Image source={icons.savedicon} />
          <Text className="text-[#4E495A]">Login to save your movies</Text>
        </View>
      </View>
    )
  }
  else
{
return (
    <View className='flex-1 bg-primary'>
      <View className='ml-2'>
        <TouchableOpacity className='mt-10' onPress={router.back}>
          <Image source={icons.back} className='mt-10' />
        </TouchableOpacity>

        <View className='flex-col mt-5 ml-4'>
          <Text className='text-[#A8B5DB] text-xl font-bold'>Saved movie</Text>
        </View>
      </View>
      {moviesloading ? (<ActivityIndicator size='large' color='#0000ff' className="mt-10 self-center" />)
        : moviesError ? (<Text className='text-white'>Error:{moviesError.message}</Text>)
          : isEmpty ? (
            <View className='flex-1 flex-col justify-center items-center'>
              <Image source={icons.savedicon} />
              <Text className='text-[#4E495A]'>save</Text>

            </View>) : (

            <ScrollView>
              <FlatList
              data={movies||[]}
              renderItem={({item})=>(
                <SaveCard
               movie={item}/>   
              )}
              keyExtractor={(item)=>item.movie_id.toString()}
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
            </ScrollView>
          )}
    </View>
  )
}
  
}

export default Saved