import React from "react";

interface IconProps {
  className?: string;
}

const Location: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <defs>
        <path
          id="location-xooqbt7m7a"
          d="M12 2a7.2 7.2 0 017.2 7.2c0 2.651-2.4 6.918-7.2 12.8-4.8-5.882-7.2-10.149-7.2-12.8A7.2 7.2 0 0112 2zm0 4a3 3 0 100 6 3 3 0 000-6z"
        ></path>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z"></path>
        <use fill="#4d4f56" xlinkHref="#location-xooqbt7m7a"></use>
      </g>
    </svg>
  );
};

export default Location;
