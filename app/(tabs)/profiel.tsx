import { View, Text ,Image, TouchableHighlight, TouchableOpacity} from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import { router, useFocusEffect } from 'expo-router'
import { createGuestSession, getCurrentUser } from '@/sevices/loginpage'

const profiel = () => {
  // useFocusEffect(
  //   useCallback(()=>{
  //   const checksession=async()=>
  //   {
  //     const user=await getCurrentUser()

  //     if (user)
  //     {
  //       router.push('/loginpage/profielPage')
  //     }
      
  //   }
  //   checksession()
  // },[]))
  useEffect(()=>{
 const checksession=async()=>
    {
      const user=await getCurrentUser()

      if (user)
      {
        router.replace('/loginpage/profielPage')
      }

      
    }
    checksession()
  },[])

  
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='absolute w-full z-0'/>
      <Image source={icons.logo} className="w-25 h-23 mt-[212px] mx-auto" />
      <View className='flex-col mt-[480px]'>
      <TouchableOpacity className='w-[367px] h-[56px] bg-[#627ECE] mb-5 mx-auto justify-center rounded-3xl' onPress={()=>router.push('/loginpage/logIn')}>
        <Text className='text-center text-white'>
          Log in
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className='w-[367px] h-[56px] bg-[#2C3348] mx-auto justify-center rounded-3xl' onPress={()=>router.push('/loginpage/signUp')}>
        <Text className='text-center text-[#BEBEBE]'>
          Register
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default profiel