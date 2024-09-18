import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <Pressable
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
      >
        <View className="w-full flex flex-row justify-between items-center">
          <Text className="font-normal text-xl text-app-cyan-900">{title}</Text>
          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={24}
          />
        </View>
      </Pressable>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 0,
  },
});
