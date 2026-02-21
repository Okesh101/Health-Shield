import { Text, View, TouchableOpacity} from "react-native";


const Button = ({title, backgroundColor}) => {
    return (

        

        <TouchableOpacity style = {{backgroundColor : backgroundColor, marginBottom : 20, borderRadius : 12, alignItems : 'center', justifyContent : 'center', height : 50, borderColor : 'white', borderWidth : 1}}>
            <Text style = {{color : 'white', fontSize : 18, fontWeight : 'bold'}}>{title}</Text>
        </TouchableOpacity>
    )
}



export default Button ;