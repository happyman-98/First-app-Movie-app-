import { View, Text,Image,TextInput, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { signInUser } from '@/sevices/loginpage';
import { router } from 'expo-router';

const signUp = () => {

const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [firstname,setFirstname]=useState('');
    const [lastname,setLastname]=useState('');

const handleRegister = async () => {
    try {
      const user = await signInUser({
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
      });
      if(user)
      {
        router.push('/loginpage/logIn')
      }
    } catch (error) {
      console.log("Sign up error:", error);
    }
  };
    

  return (
    <View className='flex-1 bg-primary'>
        <Image source={images.bg} className='absolute w-full z-0'/>
        <Image source={icons.logo} className="w-12 h-10 mt-40 mb-10 mx-auto" />

        <View className='flex-col ml-10'>
            <Text className='text-white text-2xl'>Hello ! register to {'\n'}
                get started</Text>
                <TextInput
                className='w-[367px] h-[53px] bg-[#31354F] mt-20 mb-5 rounded-xl px-4'
                placeholder='Enter the First name'
                value={firstname}
                onChangeText={setFirstname}
                />
                 <TextInput
                className='w-[367px] h-[53px] bg-[#31354F] mb-5 rounded-xl px-4'
                placeholder='Enter the Last name'
                value={lastname}
                onChangeText={setLastname}
                />
                <TextInput
                className='w-[367px] h-[53px] bg-[#31354F] mb-5 rounded-xl px-4'
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
                <TouchableOpacity className='w-[367px] h-[56px] bg-[#627ECE] mt-20 items-center justify-center rounded-3xl' onPress={handleRegister}>
                    <Text className='text-white text-center'>Register</Text>
                </TouchableOpacity>
        </View>
    </View>
  )
}

export default signUp