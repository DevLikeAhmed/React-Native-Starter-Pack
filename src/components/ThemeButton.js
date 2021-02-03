import React, { useContext } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import ThemeContext from "../core/ThemeContext";
import AppContext from "../core/context/appContext";

const ThemeButton = () => {
  const theme = useContext(ThemeContext);
  const state = useContext(AppContext);
  const { themeSwitch, lightTheme } = state;

  return lightTheme ? (
    <FontAwesome5
      name="cloud-sun"
      style={theme.button}
      onPress={async () => await themeSwitch()}
    />
  ) : (
    <FontAwesome5
      style={theme.button}
      name="cloud-moon"
      onPress={async () => await themeSwitch()}
    />
  );
};

export default ThemeButton;
