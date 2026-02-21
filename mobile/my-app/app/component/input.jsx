 import { View, TextInput, StyleSheet,Text } from "react-native"


const Input  = ({placeholder,label, keyboardType, secureTextEntry}) => {

    return (
    

        <View style = {styles.container}>

            <Text style = {{marginBottom : 10, fontWeight : 'bold'}}>{label}</Text>
            

            <TextInput secureTextEntry = {secureTextEntry} keyboardType = {keyboardType} style = {{paddingHorizontal : 20, paddingLeft : 12, backgroundColor : 'white', borderRadius : 15, height : 50, }} placeholderTextColor={'black'} placeholder= {placeholder}></TextInput>


        </View>

     )
}

const styles = StyleSheet.create ({

        container : {
            //backgroundColor : 'white',
           // height : 50 ,
            borderRadius : 12,
            


        }

})


export default Input;