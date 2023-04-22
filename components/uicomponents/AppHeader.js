import React from 'react';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Image,Dimensions } from 'react-native';
// Navigation
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';


const {width,height}=Dimensions.get('window')

export default function AppHeader(props) {
   var navigation=useNavigation() 

  return (
    <View>
      <View style={{backgroundColor:'#fff',display:'flex',width:width,height:height*0.06,justifyContent:'space-between',alignItems:'center',flexDirection:'row',padding:5}} >
        <MCI name='menu' size={24} onPress={()=>navigation.dispatch(DrawerActions.openDrawer())} />
        <Image style={{resizeMode:'contain',width:50,height:40}} source={require(`../assets/Logo.png`)} />  
        <MCI name='account' size={24} /> 
    </View>
    </View>
  )
}


