// components/Label.tsx
import React from "react";

interface LabelProps {
  text: string;
}

const Label: React.FC<LabelProps> = ({ text }) => {
  return (
    <div
      className="flex items-center justify-center px-4 py-2 rounded-lg text-white text-sm font-medium"
      style={{
        background:
          "linear-gradient(to right, rgb(24, 220, 155), rgb(110, 84, 239))",
      }}
    >
      <span className="mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <defs>
            <path
              id="discount-ribbon"
              d="M11 0l2.695 1.82 3.252-.074 1.284 2.989 2.775 1.695-.536 3.208 1.418 2.927-2.185 2.41-.39 3.228-3.14.846-2.074 2.505L11 20.567l-3.1.987-2.073-2.505-3.14-.846-.39-3.229-2.185-2.409L1.53 9.638.994 6.43l2.775-1.695 1.284-2.989 3.252.074L11 0zm3.762 7.251c-.326-.325-.854-.324-1.18.001L7.258 13.59l-.097.115c-.225.325-.192.773.098 1.062.326.325.854.324 1.179-.001l6.326-6.338.096-.115c.225-.325.193-.773-.097-1.062zM13.5 12c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm-5-5C7.672 7 7 7.672 7 8.5S7.672 10 8.5 10 10 9.328 10 8.5 9.328 7 8.5 7z"
            ></path>
          </defs>
          <g fill="none" fillRule="evenodd">
            <g>
              <path d="M0 0H24V24H0z"></path>
              <g transform="translate(1 1)">
                <use fill="#ffffff" xlinkHref="#discount-ribbon"></use>
              </g>
            </g>
          </g>
        </svg>
      </span>
      {text}
    </div>
  );
};

export default Label;
