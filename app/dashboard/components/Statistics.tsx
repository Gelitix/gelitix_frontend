import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Event Registrations",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="relative h-64 sm:h-80 md:h-96">
      <Line data={data} options={options} />
    </div>
  );
};

export default Statistics;
