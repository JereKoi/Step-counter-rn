import { StyleSheet, View, Text } from "react-native";

import { Pedometer } from "expo-sensors";
import React, { useEffect, useState } from "react";
import CircularProgress from "react-native-circular-progress-indicator";

export default function App() {
  const [steps, setSteps] = useState(0);
  const [isPedometerAvailable, setPedometerAvailability] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const { status } = await Pedometer.requestPermissionsAsync();
        console.log("Motion permission status:", status);
        if (status !== "granted") {
          alert("Permission denied. Steps will not be counted");
        }
      } catch (error) {
        console.error("Error requesting permissions:", error);
        alert("An error occurred while requesting permissions.");
      }
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    const checkPedometerAvailability = async () => {
      try {
        const available = await Pedometer.isAvailableAsync();
        console.log("Pedometer available:", available);
        setPedometerAvailability(available);
      } catch (error) {
        console.error("Error checking pedometer:", error);
        setPedometerAvailability(false);
      }
    };

    checkPedometerAvailability();
  }, []);

  useEffect(() => {
    console.log("Subscribing to step count");

    let subscription = null;

    try {
      subscription = Pedometer.watchStepCount((result) => {
        console.log("Steps updated:", result.steps);
        setSteps(result.steps);
      });
    } catch (error) {
      console.error("Error subscribing to step count:", error);
    }

    return () => {
      console.log("Unsubscribing from step count");
      subscription?.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textDesign}>
        Is Pedometer available on the device {isPedometerAvailable}
      </Text>
      <View style={{ flex: 1 }}>
        <CircularProgress
          value={steps}
          maxValue={10000}
          radius={210}
          activeStrokeColor={"#2465FD"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "white",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  textDesign: {
    color: "white",
    flexDirection: "row",
    alignItems: "center",
  },
});
