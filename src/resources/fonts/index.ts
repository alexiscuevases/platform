import localFont from "next/font/local";

export const Comfortaa = localFont({
  variable: "--font-comfortaa",
  src: [
    {
      weight: "700",
      path: "./Comfortaa/Bold.ttf",
      style: "normal"
    },
    {
      weight: "600",
      path: "./Comfortaa/SemiBold.ttf",
      style: "normal"
    },
    {
      weight: "500",
      path: "./Comfortaa/Medium.ttf",
      style: "normal"
    },
    {
      weight: "400",
      path: "./Comfortaa/Regular.ttf",
      style: "normal"
    },
    {
      weight: "300",
      path: "./Comfortaa/Light.ttf",
      style: "normal"
    }
  ]
});

export const GT_Alpina = localFont({
  variable: "--font-GT_Alpina",
  src: [
    {
      weight: "700",
      path: "./GT_Alpina/GT-AlpinaStandardBold.otf",
      style: "normal"
    },
    {
      weight: "500",
      path: "./GT_Alpina/GT-AlpinaStandardMedium.otf",
      style: "normal"
    },
    {
      weight: "400",
      path: "./GT_Alpina/GT-AlpinaStandardRegular.otf",
      style: "normal"
    },
    {
      weight: "300",
      path: "./GT_Alpina/GT-AlpinaStandardLight.otf",
      style: "normal"
    },
    {
      weight: "100",
      path: "./GT_Alpina/GT-AlpinaStandardThin.otf",
      style: "normal"
    },
    {
      weight: "100",
      path: "./GT_Alpina/GT-AlpinaStandardThinItalic.otf",
      style: "italic"
    }
  ]
});
