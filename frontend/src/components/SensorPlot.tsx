import { useContext, useEffect, useRef } from "react";
import { SensorValueContext } from "../context/SensorValueContext";

const data = {
  labels: [],
  datasets: [
    {
      label: "Temperature",
      data: [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
      borderColor: "#ff0000",
      backgroundColor: "#ff0000aa",
      yAxisID: "y",
    },
    {
      label: "Humidity",
      data: [10, 20, 30, 40, 50, 60, 70, 80, 90],
      borderColor: "#00ff00",
      backgroundColor: "#00ff00aa",
      yAxisID: "y1",
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Chart.js Line Chart - Multi Axis",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  },
};

const SensorPlot: React.FC<{}> = () => {
  const { sensorValues } = useContext(SensorValueContext);

  //   if (sensorValues.length === 0) {
  //     return <>No Data</>;
  //   }

  const chart = useRef();

  useEffect(() => {
    if (!chart.current) {
      //@ts-ignore
      chart.current = new Chart(document.getElementById("myChart"), config);
    }
  }, []);

  useEffect(() => {
    const temp = sensorValues.filter((v) => v.sensorType === "TMP");
    const hum = sensorValues.filter((v) => v.sensorType === "HUM");

    //@ts-ignore
    chart.current.data.datasets[0].data = temp.map((v) => v.value);
    //@ts-ignore
    chart.current.data.datasets[1].data = hum.map((v) => v.value);
    //@ts-ignore
    chart.current.data.labels = sensorValues.map((v) => v.timestamp);
    //@ts-ignore
    chart.current.update();
  }, [sensorValues]);

  return (
    <>
      <div>
        <canvas id="myChart"></canvas>
      </div>
    </>
  );
};

export default SensorPlot;
