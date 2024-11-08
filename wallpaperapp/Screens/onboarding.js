import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import SplashScreen from "react-native-splash-screen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from 'react-native-onboarding-swiper';

function Onboard({ navigation }) {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkIfFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          // First launch
          setIsFirstLaunch(true);
          await AsyncStorage.setItem('hasLaunched', 'true');
        } else {
          
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error('Error checking first launch', error);
      }
    };

    checkIfFirstLaunch();

    const timer = setTimeout(() => {
      SplashScreen.hide(); 
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleOnDone = () => {
    
    navigation.navigate('Cars');
  };

  if (isFirstLaunch === null) {
    
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <Onboarding
        onDone={handleOnDone}
        onSkip={handleOnDone}
        nextLabel="Next"
        skipLabel="Skip"
        pages={[
          {
            backgroundColor: '#FF9999',
            image: <Image source={require('../assets/pic1.png')} />,
            title: 'Welcome to our App',
            subtitle: 'This app gives you thousands of wallpapers.',
          },
          {
            backgroundColor: '#FFC8C8',
            image: <Image source={require('../assets/pic2.png')} />,
            title: 'The App Offers Best Services',
            
          },
          {
            backgroundColor: '#FFE1E1',
            image: <Image source={require('../assets/pic3.png')} />,
            title: 'Thanks for Joining Us',
            subtitle: "Click on the tick and start.",
          },
        ]}
      />
    );
  } else {
    
    navigation.navigate('Cars');
    return null;
  }
}

export default Onboard;
