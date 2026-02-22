import { Stack } from "expo-router";

const Layout = () => {
  return(

    <Stack screenOptions={{headerShown:false}} initialRouteName="index">

    <Stack.Screen name="index"  options={{headerShown:false}}/>
    <Stack.Screen name="Dashboard" options={{headerShown:false}}/>
    <Stack.Screen name="SignIn" options={{headerShown:false}}/>
    <Stack.Screen name="MedicalAssessment" options={{headerShown:false}}/>

    </Stack>

  ) 

  

  
}

export default Layout;