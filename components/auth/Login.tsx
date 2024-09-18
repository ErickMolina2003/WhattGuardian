import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import AppLogo from "@/assets/images/logo.png";
import GoogleLogo from "@/assets/images/google.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    if (!email || !password) return;

    handleSignIn();
  }

  async function handleSignIn() {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Error al iniciar sesión\nE-mail o contraseña no válidos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex flex-grow justify-center gap-8">
      <View className="flex items-center">
        <Image source={AppLogo} style={{ width: 149, height: 80 }} />
      </View>
      <View className="flex items-center gap-4">
        <Text className="text-2xl font-medium text-app-cyan-900 self-start">
          Ingresa a tu cuenta
        </Text>
        <TextInput
          className="w-full p-2 bg-white border border-app-gray-500 rounded-lg shadow-md"
          placeholder="Correo Electrónico"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="w-full p-2 bg-white border border-app-gray-500 rounded-lg shadow-md mb-5"
          placeholder="Contraseña"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <Text className="text-xs text-app-cyan-800">
          ¿Olvidaste tu contraseña?
        </Text>

        <View className="w-full">
          <Pressable
            className="flex items-center p-3 bg-app-cyan-700 rounded-lg"
            onPress={login}
          >
            <Text className="text-white font-normal text-sm">INGRESAR</Text>
          </Pressable>
        </View>
      </View>
      <View className="flex items-center gap-5">
        <Text className="text-xs font-normal text-app-gray-800">
          ~ o ingresa con: ~
        </Text>
        <View className="w-full">
          <Pressable className="bg-transparent border border-app-cyan-700 rounded-lg">
            <View className="flex flex-row justify-center items-center gap-3 py-2 ">
              <Image source={GoogleLogo} style={{ width: 16, height: 16 }} />
              <Text className="text-app-gray-600 font-normal text-sm">
                Google
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
