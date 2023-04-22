import React from 'react';
import { StyleSheet, Text, TextInput, Dimensions, View } from 'react-native';
import  Icon from "react-native-vector-icons/MaterialCommunityIcons"
const { width, height } = Dimensions.get('window')

export default function Input({ labelTxt,iconName,error,setValue,...props }) {
    return (
        <View style={{  width: width * 0.9, marginTop:4,marginBottom:4 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{labelTxt}</Text>

            <View style={styles.textContainer}>
                <Icon name={iconName} style={{fontSize:22}} />
                <TextInput   
                    style={{ fontSize: 16 }}
                    {...props}
                />
            </View>
            
           {error?<Text style={{ fontSize: 14, fontWeight: 'bold',color:'red' }}>{error}</Text>:<></>}

        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        width: width * 0.85,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 0.9,
        borderColor: '#000',
        padding: 10,
        marginTop: 10,
        display:'flex',
        alignItems:'center',
        flexDirection:'row'
    },
});


