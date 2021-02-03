import React from "react";
import { Dimensions, Platform, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// based on iphone 5s's scale

const normalize = (size) => {
  const scale = SCREEN_WIDTH / 320;
  const newSize = size * scale;

  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const font = (style) => {
  if (style === "bold") {
    return Platform.OS === "ios"
      ? "AmericanTypewriter-Bold"
      : "sans-serif-condensed";
  } else if ((style = "light")) {
    return Platform.OS === "ios" ? "AmericanTypewriter-Light" : "notoserif";
  } else {
    return Platform.OS === "ios" ? "American Typewriter" : "sans-serif";
  }
};

const isLargeScreen = SCREEN_WIDTH >= 768;

export const theme = {
  light: {
    isTablet: isLargeScreen ? true : false,
    background: {
      flex: 1,
      backgroundColor: "#EAECED",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    spinner: {
      color: "black",
    },
    button: {
      color: "black",
      fontSize: normalize(30),
    },
    homeScreen: {
      title: {
        color: "black",
        fontFamily: font("bold"),
        fontSize: normalize(30),
      },
      subText: {
        color: "black",
        fontFamily: font("light"),
        fontSize: normalize(20),
      },
      text: {
        color: "black",
        fontFamily: font(),
        fontSize: normalize(15),
        fontWeight: "400",
      },
    },
  },
  dark: {
    isTablet: isLargeScreen ? true : false,
    background: {
      flex: 1,
      backgroundColor: "#1C3042",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    spinner: {
      color: "white",
    },
    button: {
      color: "white",
      fontSize: normalize(30),
    },
    homeScreen: {
      title: {
        color: "white",
        fontFamily: font("bold"),
        fontSize: normalize(30),
      },
      subText: {
        color: "white",
        fontFamily: font("light"),
        fontSize: normalize(20),
      },
      text: {
        color: "white",
        fontFamily: font(),
        fontSize: normalize(15),
        fontWeight: "400",
      },
    },
  },
};

const ThemeContext = React.createContext(theme);

export default ThemeContext;
