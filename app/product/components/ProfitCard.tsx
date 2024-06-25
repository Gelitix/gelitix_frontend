import React from "react";

const ProfitCard: React.FC<{
  profit: string;
  percentage: string;
  isPositive: boolean;
}> = ({ profit, percentage, isPositive }) => {
  return (
    <div className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6">
      <div>
        <p className="text-sm text-gray-500">Profit</p>
        <p className="text-2xl font-medium text-gray-900 px-5">{profit}</p>
      </div>
      <div
        className={`inline-flex gap-2 rounded p-1 ${
          isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={
              isPositive
                ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
            }
          />
        </svg>
        <span className="text-xs font-medium">{percentage}</span>
      </div>
    </div>
  );
};

const PriceStat: React.FC = () => {
  return (
    <div className="flex">
      <div className="flex flex-row p-5 md:flex-col">
        <ProfitCard profit="$240.94" percentage="67.81%" isPositive={true} />
      </div>
      <div className="flex flex-row p-5 md:flex-col">
        <ProfitCard profit="$240.94" percentage="67.81%" isPositive={false} />
      </div>
    </div>
  );
};

export default PriceStat;
