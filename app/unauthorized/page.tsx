import { HomeIcon } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="grid h-screen place-content-center bg-slate-100 px-4">
      <div className="text-center">
        <h1 className="uppercase tracking-widest text-2xl text-gray-500 dark:text-gray-400 mb-4">
          <p>401 | Unauthorized</p>
        </h1>
        <a href="/">
          <HomeIcon
            className="mx-auto text-gray-500 dark:text-gray-400"
            size={24}
          />
        </a>
      </div>
    </div>
  );
};

export default page;
