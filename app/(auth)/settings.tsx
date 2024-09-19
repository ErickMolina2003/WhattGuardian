import {
  BuildIcon,
  ChevRightIcon,
  NotificationIcon,
  PersonIcon,
  SwitchOffIcon,
} from "@/components/Icons";
import ScreenLayout from "@/components/ScreenLayout";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Settings() {
  const router = useRouter();

  function goToProfile() {
    router.push("/(auth)/profile");
  }
  return (
    <View className="flex-1 px-6 pt-6 bg-white">
      <View className="flex flex-grow">
        <View className="mb-5">
          <Text className="font-normal text-xl text-app-gray-400 mb-5">
            Configuración
          </Text>
        </View>
        <View className="flex mb-5">
          <View className="flex flex-row">
            <PersonIcon color={"#4F93FF"} />
            <Text className="text-app-gray-400 font-bold text-base text-left pb-3 pl-1">
              Cuenta
            </Text>
          </View>
          <View>
            <Pressable
              className="bg-app-gray-100 p-3 border-b border-app-gray-200"
              onPress={goToProfile}
            >
              <View className="flex flex-row justify-between items-center">
                <Text>Editar Perfil</Text>
                <ChevRightIcon size={12} />
              </View>
            </Pressable>
            <Pressable className="bg-app-gray-100 p-3" onPress={goToProfile}>
              <View className="flex flex-row justify-between items-center">
                <Text>Cambiar contraseña</Text>
                <ChevRightIcon size={12} />
              </View>
            </Pressable>
          </View>
        </View>

        <View className="flex mb-5">
          <View className="flex flex-row">
            <NotificationIcon color={"#4F93FF"} />
            <Text className="text-app-gray-400 font-bold text-base text-left pb-3 pl-1">
              Notificaciones
            </Text>
          </View>
          <View>
            <Pressable className="bg-app-gray-100 p-3">
              <View className="flex flex-row justify-between items-center">
                <Text>Notificaciones</Text>
                <SwitchOffIcon color="#00000061" />
              </View>
            </Pressable>
          </View>
        </View>

        <View className="flex mb-5">
          <View className="flex flex-row">
            <BuildIcon color={"#4F93FF"} />
            <Text className="text-app-gray-400 font-bold text-base text-left pb-3 pl-1">
              Soporte
            </Text>
          </View>
          <View>
            <Pressable className="bg-app-gray-100 p-3 border-b border-app-gray-200">
              <View className="flex flex-row justify-between items-center">
                <Text>Centro de ayuda</Text>
                <ChevRightIcon size={12} />
              </View>
            </Pressable>
            <Pressable className="bg-app-gray-100 p-3">
              <View className="flex flex-row justify-between items-center">
                <Text>Sugerencias</Text>
                <ChevRightIcon size={12} />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
      <View className="flex mb-10">
        <Pressable
          className="flex items-center p-3 bg-app-blue-500 rounded-lg"
          onPress={() => FIREBASE_AUTH.signOut()}
        >
          <Text className="text-center text-white font-normal text-sm">
            CERRAR SESIÓN
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
