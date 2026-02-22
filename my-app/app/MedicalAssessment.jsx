import { SafeAreaView } from "react-native-safe-area-context";
import { View,Text,Image,Pressable } from "react-native";
import { router } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';




const MedicalAssessment = () => {
    return(
        <SafeAreaView style = {{paddingHorizontal : 15, backgroundColor: "#011128", flex:1,
        }}>

            <View style={{marginTop:40}}>
             <Text style={{color:"white", fontSize:24, fontWeight:"bold", marginTop:20, marginBottom:10,}}>Medical Assessment</Text>
            <View style={{height: 1, backgroundColor:"rgba(255, 255, 255, 0.4)", marginVertical: 10}} />
            
                     <Text style={{color:"white", fontSize:20, fontWeight:"bold", marginTop:20}}>How would you like to describe your Symptoms?</Text>
             <View style={{backgroundColor:"rgba(255, 255, 255, 0.05)", height:200, marginTop:20,paddingHorizontal:10, alignItems:'center', borderRadius:20, gap:20}}>
                    <FontAwesome name="microphone" size={70} color= "#007AFF" style={{marginTop:20, backgroundColor:"radial-gradient(circle at center, #le3a8a 0%, #le40af 40%, #1352e5 75%)"}}/>
                    <Text style={{color:"white", fontSize:20, fontWeight:"bold"}}>Use Voice</Text>
                    <Text style={{color:"rgba(255, 255, 255, 0.4)", fontSize:16}}>Speak your Symptoms aloud</Text>
            </View>

            <View style={{backgroundColor:"rgba(255, 255, 255, 0.05)", height:200, marginTop:20,paddingHorizontal:10, alignItems:'center', borderRadius:20, gap:20}}>
                    <MaterialCommunityIcons name="note-text-outline" size={70} color="#007AFF" style={{marginTop:20}}/>
                    <Text style={{color:"white", fontSize:20, fontWeight:"bold"}}>Use Text</Text>
                    <Text style={{color:"rgba(255, 255, 255, 0.4)", fontSize:16}}>Type your Symptoms</Text>
            </View>

                    

        
        </View>
        </SafeAreaView>
    )
}

export default MedicalAssessment;