import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
} from 'react-native';
import React,{useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './app/MainNavigator';
import LoginProvider from './app/context/LoginProvider';
import messaging from '@react-native-firebase/messaging';
import { async } from '@firebase/util';
import { Alert } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';


const App = () => {
  //  const requestUserPermission = async () =>{
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //    console.log('Authorization status:', authStatus);
  //   }
  // }

  // useEffect(()=>{
  //   if(requestUserPermission){
  //     messaging().getToken().then(token =>{
  //       console.log(token)
  //     })
  //   }
  //   else{
  //     console.log("Faild token status",authStatus)
  //   }
  //   messaging()
  //   .getInitialNotification()
  //   .then(async(remoteMessage) => {
  //     if (remoteMessage) {
  //       console.log(
  //         'Notification caused app to open from quit state:',
  //         remoteMessage.notification,
  //       );
  //     }
  //   });

  //    // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //    messaging().onNotificationOpenedApp(async(remoteMessage) => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //   });
   
  //   // Register background handler
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   console.log('Message handled in the background!', remoteMessage);
  //   });

  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // },[])
  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
    setShowRealApp(true);
  };

  const onSkip = () => {
    setShowRealApp(true);
  };

  const RenderItem = ({ item }) => {
    let img;
    if(item.key==='s1')
    img= <Image style={styles.introImageStyle} source={require('./assets/farmer.jpg')} />
    else if(item.key==='s3')
   img= <Image style={styles.introImageStyle} source={require('./assets/splash.jpg')} />
    else{
              
img=<Image style={styles.introImageStyle} source={require('./assets/field.jpg')} />
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        {img}
 
        <Text style={styles.introTextStyle}>{item.text}</Text>
      </View>
    );
  };

  return (
    <>
      {showRealApp ? (   
          <LoginProvider>
            <NavigationContainer>
              <MainNavigator />
            </NavigationContainer>
          </LoginProvider>
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          showSkipButton={true}
          onSkip={onSkip}
        />
      )}
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 300,
    height: 400,
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    marginTop:30,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

const slides = [
  {
    key: 's1',
    text: 'Farmable For Best Experience !',
    title: 'Welcome',
    image:'./assets/farm.jpg',
    backgroundColor: '#487d45',
  },
  {
    key: 's2',
    title: 'OverControl',
    text: 'Map fields , Log Harvests',
    image: './assets/farmer.jpg',
    backgroundColor: '#09736f',
  },
  {
    key: 's3',
    title: 'Great Features',
    text: 'Track Jobs ,Track Expenses & more',
    image: './assets/splash.jpg',
    backgroundColor: '#1d4739',
  },

]


// export default function App() {
  

// }
