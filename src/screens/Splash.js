import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import AppContext from "../core/context/appContext";
import ThemeContext from "../core/ThemeContext";
import * as SplashScreen from "expo-splash-screen";

const updateCheck = async () => {
  await Updates.checkForUpdateAsync().then(async (update) => {
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync().then(async (check) => {
        if (check.isNew) {
          await Updates.reloadAsync();
        }
      });
    }
  });
};

export default class Splash extends Component {
  static contextType = AppContext;

  state = {
    isAppReady: false,
  };

  async componentDidMount() {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }

    if (__DEV__) {
      this.prepareResources();
    } else {
      updateCheck().then(() => this.prepareResources());
    }
  }

  prepareResources = async () => {
    this.themeCheck().then(() =>
      this.setState({ isAppReady: true }, async () => {
        await SplashScreen.hideAsync().then(() =>
          this.props.navigation.navigate("Home")
        );
      })
    );
  };

  themeCheck = async () => {
    const { themeSwitch, setStoredTheme, lightTheme } = this.context;

    await AsyncStorage.getItem("theme").then(async (res) => {
      if (res) {
        let boolValue = JSON.parse(res);
        if (boolValue !== lightTheme) {
          return await themeSwitch();
        } else null;
      } else setStoredTheme();
    });
  };

  render() {
    if (!this.state.isAppReady) {
      return null;
    }

    return (
      <ThemeContext.Consumer>
        {(theme) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.background.backgroundColor,
            }}
          >
            <ActivityIndicator size="large" color={theme.spinner.color} />
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }
}
