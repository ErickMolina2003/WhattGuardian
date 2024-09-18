import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { RegisterStatus } from "@/constants/types";
import ScreenLayout from "../ScreenLayout";
import Login from "./Login";
import Register from "./Register";

export default function Auth() {
  const [registerStatus, setRegisterStatus] = useState(RegisterStatus.LOGIN);

  return (
    <ScreenLayout>
      <View className="flex-1">
        {registerStatus === RegisterStatus.LOGIN && <Login />}

        {registerStatus === RegisterStatus.REGISTER && <Register />}

        <View className="flex mb-10">
          {registerStatus === RegisterStatus.LOGIN && (
            <Pressable
              onPress={() => setRegisterStatus(RegisterStatus.REGISTER)}
            >
              <Text className="text-center text-app-cyan-800 font-normal text-xs">
                ¿No tienes una cuenta?
              </Text>
            </Pressable>
          )}
          {registerStatus === RegisterStatus.REGISTER && (
            <Pressable onPress={() => setRegisterStatus(RegisterStatus.LOGIN)}>
              <Text className="text-center">
                <Text className="text-center text-app-gray-800 font-normal text-xs">
                  ¿Ya tienes una cuenta?{" "}
                </Text>
                <Text className="text-center text-app-cyan-800 font-normal text-xs">
                  Iniciar sesión
                </Text>
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </ScreenLayout>
  );
}
