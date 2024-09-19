import { Pressable, Text, View } from "react-native";

interface Props {
  id: number;
  title: string;
  description?: string;
  onClick?: () => void;
}

export default function Card({ id, title, description, onClick }: Props) {
  return (
    <Pressable onPress={onClick} className="flex items-center justify-center">
      <View
        className={`flex w-28 m-2 h-full rounded-md bg-app-cyan-800 justify-end p-1`}
      >
        <Text
          className={`text-white font-bold text-sm  ${
            !description ? "text-left pb-3 pl-1" : "text-center pb-0"
          }`}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
