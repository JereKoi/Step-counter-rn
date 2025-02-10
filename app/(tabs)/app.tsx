import { Image, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Pedometer } from "expo-sensors";
import React, { useEffect, useState } from "react";

export default function App() {
  const [steps, setSteps] = useState(0);
  const [PedometerAvailability, setPedometerAvailability] = useState("");

Pedometer.isAvailableAsync().then(
  (result) => {
    setPedometerAvailability(String(result))
  },
  (error) => {
    setPedometerAvailability(error);
  }
)


useEffect(() => {
  subscribe();
}, [])

  const subscribe = () => {
    const subscribtion = Pedometer.watchStepCount((result) => {
      setSteps(result.steps)
    })
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.container}
        />
      }>
      <ThemedView style={styles.container}>
      <ThemedText type="default">Is Pedometer available on the device:{PedometerAvailability} </ThemedText>
        <ThemedText type="default">{steps}</ThemedText>

        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
