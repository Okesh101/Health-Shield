import { View ,Text,Image, StyleSheet} from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';




const  Post = ({title, body, image})  => {

    return (

        <View > 

            <Text style = {stylez.heading}>{title}</Text>
            <Text style = {{color : '#dc3545'}}>{body}</Text>
            <Image style = {{width : 350, borderRadius :10, alignSelf : "center"}} source={image}/>

        </View>


       

    )
}

 const stylez = StyleSheet.create({

 heading : {
        fontSize : 24,
        fontWeight : 900
    
    }
 
 })
 
   

export default Post;