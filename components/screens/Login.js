import React, {useState} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {postData} from '../../services/FetchNodeServices';
import Input from '../uicomponents/Input';
import AppButton from '../uicomponents/AppButton';
import { storeData } from '../storage/AsyncStorage';


const {width, height} = Dimensions.get('window');

function Login({navigation, props}) {
  const [inputs, setInputs] = useState({mobileEmail: '', password: ''});
  const [error, setError] = useState({});

  const validate = () => {
    var isValid = true;
    if (!inputs.mobileEmail) {
      handleErrors('Pls input emailid/mobile number..', 'mobileEmail');
      isValid = false;
    }
    if (!inputs.password) {
      handleErrors('Pls input password..', 'password');
      isValid = false;
    }
    return isValid;
  };

  const handleClick = async () => {
    if (validate()) {
      var result = await postData('user/check_user_mobileno', {
        mobileno: inputs.mobileEmail,
      });
      if (result.status) {
        storeData("USER",result.data)
        navigation.navigate('Home1');
      } 
      else {
        alert('Invalid Password/Emailid/Mobile Number');
      }
    }
  };

  const handleValues = (txt, attr) => {
    setInputs(prevStates => ({...prevStates, [attr]: txt}));
  };

  const handleErrors = (txt, attr) => {
    setError(prevStates => ({...prevStates, [attr]: txt}));
  };

  return (
    <View style={{alignSelf: 'center', marginTop: height * 0.25}}>
      <View style={{padding: 15,width: width * 0.9,borderRadius: 20,height: height * 0.4,}}>

        <Input error={error.mobileEmail} onFocus={() => handleErrors(null, 'mobileEmail')} onChangeText={txt => handleValues(txt, 'mobileEmail')} iconName="email" labelTxt="EmailId/Mobile" placeholder="Email Address/Mobile Number" />
        <Input error={error.password} onFocus={() => handleErrors(null, 'password')} onChangeText={txt => handleValues(txt, 'password')} iconName="lock" labelTxt="Password" placeholder="Password" />

        <AppButton
          onPress={handleClick}
          btnWidth={0.85}
          buttonText={'Sign In'}
          bgcolor={'#27ae60'}
        />

      </View>
    </View>
  );
}


export default Login;
