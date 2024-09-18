import { ScrollView, Text, View } from "react-native";

export default function Dashboard() {
  return (
    <View className="flex-1 bg-app-blue-500">
      <Text>Dashboard</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        className="h-full rounded-t-2xl pt-8 px-5 bg-white"
      >
        <Text>Dashboard</Text>
      </ScrollView>
    </View>
  );
}
