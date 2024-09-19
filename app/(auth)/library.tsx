import Card from "@/components/library/Card";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";

const librarySections = [
  "Tendencias actuales",
  "Tips y consejos",
  "Respuestas a preguntas más frecuentes",
];

const tournaments = [
  {
    id: 1,
    title: "Maneras eficientes de ahorrar energía",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: 5,
    title: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: 6,
    title: "Lorem ipsum dolor sit amet consectetur.",
  },
];

export default function Library() {
  const router = useRouter();

  function goToDetailLibrary() {
    router.push("/(auth)/libraryDetail");
  }
  return (
    <View className="flex-1 px-6 pt-6 bg-white">
      <View className="mb-5">
        <Text className="font-normal text-xl text-app-gray-400 mb-5">
          Biblioteca
        </Text>
        <ScrollView showsHorizontalScrollIndicator={false} className="h-full">
          {librarySections.map((section, i) => (
            <View key={i} className="mb-5">
              <Text className="font-semibold text-base text-app-gray-400 mb-1">
                {section}
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                className="flex-row h-32"
              >
                {tournaments.map((tournament) => (
                  <Card
                    key={tournament.id}
                    id={tournament.id}
                    title={tournament.title}
                    onClick={goToDetailLibrary}
                  />
                ))}
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
