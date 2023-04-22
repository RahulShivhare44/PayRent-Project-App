import React from 'react';
import { View,TouchableOpacity,Text,Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

export default function AppButton({buttonText,btnWidth,bgcolor,...props}) {
  return (
      <TouchableOpacity {...props}>
        <View style={{ width: width * (btnWidth?btnWidth:1),backgroundColor: bgcolor?bgcolor:'#3498db',borderRadius: 10,borderWidth: 0.5,borderColor: bgcolor,padding: 10,marginTop: 10,display: 'flex', alignItems: 'center'}}>
          <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
            {buttonText}
          </Text>
        </View>
      </TouchableOpacity>
  );
}


  