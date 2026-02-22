import {View, Text,TextInput, Pressable,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';




const Dashboard = () => {
    return(

<SafeAreaView style = {{
    paddingHorizontal : 15,
    backgroundColor: "#011128",
    flex :1,
   
              
    }}> 
       
    <View style={{gap:10, margin:10}}>
        <Text style={{fontSize: 24, fontWeight: "500", color: "#FFFF", marginTop: 20,}}>Dashboard</Text>
        <View style={{height: 1, backgroundColor:"rgba(255, 255, 255, 0.4)", marginVertical: 10}} />
        
        <View style ={{ gap:30, alignItems:"center", backgroundColor: "rgba(255, 255, 255, 0.05)",height:300, marginTop:20,paddingHorizontal:10, alignItems:'center', borderRadius:20, }}>
        <Text style={{fontSize: 30, fontWeight: "500", color: "#FFFF", marginTop: 20,}}>AI-Powered Health Assessment</Text>
        <Text style={{color:"rgba(255, 255, 255, 0.4)", fontSize:16}}>Get Prediction of Cholera and Lassa fever using voice input</Text> 
           <Pressable style={{backgroundColor:'#007AFF', width:200, marginTop:20, padding:15, borderRadius:10}} onPress={() => router.push("MedicalAssessment")}>
                 <Text  style={{color:'white', textAlign:'center', fontWeight:'bold'}}>Start New Assessment</Text>  
            </Pressable>
        </View>

    </View>

    
</SafeAreaView>

);
    
}

export default Dashboard ;