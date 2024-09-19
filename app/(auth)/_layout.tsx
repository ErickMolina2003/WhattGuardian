import { Tabs, useRouter } from "expo-router";
import {
  FlashIcon,
  GridIcon,
  HomeIcon,
  LibraryIcon,
  NotificationIcon,
  PodiumIcon,
  SettingsIcon,
} from "@/components/Icons";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useAppStore from "@/store";

export default function Layout() {
  const insets = useSafeAreaInsets();
  const store = useAppStore();
  const router = useRouter();

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
          {/* Iconos de búsqueda y notificaciones */}
          <View className="flex-row items-center space-x-4">
            <Pressable>
              <View className="flex flex-row items-center gap-2">
                <Text className="text-center w-6 h-6 rounded-full bg-app-yellow-500">
                  {store.user.name.at(0)}
                </Text>
                <Text>{store.user.name.split(" ")[0]}</Text>
              </View>
            </Pressable>
          </View>
          {/* Logo */}
          <View className="flex-row items-center space-x-4">
            <Pressable>
              <NotificationIcon />
            </Pressable>
            <Pressable onPress={() => router.push("/(auth)/dashboard")}>
              <GridIcon />
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
              tabBarIcon: () => <HomeIcon color={"#000"} />,
              tabBarActiveTintColor: "#424242",
            }}
          />
          <Tabs.Screen
            name="analytics"
            options={{
              title: "Analíticas",
              tabBarIcon: () => <FlashIcon color={"#000"} />,
              tabBarActiveTintColor: "#424242",
            }}
          />
          <Tabs.Screen
            name="library"
            options={{
              title: "Biblioteca",
              tabBarIcon: () => <LibraryIcon color={"#000"} />,
              tabBarActiveTintColor: "#424242",
            }}
          />
          <Tabs.Screen
            name="ranking"
            options={{
              title: "Ranking",
              tabBarIcon: () => <PodiumIcon color={"#000"} />,
              tabBarActiveTintColor: "#424242",
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "Ajustes",
              tabBarIcon: () => <SettingsIcon color={"#000"} />,
              tabBarActiveTintColor: "#424242",
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="devices"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="libraryDetail"
            options={{
              href: null,
            }}
          />
        </Tabs>
      </>
    </View>
  );
}
