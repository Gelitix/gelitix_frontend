// components/StatisticsCards.tsx

import {
  Clipboard,
  CreditCard,
  ShoppingBag,
  ShoppingCart,
  TicketCheck,
  TicketSlash,
  TrendingUp,
  User,
  LucideIcon,
} from "lucide-react";
import { FC } from "react";

interface StatCardProps {
  title: string;
  value: string;
  Icon: LucideIcon; // Type for the icon component
}

const StatCard: FC<StatCardProps> = ({ title, value, Icon }) => {
  return (
    <div className="flex items-center space-x-4 rounded-xl bg-white p-4 shadow-md">
      <div className="rounded-full bg-blue-100 p-3">
        <Icon className="text-blue-600" size={24} />
      </div>
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

const StatisticsCards: FC = () => {
  const stats = [
    { title: "Revenue", value: "€566,000", Icon: TrendingUp },
    { title: "Booking fee", value: "€698", Icon: CreditCard },
    { title: "Refunds", value: "€148.82", Icon: TicketSlash },
    { title: "Ticket sales", value: "€8233.92", Icon: ShoppingCart },
    { title: "Orders", value: "10002", Icon: Clipboard },
    { title: "Ticket sold", value: "74231", Icon: TicketCheck },
    { title: "Customers", value: "865", Icon: User },
    { title: "Shop sales", value: "€10077.89", Icon: ShoppingBag },
  ];

  return (
    <div className="flex  items-center justify-center">
      <div className="grid grid-cols-1 gap-8 p-4 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            Icon={stat.Icon}
          />
        ))}
      </div>
    </div>
  );
};

export default StatisticsCards;
