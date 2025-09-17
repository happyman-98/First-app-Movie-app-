import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import { getCurrentUser, logInUser } from '@/sevices/loginpage'
import { router } from 'expo-router'

const logIn = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const hanedelLogin=async()=>{
      try{
     const user=await logInUser({
        email:email,
        password:password
      })
      const userData= await getCurrentUser()
      if(user){
        router.push({pathname:'/loginpage/profielPage',
                    params:{id:userData.$id,email:userData.email,name:userData.name}}
        )
      } 
      }
      catch(error)
      {
        console.log("log in error : ",error)
        throw error
      }
 

    }
  return (
    <View className='flex-1 bg-primary'>
        <Image source={images.bg} className='absolute w-full z-0'/>
        <Image source={icons.logo} className="w-12 h-10 mt-40 mb-10 mx-auto" />

        <View className='flex-col ml-10'>
            <Text className='text-white text-2xl'>Welcome back ! Glad{'\n'}
                to see you, Again ! </Text>
                <TextInput
                className='w-[367px] h-[53px] bg-[#31354F] mt-20 mb-5 rounded-xl px-4'
                placeholder='Enter the email'
                value={email}
                onChangeText={setEmail}
                />
                 <TextInput
                className='w-[367px] h-[53px] bg-[#31354F] rounded-xl px-4'
                placeholder='Enter the password'
                value={password}
                onChangeText={setPassword}
                />
                <TouchableOpacity className='w-[367px] h-[56px] bg-[#627ECE] mt-20 items-center justify-center rounded-3xl' onPress={hanedelLogin}>
                    <Text className='text-white text-center'>Log in</Text>
                </TouchableOpacity>
        </View>
    </View>
  )
}

export default logIn