

import {View, Text, TextInput, Pressable} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { router } from 'expo-router';




const SignIn = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return(
    <SafeAreaView style = {{paddingHorizontal : 15, backgroundColor: "#011128", flex:1,}}> 

    <View style={{ padding: 20, borderRadius: 10, marginTop: 50,}}>

      <Text style={{fontSize: 25, fontWeight: "700",  marginTop: 4, marginBottom: 10, color:"white"}}> Sign In </Text>
            <View  style={{gap:25, marginTop:10,}}>
                <TextInput placeholder='Email'  placeholderTextColor={"rgba(255, 255, 255, 0.4)"}   keyboardType='email-address' value = {email} onChangeText={setEmail} autoCapitalize='none' style = {{borderWidth : 0.5, borderRadius:10, height:50, paddingHorizontal:10, backgroundColor: "rgba(255, 255, 255, 0.05)"}}/>
        <       TextInput placeholder='Password' placeholderTextColor={"rgba(255, 255, 255, 0.4)"}  value={password} onChangeText={setPassword} secureTextEntry style = {{borderWidth :0.5, borderRadius:10, height:50, paddingHorizontal:10, backgroundColor: "rgba(255, 255, 255, 0.05)"}}/>

            </View>

        <View style={{ marginTop: 20 }}>
          <Pressable style={{backgroundColor:'#007AFF', padding:15, borderRadius:10}} onPress={() => router.push("./Dashboard")}>
            <Text style={{color:'white', textAlign:'center', fontWeight:'bold'}}>Sign In</Text>
          </Pressable>
        </View>

        <View>
          <Text style={{color:"white", marginTop:40, textAlign:"center", fontSize:16}}>Ai-Powered Early Health Detection</Text>
        </View>


    </View>

      </SafeAreaView>
  );
}


export default SignIn;

