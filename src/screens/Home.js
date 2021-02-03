import React, { useContext } from "react";
import { Text, View } from "react-native";
import ThemeButton from "../components/ThemeButton";
import AppContext from "../core/context/appContext";
import ThemeContext from "../core/ThemeContext";

const Home = () => {
  const theme = useContext(ThemeContext);
  const state = useContext(AppContext);
  const { lightTheme } = state;
  return (
    <View style={theme.background}>
      <View style={{ alignItems: "center" }}>
        <ThemeButton />
        <Text style={theme.homeScreen.text}>
          Tap the {lightTheme ? "sun" : "moon"} to change the theme
        </Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={theme.homeScreen.subText}>
          Device type: {theme.isTablet ? "Tablet" : "Phone"}
        </Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={theme.homeScreen.title}>The World is Yours</Text>
        <Text style={theme.homeScreen.subText}>The World is Yours</Text>
        <Text style={theme.homeScreen.text}>The World is Yours</Text>
      </View>
    </View>
  );
};

export default Home;
