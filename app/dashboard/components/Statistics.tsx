import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { TicketCheck, UsersRound, Wallet } from "lucide-react";

interface PeriodicalRevenue {
  date: string;
  amount: number;
}

interface EventStatistics {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  dailyRevenue: PeriodicalRevenue[];
  monthlyRevenue: PeriodicalRevenue[];
  yearlyRevenue: PeriodicalRevenue[];
}

const Statistics = () => {
  const [statistics, setStatistics] = useState<EventStatistics | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (!session) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/dashboard/1`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      const data = await response.json();
      setStatistics(data.data);
    };

    fetchData();
  }, []);

  if (!statistics) {
    return <div>Loading...</div>;
  }

  const processRevenueData = (revenue: PeriodicalRevenue[]) => ({
    labels: revenue.map((r) => r.date),
    datasets: [
      {
        label: "Revenue",
        data: revenue.map((r) => r.amount),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  return (
    <div className="container mx-auto p-4 text-center max-w-6xl">
      <h1 className="text-2xl font-semibold mb-6">Event Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
          <div className="bg-blue-100 rounded-full p-3 mb-2">
            <Wallet className="text-blue-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-1">Total Revenue</h3>
          <p className="text-2xl font-bold">
            IDR{statistics.totalRevenue.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
          <div className="bg-green-100 rounded-full p-3 mb-2">
            <TicketCheck className="text-green-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-1">Total Orders</h3>
          <p className="text-2xl font-bold">{statistics.totalOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
          <div className="bg-purple-100 rounded-full p-3 mb-2">
            <UsersRound className="text-purple-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-1">Total Customers</h3>
          <p className="text-2xl font-bold">{statistics.totalCustomers}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl mb-2">Daily Revenue</h2>
        <Line data={processRevenueData(statistics.dailyRevenue)} />
      </div>
      <div className="mb-8">
        <h2 className="text-xl mb-2">Monthly Revenue</h2>
        <Line data={processRevenueData(statistics.monthlyRevenue)} />
      </div>
      <div className="mb-8">
        <h2 className="text-xl mb-2">Yearly Revenue</h2>
        <Line data={processRevenueData(statistics.yearlyRevenue)} />
      </div>
    </div>
  );
};

export default Statistics;
