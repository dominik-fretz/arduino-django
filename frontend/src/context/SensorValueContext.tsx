import React from "react";
import { SensorValue } from "../models/SensorValue";

export type SensorValueContextType = {
  sensorValues: SensorValue[];
  isLoading: boolean;
  load: () => void;
};

const sensorValueContextDefaults: SensorValueContextType = {
  sensorValues: [],
  isLoading: false,
  load: () => null,
};

const SensorValueContext = React.createContext<SensorValueContextType>(
  sensorValueContextDefaults
);

const SensorValueContextProvider: React.FC<{
  value: SensorValueContextType;
}> = ({ children, value }) => {
  return (
    <SensorValueContext.Provider value={value}>
      {children}
    </SensorValueContext.Provider>
  );
};

export { SensorValueContext, SensorValueContextProvider };
