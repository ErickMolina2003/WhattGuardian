import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import FridgeImg from "@/assets/images/fridge.png";
import WasherImg from "@/assets/images/washer.png";
import TvImg from "@/assets/images/tv.png";
import AirImg from "@/assets/images/air.png";
import MicrowaveImg from "@/assets/images/microwave.png";
import PcImg from "@/assets/images/pc.png";
import WaterImg from "@/assets/images/water_heater.png";
import useAppStore from "@/store";
import { ELECTRODOMESTICS_TYPE } from "@/constants/types";
import { SearchIcon } from "@/components/Icons";
import { useRouter } from "expo-router";
import { electrodomesticTranslation } from "@/components/auth/Register";

const data = {
  labels: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
  datasets: [
    {
      data: [308, 310, 312, 315, 316, 315, 316],
      color: (opacity = 1) => "#0074FF", // optional
      strokeWidth: 3, // optional
    },
  ],
};

const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#ffff",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `#0074FF`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

export function getRandomApplianceKWh() {
  const appliances = {
    Refrigerador: [1.0, 1.5],
    Lavadora: [0.5, 1.2],
    Microondas: [1.2, 2.0],
    Televisión: [0.2, 0.6],
    "Aire acondicionado": [2.5, 4.5],
    Secadora: [2.0, 3.5],
    "Horno eléctrico": [2.0, 3.0],
    Lavavajillas: [0.8, 1.5],
    "Computadora portátil": [0.03, 0.08],
    Cafetera: [0.5, 0.8],
  };

  const applianceNames = Object.keys(appliances);
  const randomAppliance =
    applianceNames[Math.floor(Math.random() * applianceNames.length)];
  const [min, max] = appliances[randomAppliance];
  const randomKWh = (Math.random() * (max - min) + min).toFixed(2);

  return `${randomKWh}`;
}

export function getImages(value: string) {
  if (value === ELECTRODOMESTICS_TYPE.FRIDGE) return FridgeImg;
  if (value === ELECTRODOMESTICS_TYPE.WASHER) return WasherImg;
  if (value === ELECTRODOMESTICS_TYPE.TV) return TvImg;
  if (value === ELECTRODOMESTICS_TYPE.AIR_CONDITIONER) return AirImg;
  if (value === ELECTRODOMESTICS_TYPE.MICROWAVE) return MicrowaveImg;
  if (value === ELECTRODOMESTICS_TYPE.PC) return PcImg;
  return WaterImg;
}

const screenWidth = Dimensions.get("window").width - 10;

export default function Dashboard() {
  const { user } = useAppStore();
  const router = useRouter();

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      className="flex-1 h-full pt-8 px-5 bg-white"
    >
      <View className="flex">
        <View>
          <View className="mb-5">
            <Text className="text-xl font-normal text-app-cyan-900">
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
        <View>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-lg font-semibold my-4">Tus dispositivos</Text>
            <Pressable onPress={() => router.push("/(auth)/devices")}>
              <Text className="text-sm font-semibold my-4 text-app-blue-600">
                VER MÁS
              </Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="flex-row overflow-visible gap-4"
          >
            {user.electrodomestics &&
              user.electrodomestics.map((option, index) => (
                <View
                  key={index}
                  className="relative w-32 p-4 rounded-lg border border-app-cyan-100 overflow-visible"
                >
                  <View className="mb-5">
                    <Text className="font-normal text-base">
                      {electrodomesticTranslation(option.value)}
                    </Text>
                    <Text className="font-normal text-xs">
                      {option.brand?.label}
                    </Text>
                  </View>
                  <View className="mb-10">
                    <Text className="font-normal text-xs">
                      <Text className="font-bold text-lg">
                        {getRandomApplianceKWh()}
                      </Text>{" "}
                      kWh {"\n"}
                      <Text className="font-normal text-base">horas</Text>
                    </Text>
                  </View>
                  <View className="w-full absolute -bottom-0 -right-5 overflow-visible">
                    <Image
                      source={getImages(option.value)}
                      style={{ width: 60, height: 80 }}
                      resizeMode="contain"
                      className="overflow-visible"
                    />
                  </View>
                </View>
              ))}
          </ScrollView>
        </View>
        <View className="mb-5">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-lg font-semibold my-4">
              Facturas registradas
            </Text>
            <SearchIcon />
          </View>

          <View>
            {Array.from({ length: 4 }).map((_, index) => (
              <View
                key={index}
                className="flex p-4 rounded-lg bg-app-gray-100 mb-4"
              >
                <View className="flex flex-row items-center justify-between">
                  <Text className="text-lg font-bold text-black">
                    Nombre propietario
                  </Text>
                  <Text className="text-base font-light text-black">
                    178389
                  </Text>
                </View>
                <View className="flex">
                  <Text className="text-xs font-normal text-app-gray-600 mb-1 mt-3">
                    Periodo de lectura
                  </Text>
                  <View className="flex flex-row justify-between">
                    <View className="w-5/12 bg-white">
                      <Text className="font-normal text-sm text-black text-center">
                        07/07/2024
                      </Text>
                    </View>
                    <View className="w-5/12 bg-white">
                      <Text className="font-normal text-sm text-black text-center">
                        09/08/2024
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="flex flex-row justify-between mt-3">
                  <Text className="text-xs font-normal text-black">
                    Lectura actual (kWh):
                    <Text className="text-xs font-bold text-black"> 2048</Text>
                  </Text>
                  <Text className="text-xs font-normal text-black">
                    Consumo (kWh):
                    <Text className="text-xs font-bold text-black"> 226</Text>
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
