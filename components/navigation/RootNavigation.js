import React,{useState,useEffect} from 'react';
import Login from '../screens/Login';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, Image } from 'react-native';
import Home from '../screens/Home';
import ListCars from '../screens/ListCars';
import AppHeader from '../uicomponents/AppHeader';
import BookingSummary from '../screens/BookingSummary';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
// Drawer
import {createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem,} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
// Storage 
import { getStoreData, removeStoreData } from '../storage/AsyncStorage';


export default function RootNavigation() {
  const [initialScreen,setInitialScreen]=useState(null)
  const [userInfo,setUserInfo]=useState([])

  const checkAuth=async()=>{
    var user=await getStoreData('USER')
    setUserInfo(user)
    console.log("User:",userInfo)
    if(!user){
      setInitialScreen("Login")
    }
    else{
      setInitialScreen("Home1")
    }
  }

  useEffect(function(){
    checkAuth()
  },[])

  const handleLogout=(props)=>{
    removeStoreData("USER")
    props.navigation.navigate('Login')
  }

  const ProjectDrawer = () => {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={Home}   options={{headerShown: false,drawerIcon:()=><MCI name={'home-city'} size={20} />}}   />
        <Drawer.Screen name="Listcars" component={ListCars} options={{headerShown: false,drawerIcon:()=><MCI name={'car'} size={20} />}} />
      </Drawer.Navigator>
    );
  };

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        
        <View style={{display: 'flex',padding: 20,alignItems:'center',justifyContent:'center',flexDirection:"column" }}>
          <Image
            style={{marginBottom: 5,resizeMode: 'contain',width: 100,height: 100,borderRadius: 50}}
            source={require(`../assets/person.jpg`)}
          />
          <Text style={{fontWeight:'bold'}}>{userInfo.fullname}</Text>
          <Text>+91{userInfo.mobileno}</Text>
          <Text style={{ fontSize: 12 }}>{userInfo.emailid}</Text>
        </View>

        <DrawerItemList {...props} />
        
        <DrawerItem
          label="My Profile"
          icon={()=><MCI name={'account-details-outline'} size={20} />}
        />
        <DrawerItem
          label="Settings"
          icon={() => <MCI name={'account-settings'} size={20} />}
        />
        <DrawerItem 
          label="Logout" 
          icon={()=><MCI name="logout" size={20} />}
          onPress={()=>handleLogout(props)} 
          />

      </DrawerContentScrollView>
    );
  }

  return (
    <NavigationContainer>
   { initialScreen?
    <Stack.Navigator
      initialRouteName={initialScreen}
    >
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
      <Stack.Screen name="Home1" component={ProjectDrawer} options={{header: AppHeader}} />
      <Stack.Screen name="ListCars" component={ListCars}  />
      <Stack.Screen name="BookingSummary" component={BookingSummary}  />
      <Stack.Screen name="AppHeader" component={AppHeader} options={{headerShown: false}} />
    </Stack.Navigator>:<Text>Pls With Repeat</Text>
   }
   </NavigationContainer>
  );
}
