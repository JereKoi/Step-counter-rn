import { StyleSheet, View, Text } from "react-native";

import { Pedometer } from "expo-sensors";
import React, { useEffect, useState } from "react";
import CircularProgress from "react-native-circular-progress-indicator";

export default function App() {
  const [steps, setSteps] = useState(0);
  const [isPedometerAvailable, setPedometerAvailability] = useState("");

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
    console.log("Checking if pedometer is available");
    Pedometer.isAvailableAsync().then(
      (result) => {
        console.log("Pedometer available:", result);
        setPedometerAvailability(String(result));
      },
      (error) => console.log("Error checking pedometer:", error)
    );
  }, []);

  useEffect(() => {
    console.log("Subscribing to step count");
    try {
      const subscription = Pedometer.watchStepCount((result) => {
        console.log("Steps updated:", result.steps);
        setSteps(result.steps);
      });

      return () => {
        console.log("Unsubscribing from step count");
        subscription && subscription.remove();
      };
    } catch (error) {
      console.log("Error subscribing to step count:", error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textDesign}>
        Is Pedometer available on the deivce {isPedometerAvailable}
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
    backgroundColor: "rgba(255, 255, 255, 255, 0.5)",
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
