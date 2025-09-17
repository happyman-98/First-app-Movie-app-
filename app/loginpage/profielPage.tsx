import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'
import useFetch from '@/sevices/useFetch'
import { getCurrentUser, logout } from '@/sevices/loginpage'
import { router} from 'expo-router'

const profielPage = () => {
  const {data:user,loading:userdataloading,error:userError}=useFetch(getCurrentUser,true);
  console.log('user loged in')
  const handelLogout=async()=>{
    try{
    if(user)
    {
      await logout();
      router.push('/')
    }
    }
    catch(error)
    {
      console.log('logout error',error)
      throw error
    }
  }
  return (
    <View className='flex-1 bg-primary'>
      <TouchableOpacity className='mt-10 mb-10' onPress={()=>router.push('/')}>
        <Image source={icons.back}  />
      </TouchableOpacity>
      <View className='flex-row'>
        <Image source={icons.profile} className='itmes-start'/>
      {userdataloading?(<ActivityIndicator
      size='large'
      color='#0000ff'
      className='mt-10 self-center'
      />):userError?(
          <Text className="text-white">Error : {userError?.message}</Text>
        ):(
          <View className='flex-col'>
            <Text className='text-[#A8B5DB] text-xl font-bold'>
                 {user?.name?.split(' ')[0]}
            </Text>
            <Text className='text-[#A8B5DB] text-xl font-bold'>
                {user?.name.split(' ')[1]}
            </Text>
            <Text className='text-[#747D98] text-sm font-bold'>
                {user?.email}
            </Text>
        </View>
        )
}
</View>
                <TouchableOpacity className='w-[367px] h-[56px] bg-[#627ECE] mt-20 justify-center mx-auto
                 rounded-3xl' onPress={handelLogout}>
                    <Text className='text-white text-center'>Log out</Text>
                </TouchableOpacity>
    </View>
  )
}

export default profielPage