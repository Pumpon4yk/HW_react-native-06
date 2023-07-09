import { NavigationContainer } from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";
import {  useEffect } from "react";

import renderScreen from "../router";
import { getCurrentUser } from "../redux/auth/selectors";
import { authCurrent } from "../redux/auth/authOperations";

const Main = ({ onLayoutRootView }) => {
  const dispatch = useDispatch();
  const isLogIn = useSelector(getCurrentUser)

  useEffect(() => {
    dispatch(authCurrent())
  },[])

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      {renderScreen(isLogIn)}
    </NavigationContainer>
  )
}

export default Main;