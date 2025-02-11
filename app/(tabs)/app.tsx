import { StyleSheet } from "react-native";

import { Pedometer } from "expo-sensors";
import React, { useEffect, useState } from "react";
import CircularProgress from "react-native-circular-progress-indicator";

export default function App() {
  const [steps, setSteps] = useState(0);
  const [PedometerAvailability, setPedometerAvailability] = useState("");

  Pedometer.isAvailableAsync().then(
    (result) => {
      setPedometerAvailability(String(result));
    },
    (error) => {
      setPedometerAvailability(error);
    }
  );

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = () => {
    const subscribtion = Pedometer.watchStepCount((result) => {
      setSteps(result.steps);
    });
  };

  return (
    <view style={styles.container}>
      <view style={{ flex: 1, justifyContent: "center " }}>
        <h1>Is Pedometer available on the device:{PedometerAvailability} </h1>
        <view>
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
});
