

import {View, Text, Image, TextInput, TouchableOpacity, Alert, Pressable, ScrollView} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Input from './component/input';
import Button from './component/button';
import Post from './component/post';

export default function index (){
  return(
    // <SafeAreaView style = {{
    //   paddingHorizontal : 15, 
      
    // }}> ///safearea opening tag for the facebook sin in page.

      <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#f8f8f8', // fixed color
      }}
    >
      <ScrollView contentContainerStyle={{paddingBottom: 30,}} showsVerticalScrollIndicator={false} >

          <View style={{gap : 10}}>
          <Post title={'Why is the earth round???'} body={'The earth is round beause that is how the creator made it'} image={require("../assets/images/earth.jpg")}/>
          <Post title={'Why does cow produce milk???'} body={'The earth is round beause that is how the creator made it'} image={require("../assets/images/earth.jpg")}/>
          <Post title={'Why does cow produce milk???'} body={'The earth is round beause that is how the creator made it'} image={require("../assets/images/earth.jpg")}/>
          <Post title={'Why does cow produce milk???'} body={'The earth is round beause that is how the creator made it'} image={require("../assets/images/earth.jpg")}/>
          <Post title={'Why does cow produce milk???'} body={'The earth is round beause that is how the creator made it'} image={require("../assets/images/earth.jpg")}/>
          <Post title={'Why does cow produce milk???'} body={'The earth is round beause that is how the creator made it'} image={require("../assets/images/earth.jpg")}/>
          </View>
         





        {/* for reusable component */}
        <View style={{ marginTop: 40, gap: 10 }}>
          <Input label={'Fullname '} placeholder={'Enter your fullname'} />
          <Input keyboardType={'email-address'} label={'Email '} placeholder={'Enter your email'} />
          <Input keyboardType={'numeric'} label={'Phone nuber'} placeholder={'Enter your Phone No'} />
          <Input secureTextEntry={true} label={'Passwword'} placeholder={'Enter your Password'} />
        </View>

        <View style={{ marginTop: 20 }}>
          <Button title={'Submit'} backgroundColor={'#007AFF'} />
          <Button title={'Sign in'} backgroundColor={'#28a745'} />
          <Button title={'Cancel'} backgroundColor={'#dc3545'} />
        </View>



        {/* // For facebook continouation */}
        {/* <Text style = {{alignSelf : 'center', paddingTop : 50, fontSize : 20, color : 'gray'}}>English (US)</Text>
        <Image style = {{width : 100, height : 100, alignSelf : 'center', marginTop : 50}} source={require('../assets/images/Facebook.png')}/>

        <TextInput placeholder='Mobile number or email' placeholderTextColor='#606770' style = {{ fontSize : 14, borderWidth : 1, borderColor : '#CCC', borderRadius : 15,height : 60, paddingHorizontal: 10, marginTop : 60 }}/>

        <TextInput placeholder='Password' placeholderTextColor='#606770' style = {{fontSize : 14, borderWidth : 1, borderColor : '#CCC', borderRadius : 15,height : 60, paddingHorizontal: 10, marginTop : 20 }}/>

        <Pressable style = {{ backgroundColor : '#1877F2', marginTop : 20, height : 50, borderRadius : 40}}>
          <Text style = {{color : '#FFF', alignSelf : 'center', paddingTop : 10, fontSize : 20}}>Log in</Text>
        </Pressable>

        <Text style = {{alignSelf : 'center', marginTop : 10, fontSize : 20, color : '#606770'}}>Forgot password?</Text>

        <Pressable style = {{ borderWidth : 1, marginTop : 100, height : 50, borderRadius : 40, borderColor : '#1877F2' }}>
          <Text style = {{alignSelf : 'center', paddingTop : 10, fontSize : 20, color : '#1877F2' }}> Create new account </Text>
        </Pressable>

        <Image style = {{width : 100, height : 100, alignSelf : 'center', marginBottom : 10}} source={require('../assets/images/meta.png')}/>
        */}





      </ScrollView>
    </SafeAreaView>
  );
}