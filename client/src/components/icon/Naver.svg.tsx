import * as React from "react";

interface Iprops {
  width: string;
  height: string;
  color?: string;
}
export const NaverSvg = (props: Iprops) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Naver</title>
    <path
      d="M1.6 0S0 0 0 1.6v20.8S0 24 1.6 24h20.8s1.6 0 1.6-1.6V1.6S24 0 22.4 0zm3.415 5.6h4.78l4.425 6.458V5.6h4.765v12.8h-4.78L9.78 11.943V18.4H5.015Z"
      fill="#44be2d"
    ></path>
  </svg>
);
