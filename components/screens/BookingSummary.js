import React,{useState,useEffect} from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { ServerURL } from '../../services/FetchNodeServices';
import { useNavigation } from '@react-navigation/native';
import AppButton from '../uicomponents/AppButton';
const { width, height } = Dimensions.get('window');
import { getStoreData } from '../storage/AsyncStorage';
// Razor pay
import RazorpayCheckout from 'react-native-razorpay';

export default function BookingSummary(props) {
  var navigation = useNavigation()

  var vehicle = useSelector(state => state.vehicle);
  var item = Object.values(vehicle)[0];
  var bookingDetails = useSelector(state => state.booking)
  

  var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const getDateFormat = (d, t) => {
    var dd = d.split("/")
    var cd = dd[2] + '-' + dd[1] + '-' + dd[0] + ' ' + t.substring(0, t.lastIndexOf(' ')) + ":00"
    var nd = new Date(cd)
    console.log('Date:', nd)
    return nd
  }

  var dpc=500
  var rc=1000

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

  var ta=item.rentperhour*(bookingDetails.days*(24+parseInt(bookingDetails.hours)))
  var options = {
    description: 'Credits towards Car Rent',
    image: `${ServerURL}/images/Logo1.png`,
    currency: 'INR',
    key: 'rzp_test_GQ6XaPC6gMPNwH', // Your api key
    amount: ta*100,
    name: userInfo.fullname,
    prefill: {
      email: userInfo.emailid,
      contact: userInfo.mobileno,
      name: 'PaynRent'
    },
    theme: {color: '#F37254'}
  }

  const handlePayment=()=>{
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      // handle failure
      alert(`Error: ${error.code} | ${error.description}`);
    });
  }

  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: '#ecf0f1',
        alignItems: 'center',
      }}>

      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: 'poppins', fontSize: 20, fontWeight: 'bold' }}>
          Booking Details
        </Text>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontFamily: 'poppins',
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000000',
          }}>
          {item.companyname} {item.modelname}
        </Text>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginTop: 10,
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'baseline' }}>
          <Image
            source={require('../assets/petrol.png')}
            style={{
              resizeMode: 'contain',
              height: 13,
              width: 13,
            }}
          />
          <Text
            style={{
              fontFamily: 'poppins',
              fontWeight: 'bold',
              marginLeft: 5,
            }}>
            {item.fueltype}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'baseline' }}>
          <Image
            source={require('../assets/manual.png')}
            style={{
              resizeMode: 'contain',
              height: 13,
              width: 13,
            }}
          />
          <Text style={{ fontFamily: 'poppins', fontWeight: 'bold', marginLeft: 5 }}>
            Manual
          </Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'baseline' }}>
          <Image
            source={require('../assets/seat.png')}
            style={{
              resizeMode: 'contain',
              height: 13,
              width: 13,
            }}
          />
          <Text style={{ fontFamily: 'poppins', fontWeight: 'bold' }}>
            {item.capacity} Seats
          </Text>
        </View>
      </View>

      <View style={{ width: width * 0.6, height: height * 0.12, marginTop: 8 }}>
        <Image
          source={{ uri: `${ServerURL}/images/${item.icon}` }}
          style={{
            resizeMode: 'contain',
            height: height * 0.12,
            width: width * 0.6,
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 10,
          margin: 10,
          marginTop: 5,
          elevation: 10,
          backgroundColor: 'white',
        }}>
        <View style={{ width: width * 0.6, flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontFamily: 'poppins',
                  fontWeight: 'bold',
                  color: '#008b8b',
                  fontSize: 12
                }}>
                1008 kms
              </Text>
              <Text
                style={{
                  fontFamily: 'poppins',
                  fontWeight: 'bold',
                  marginLeft: 5,
                  fontSize: 12
                }}>
                included, without
              </Text>
              <Text style={{ fontFamily: 'poppins', fontWeight: 'bold', color: '#008b8b', fontSize: 12, marginLeft: 5 }}>
                {item.fueltype}
              </Text>
            </View>
            <Text style={{ fontFamily: 'poppins', fontWeight: 'bolder' }}>
              Extra Kms @ &#8377; 9/km
            </Text>
          </View>
        </View>
        <View
          style={{
            width: width * 0.1,
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Home1')}>
            <View
              style={{
                width: 100,
                backgroundColor: '#fff',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#a9a9a9',
                padding: 5,
                marginTop: 8,
                display: 'flex',
                alignItems: 'center',
              }}>
              <Text style={{ fontWeight: 'bold' }}>Change Plan</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'column',
          width: '90%',
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 10,
          elevation: 10,
          backgroundColor: 'white',
        }}>
        <View style={{ alignItems: 'center', width: width * 0.8 }}>
          <Text style={{ fontWeight: 'bold' }}>{bookingDetails.days} Days {bookingDetails.hours} Hours</Text>
        </View>
        <View
          style={{
            margin: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000' }}>
            {getDateFormat(bookingDetails.startDate, bookingDetails.startTime).getDate() + " " + month[getDateFormat(bookingDetails.startDate, bookingDetails.startTime).getMonth()]}
          </Text>
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: '#a9a9a9',
              borderStyle: 'dotted',
              width: 100,
              height: 0,
            }}
          />
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000' }}>
            {getDateFormat(bookingDetails.endDate, bookingDetails.endTime).getDate() + " " + month[getDateFormat(bookingDetails.endDate, bookingDetails.endTime).getMonth()]}
          </Text>
        </View>
        <View
          style={{
            margin: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{ fontWeight: 'bold' }}>{bookingDetails.startTime}, {days[getDateFormat(bookingDetails.startDate, bookingDetails.startTime).getDay()]}</Text>
          <Text style={{ fontWeight: 'bold' }}>{bookingDetails.endTime}, {days[getDateFormat(bookingDetails.endDate, bookingDetails.endTime).getDay()]}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'column',
          width: '90%',
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 10,
          margin: 10,
          marginTop: 10,
          elevation: 10,
          backgroundColor: 'white',
        }}>
        <Text style={{ fontWeight: 'bold', color: '#008b8b' }}>
          Booking From {bookingDetails.city}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'column',
          width: '90%',
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 10,
          elevation: 10,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 5,
          }}>
          <Text
            style={{ fontFamily: 'poppins', fontSize: 18, fontWeight: 'bold' }}>
            Base Price
          </Text>
          <Text
            style={{ fontFamily: 'poppins', fontSize: 18, fontWeight: 'bold' }}>
            &#8377; 100
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#a9a9a9',
            borderStyle: 'dotted',
            width: width * 0.85,
            height: 0,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 5,
          }}>
          <Text
            style={{ fontFamily: 'poppins', fontSize: 18, fontWeight: 'bold' }}>
            Delivery & pickup charge
          </Text>
          <Text
            style={{ fontFamily: 'poppins', fontSize: 18, fontWeight: 'bold' }}>
            &#8377; {dpc}
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#a9a9a9',
            borderStyle: 'dotted',
            width: width * 0.85,
            height: 0,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 5,
          }}>
          <Text
            style={{ fontFamily: 'poppins', fontSize: 18, fontWeight: 'bold' }}>
            Refundable security deposite
          </Text>
          <Text
            style={{ fontFamily: 'poppins', fontSize: 18, fontWeight: 'bold' }}>
            &#8377; {rc}
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#a9a9a9',
            borderStyle: 'dotted',
            width: width * 0.85,
            height: 0,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 5,
          }}>
          <Text
            style={{
              fontFamily: 'poppins',
              fontSize: 20,
              fontWeight: 'bold',
              color: '#000000',
            }}>
            Total
          </Text>
          <Text
            style={{
              fontFamily: 'poppins',
              fontSize: 20,
              fontWeight: 'bold',
              color: '#000000',
            }}>
            &#8377; {item.rentperhour*(bookingDetails.days*(24+parseInt(bookingDetails.hours)))}
          </Text>
        </View>
        <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
          inclusive of Taxes and insurance
        </Text>
      </View>
      <View>
        <AppButton btnWidth={0.87} onPress={()=>handlePayment()} buttonText={'Payment3'} bgColor="#27ae60" />
      </View>
    </View>
  );
}
