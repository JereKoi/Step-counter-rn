import { StyleSheet } from "react-native";

import { Pedometer } from "expo-sensors";
import React, { useEffect, useState } from "react";
import CircularProgress from "react-native-circular-progress-indicator";

export default function App() {
  const [steps, setSteps] = useState(0);
  const [PedometerAvailability, setPedometerAvailability] = useState("");

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
    const subscription = Pedometer.watchStepCount((result) => {
      console.log("Steps updated", result.steps);
      setSteps(result.steps);
    });

    return () => {
      console.log("Unsubscribing from step count");
      subscription && subscription.remove();
    };
  }, []);

  return (
    <view style={styles.container}>
      <view style={{ flex: 1, justifyContent: "center " }}>
        <h1 style={styles.textDesign}>
          Is Pedometer available on the device:{PedometerAvailability}{" "}
        </h1>
        <view style={{ flex: 1 }}>
          <CircularProgress
            value={steps}
            maxValue={10000}
            radius={210}
            activeStrokeColor={"#2465FD"}
            activeStrokeSecondaryColor={"#C25AFF"}
            inActiveStrokeOpacity={0.5}
            inActiveStrokeWidth={40}
            activeStrokeWidth={40}
            title={"Step count"}
            titleColor={"#ECF0F1"}
            titleStyle={{ fontWeight: "bold" }}
          />
        </view>
        <view style={{ flex: 1 }}>
          <view>
            <h3 style={styles.textDesign}>Target : 10000 steps</h3>
          </view>

          <view>
            <h3 style={styles.textDesign}>Distance covered : </h3>
          </view>
          <view>Calories burnt : </view>
        </view>
      </view>
    </view>
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
  },
});
