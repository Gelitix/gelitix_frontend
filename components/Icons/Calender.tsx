import React from "react";

interface IconProps {
  className?: string;
}

const Calender: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <defs>
        <path
          id="calendar-7uqvx900ma"
          d="M16 4.996V7c0 1.055.815 1.918 1.851 1.994l.15.006a2 2 0 001.993-1.851L20 7V4.996c1.122 0 2 .946 2 2.077v11.843c0 1.132-.878 2.077-2 2.077l-16 .003-.172-.008C2.763 20.866 2 20.014 2 18.996V7.073c0-1.131.878-2.077 2-2.077V7a2 2 0 003.994.149L8 7V4.996h8zm4 6.003H4l-.002 7.997L20 18.993c-.018 0 0-.018 0-.077v-7.917zM7 16a1 1 0 110 2 1 1 0 010-2zm5 0a1 1 0 110 2 1 1 0 010-2zm5 0a1 1 0 110 2 1 1 0 010-2zM7 12a1 1 0 110 2 1 1 0 010-2zm5 0a1 1 0 110 2 1 1 0 010-2zm5 0a1 1 0 110 2 1 1 0 010-2zM6 3a1 1 0 011 1v3a1 1 0 01-2 0V4a1 1 0 011-1zm12 0a1 1 0 011 1v3a1 1 0 01-2 0V4a1 1 0 011-1z"
        ></path>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z"></path>
        <use fill="#4d4f56" xlinkHref="#calendar-7uqvx900ma"></use>
      </g>
    </svg>
  );
};

export default Calender;
