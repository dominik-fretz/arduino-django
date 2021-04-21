import React, { useCallback, useEffect } from "react";
import "./App.css";
import SensorPlot from "./components/SensorPlot";
import { SensorValueContextProvider } from "./context/SensorValueContext";
import useSensorValues from "./context/use-sensor-values";

function App() {
  const sensorValueContext = useSensorValues();
  const { load: loadValues, isLoading } = sensorValueContext;

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
  }, [isLoading]);

  return (
    <SensorValueContextProvider value={sensorValueContext}>
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">
          Sensor values
        </h1>
        <div className="row">
          <div className="col-md-10 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    loadValues();
                  }}
                >
                  Load values
                </button>
              </div>
              <SensorPlot />
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="modal-backdrop">
            <div className="modal d-block" tabIndex={-1} role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Loading...</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </SensorValueContextProvider>
  );
}

export default App;
