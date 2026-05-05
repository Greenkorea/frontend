let px0_200Arr = [];

for (let i = 0; i < 201; i++) {
  px0_200Arr.push(`${i}px`);
}

const px0_200 = px0_200Arr.reduce(
  (acc, value, index) => ({ ...acc, [index]: value }),
  {},
);

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#ffffff",
      black: "#000000",
      "blue-50": "#F2F7FE",
      transparent: "transparent",
    },
    extend: {
      spacing: px0_200,
      fontSize: px0_200,
      lineHeight: px0_200,
      minWidth: px0_200,
      minHeight: px0_200,
      borderWidth: px0_200,
      borderRadius: px0_200,
    },
    screens: {
      lg: "1024px",
    },
  },
  plugins: [],
};
