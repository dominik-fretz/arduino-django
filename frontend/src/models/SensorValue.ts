export type SensorType = "TMP" | "HUM";

export type SensorValue = {
  timestamp: Date;
  sensorType: SensorType;
  value: number;
};
