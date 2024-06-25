import React from "react";

interface IconProps {
  className?: string;
}

const Terms: React.FC<IconProps> = ({ className }) => {
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
          id="terms-and-condition-j67zqt4vka"
          d="M5.012 3.972v.993a1 1 0 001 1h7.982a1 1 0 001-1v-.993H17a1 1 0 011 1v7.5l-.577-.97a1 1 0 00-1.749.053L9.8 22.972H3a1 1 0 01-1-1v-17a1 1 0 011-1h2.012zm11.935 9.342c.194.097.35.254.447.447l3.882 7.764a1 1 0 01-.894 1.447h-7.764a1 1 0 01-.894-1.447l3.882-7.764a1 1 0 011.341-.447zm-.447 6.658a.5.5 0 100 1 .5.5 0 000-1zm0-4.5a.5.5 0 00-.492.41l-.008.09v3l.008.09a.5.5 0 00.984 0l.008-.09v-3l-.008-.09a.5.5 0 00-.492-.41zm-6.42 2.5H4.5a.5.5 0 00-.09.992l.09.008h5.58a.5.5 0 100-1zm1.42-3h-7a.5.5 0 00-.09.992l.09.008h7a.5.5 0 100-1zm1.45-3H4.5a.5.5 0 00-.09.992l.09.008h8.45a.5.5 0 100-1zm2.55-3h-9a.5.5 0 00-.09.992l.09.008h9a.5.5 0 100-1zm-1.5-6v2H6v-2h8z"
        ></path>
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(0 -.972)">
        <path d="M.323.972h24v24h-24z"></path>
        <use fill="#4d4f56" xlinkHref="#terms-and-condition-j67zqt4vka"></use>
      </g>
    </svg>
  );
};

export default Terms;
