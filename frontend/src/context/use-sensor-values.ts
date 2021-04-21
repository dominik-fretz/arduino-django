import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { SensorType, SensorValue } from "../models/SensorValue";
import { SensorValueContextType } from "./SensorValueContext";

const baseURL = "/api/sensorvalues/";

type RequestDTO = {
  results: SensorValueDTO[] | undefined;
  count: number;
  next: string;
};

type SensorValueDTO = {
  timestamp: Date;
  sensor_type: SensorType;
  value: number;
};

export default function useSensorValues(): SensorValueContextType {
  const [sensorValues, setSensorValues] = useState<SensorValue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const load = useCallback(async () => {
    setIsLoading(true);

    // const {
    //   data: { results, count, next },
    // } = await axios.get<RequestDTO>(baseURL);
    const results = await axios.get<SensorValueDTO[]>(baseURL);

    if (results) {
      setSensorValues(
        results.data.map((r) => ({
          timestamp: r.timestamp,
          sensorType: r.sensor_type,
          value: r.value,
        }))
      );
      setIsLoading(false);
    }
  }, []);

  return useMemo(
    () => ({
      sensorValues,
      isLoading,
      load,
    }),
    [isLoading, load, sensorValues]
  );
}
