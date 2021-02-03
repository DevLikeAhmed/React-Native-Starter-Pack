import React, { useReducer } from "react";
import { StatusBar } from "expo-status-bar";

//context
import AppContext from "./appContext";
import appReducer from "./appReducer";

//theme
import ThemeContext, { theme } from "../ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppState = (props) => {
  const initialState = {
    lightTheme: false,
  };
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { lightTheme } = state;

  //Theme
  const themeSwitch = async () => {
    await AsyncStorage.setItem("theme", JSON.stringify(!lightTheme)).then(() =>
      dispatch({ type: "CHANGE_THEME" })
    );
  };

  const setStoredTheme = async () => {
    await AsyncStorage.setItem("theme", JSON.stringify(false));
  };

  return (
    <AppContext.Provider
      value={{
        lightTheme: state.lightTheme,
        themeSwitch,
        setStoredTheme,
      }}
    >
      <ThemeContext.Provider
        value={state.lightTheme ? theme.light : theme.dark}
      >
        <StatusBar style={state.lightTheme ? "dark" : "light"} />
        {props.children}
      </ThemeContext.Provider>
    </AppContext.Provider>
  );
};
export default AppState;
