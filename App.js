import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store";
import Main from './Components/Main'


export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      {/* <PersistGate > */}
      <Main onLayoutRootView={onLayoutRootView} />
      {/* </PersistGate> */}
    </Provider>
  );
}
