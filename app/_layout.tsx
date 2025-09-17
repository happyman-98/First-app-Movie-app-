import { Stack } from "expo-router";
import './global.css'
import { StatusBar } from "react-native";
import { useUserStore } from "@/sevices/loginpage";
export default function RootLayout() {
  // const fetchuser=useUserStore((state)=>state.fetchuser)
  return (
  <>
      <StatusBar hidden={true}/>
  <Stack>
    <Stack.Screen
    name="(tabs)"
    options={{headerShown:false}}
    />
     <Stack.Screen
    name="movies/[id]"
    options={{headerShown:false}}
    />
<Stack.Screen
  name="loginpage/logIn"
  options={{ headerShown: false }}
/>

<Stack.Screen
  name="loginpage/signUp"
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="loginpage/profielPage"
  options={{ headerShown: false }}
/>
    </Stack>
    </>)
}
