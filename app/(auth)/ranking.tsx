import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Rank1 from "@/assets/images/rank1.png";
import Rank2 from "@/assets/images/rank2.png";
import useAppStore from "@/store";

export default function Ranking() {
  const [percentageCompleted, setPercentage] = useState(50);
  const { user } = useAppStore();

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      className="flex-1 h-full pt-8 px-5 bg-white"
    >
      <View className="flex">
        <View>
          <View className="mb-5">
            <Text className="text-2xl font-bold text-app-cyan-900">
              Tabla de clasificacion
            </Text>
          </View>
        </View>
        <View className="mt-5">
          <View className="flex mb-2">
            <View className="w-full flex flex-row items-center justify-between">
              <Pressable
                className="w-1/2"
                onPress={() => {
                  setPercentage(50);
                }}
              >
                <Text className="text-center text-base font-medium text-app-gray-600">
                  DÍA
                </Text>
              </Pressable>
              <Pressable
                className="w-1/2"
                onPress={() => {
                  setPercentage(100);
                }}
              >
                <Text className="text-center text-base font-medium text-app-gray-600">
                  SEMANA
                </Text>
              </Pressable>
            </View>
            <View className="flex flex-grow mx-3 mt-2">
              <View className="w-full border border-gray-300 bg-gray-300 rounded-lg h-1 justify-center">
                <View
                  className="absolute left-0 top-0 h-full bg-app-cyan-800 rounded-lg"
                  style={{ width: `${percentageCompleted}%` }}
                />
                <View
                  className="absolute inset-0 justify-center items-center"
                  style={{ width: `${percentageCompleted}%` }}
                ></View>
              </View>
            </View>
          </View>
          <View className="flex flex-row rounded-md p-3 bg-app-cyan-800 mt-2">
            <View className="w-[15%] px-3 py-1 bg-white rounded-md mr-3">
              <Text className="font-bold text-2xl text-app-cyan-800">#1</Text>
            </View>
            <View className="w-[85%]">
              <Text className="font-bold text-sm text-white">
                Estás ahorrando mejor que el 100% de los usuarios
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-end justify-between mt-4">
            <View className="w-[32%]">
              <View className="flex items-center justify-center gap-2">
                <Image
                  source={Rank1}
                  style={{ width: 50, height: 50 }}
                  resizeMode="contain"
                />
                <Text className="font-normal text-xs text-black">@alexisl</Text>
              </View>
              <View className="mt-3 py-1 rounded-md bg-app-cyan-800">
                <Text className="text-center text-white">1,465 p</Text>
              </View>
              <View className="h-24 flex justify-center mt-3 rounded-md bg-[#00CE5D99]">
                <Text className="font-bold text-2xl text-center text-white">
                  #2
                </Text>
              </View>
            </View>
            <View className="w-[32%]">
              <View className="flex items-center justify-center gap-2">
                <Text
                  className="flex text-4xl text-center pt-1 rounded-full bg-app-yellow-500"
                  style={{ width: 50, height: 50 }}
                >
                  {user.name.at(0)}
                </Text>
                <Text className="font-normal text-xs text-black">
                  {user.name}
                </Text>
              </View>
              <View className="mt-3 py-1 rounded-md bg-app-cyan-800">
                <Text className="text-center text-white">1,465 p</Text>
              </View>
              <View className="h-32 flex justify-center mt-3 rounded-md bg-[#00CE5DCC]">
                <Text className="font-bold text-2xl text-center text-white">
                  #1
                </Text>
              </View>
            </View>
            <View className="w-[32%]">
              <View className="flex items-center justify-center gap-2">
                <Image
                  source={Rank2}
                  style={{ width: 50, height: 50 }}
                  resizeMode="contain"
                />
                <Text className="font-normal text-xs text-black">@Lynda26</Text>
              </View>
              <View className="mt-3 py-1 rounded-md bg-app-cyan-800">
                <Text className="text-center text-white">1,465 p</Text>
              </View>
              <View className="h-24 flex justify-center mt-3 rounded-md bg-[#00CE5D66]">
                <Text className="font-bold text-2xl text-center text-white">
                  #3
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
