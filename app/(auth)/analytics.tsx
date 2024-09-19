import { Pressable, ScrollView, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  chartConfig,
  data,
  getRandomApplianceKWh,
  screenWidth,
} from "./dashboard";
import useAppStore from "@/store";
import { electrodomesticTranslation } from "@/components/auth/Register";
import { useState } from "react";
import PieChart from "react-native-pie-chart";

const widthAndHeight = 150;
const series = [789, 123, 321, 123];
const sliceColor = ["#0074FF", "#00CE5D", "#262535", "#9E9E9E"];

export default function Analytics() {
  const { user } = useAppStore();
  const [time, setTime] = useState(0);
  const [percentageCompleted, setPercentage] = useState(33);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      className="flex-1 h-full pt-8 px-5 bg-white"
    >
      <View className="flex">
        <View>
          <View className="mb-5">
            <Text className="text-2xl font-bold text-app-cyan-900">
              Consumo Actual
            </Text>
          </View>
          <View className="border rounded-lg border-app-cyan-800">
            <View className="flex flex-row">
              <View className="w-1/2 px-3 py-4 border-r border-b border-app-cyan-800">
                <Text className="text-xs font-normal text-app-cyan-900">
                  Consumo Actual
                </Text>
                <Text className="text-xs font-normal text-app-cyan-900">
                  <Text className="font-bold text-lg">5 </Text>
                  en uso
                </Text>
              </View>
              <View className="w-1/2 border-b border-app-cyan-800 px-3 py-4">
                <Text className="text-xs font-normal text-app-cyan-900">
                  % Energía consumida
                </Text>
                <Text className="text-xs font-normal text-app-cyan-900">
                  <Text className="font-bold text-lg">41.8% </Text>total semanal
                </Text>
              </View>
            </View>
            <View className="pt-10">
              <LineChart
                data={data}
                width={screenWidth}
                height={300}
                chartConfig={chartConfig}
                bezier
              />
            </View>
          </View>
        </View>
        <View className="mt-5">
          <View className="flex mb-2">
            <View className="w-full flex flex-row items-center justify-between">
              <Pressable
                className="w-1/3"
                onPress={() => {
                  setTime(0);
                  setPercentage(33);
                }}
              >
                <Text className="text-center text-base font-medium text-app-gray-600">
                  DÍA
                </Text>
              </Pressable>
              <Pressable
                className="w-1/3"
                onPress={() => {
                  setTime(1);
                  setPercentage(66);
                }}
              >
                <Text className="text-center text-base font-medium text-app-gray-600">
                  SEMANA
                </Text>
              </Pressable>
              <Pressable
                className="w-1/3"
                onPress={() => {
                  setTime(2);
                  setPercentage(100);
                }}
              >
                <Text className="text-center text-base font-medium text-app-gray-600">
                  MES
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
          <View className="flex items-center mt-2">
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              coverRadius={0.7}
              coverFill={"#FFF"}
            />
            <View className="absolute top-1/3 pl-1">
              <Text className="text-3xl font-bold text-app-cyan-700 text-center">
                58%
              </Text>
              <Text className="font-normal text-xs text-center">
                Electrohive
              </Text>
            </View>
          </View>
          <View className="flex my-5">
            <View className="flex flex-row">
              <Text className="w-[70%] font-normal text-sm text-app-gray-300">
                Aparatos electrónicos utilizados
              </Text>
              <Text className="w-[15%] font-normal text-sm text-app-gray-300 text-center">
                kWh
              </Text>
              <Text className="w-[15%] font-normal text-sm text-app-gray-300 text-center">
                %
              </Text>
            </View>
            {user.electrodomestics?.map((option, index) => (
              <View
                key={index}
                className="flex flex-row bg-app-gray-100 mb-2 p-3 rounded-md"
              >
                <Text className="w-[70%] font-normal text-sm text-app-gray-300">
                  {option.value}
                </Text>
                <Text className="w-[15%] font-normal text-sm text-app-gray-300 text-right">
                  {getRandomApplianceKWh()}
                </Text>
                <Text className="w-[15%] font-normal text-sm text-app-gray-300 text-right">
                  10%
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
