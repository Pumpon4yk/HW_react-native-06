import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";
import { authSignOut } from "../redux/auth/authOperations";

export default function BtnLogOut() {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(authSignOut());
  };

  return (
    <TouchableOpacity onPress={logOut} style={{ marginRight: 16 }}>
      <Feather name="log-out" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
}
