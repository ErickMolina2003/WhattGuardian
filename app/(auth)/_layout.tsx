import { Tabs } from "expo-router";
import {
  ChatIcon,
  FlashIcon,
  HomeIcon,
  LibraryIcon,
  NotificationIcon,
  SearchIcon,
  SettingsIcon,
} from "@/components/Icons";
import { Image, Pressable, Text, View } from "react-native";
import AppLogo2 from "@/assets/images/logo2.png";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useAppStore from "@/store";

export default function Layout() {
  const insets = useSafeAreaInsets();
  const store = useAppStore();

  return (
    <View
      className="flex-1 h-full justify-evenly bg-white"
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingStart: insets.left,
        paddingEnd: insets.right,
      }}
    >
      <>
        <View className="flex-row justify-between items-center px-5 py-2 bg-white">
          {/* Logo */}
          <View className="flex items-center">
            <Image source={AppLogo2} style={{ width: 132, height: 20 }} />
          </View>

          {/* Iconos de búsqueda y notificaciones */}
          <View className="flex-row items-center space-x-4">
            <Pressable>
              <SearchIcon />
            </Pressable>
            <Pressable>
              <NotificationIcon />
            </Pressable>
            <Pressable>
              <ChatIcon />
            </Pressable>
            <Pressable>
              <Text className="text-center w-6 h-6 rounded-full bg-app-yellow-500">
                {store.user.name.at(0)}
              </Text>
            </Pressable>
          </View>
        </View>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "white",
            },
          }}
        >
          <Tabs.Screen
            name="dashboard"
            options={{
              title: "Inicio",
              tabBarIcon: () => <HomeIcon color={"#4F93FF"} />,
              tabBarActiveTintColor: "#424242",
            }}
          />
        </Tabs>
      </>
    </View>
  );
}
