import React from "react";

const StatCard: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 ">
        <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                Total Users
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Number of registered users
              </p>
            </div>
            <img
              className="w-12 h-12"
              src="https://placehold.co/50x50"
              alt="Total Users Icon"
            />
          </div>
          <p className="text-3xl font-bold text-blue-500 dark:text-blue-400 mt-4">
            1,234
          </p>
        </div>
        <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                Total Users
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Number of registered users
              </p>
            </div>
            <img
              className="w-12 h-12"
              src="https://placehold.co/50x50"
              alt="Total Users Icon"
            />
          </div>
          <p className="text-3xl font-bold text-blue-500 dark:text-blue-400 mt-4">
            1,234
          </p>
        </div>
        <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                Total Users
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Number of registered users
              </p>
            </div>
            <img
              className="w-12 h-12"
              src="https://placehold.co/50x50"
              alt="Total Users Icon"
            />
          </div>
          <p className="text-3xl font-bold text-blue-500 dark:text-blue-400 mt-4">
            1,234
          </p>
        </div>
        <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                Total Users
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Number of registered users
              </p>
            </div>
            <img
              className="w-12 h-12"
              src="https://placehold.co/50x50"
              alt="Total Users Icon"
            />
          </div>
          <p className="text-3xl font-bold text-blue-500 dark:text-blue-400 mt-4">
            1,234
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
