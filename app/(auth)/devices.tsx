import useAppStore from "@/store";
import { Image, ScrollView, Text, View } from "react-native";
import { getImages, getRandomApplianceKWh } from "./dashboard";
import { electrodomesticTranslation } from "@/components/auth/Register";
import { Switch } from "react-native-switch";

export default function Devices() {
  const { user } = useAppStore();
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      className="flex-1 h-full pt-8 px-5 bg-white"
    >
      <View className="flex flex-row justify-between items-center">
        <Text className="text-lg font-semibold my-4">Tus dispositivos</Text>
        <Text className="text-sm font-semibold my-4 text-app-blue-600">
          AGREGAR
        </Text>
      </View>
      <View className="flex">
        {user.electrodomestics &&
          user.electrodomestics.map((option, index) => {
            return Array.from({ length: option.amount }).map((_, index) => (
              <View
                key={index}
                className="relative w-full p-4 mb-4 rounded-lg border border-app-cyan-100 overflow-visible"
              >
                <View className="flex flex-row justify-between items-center mb-5">
                  <View className="flex items-center">
                    <Text className="font-normal text-base">
                      {`${electrodomesticTranslation(option.value)} / ${
                        index + 1
                      }`}
                    </Text>
                    <Text className="font-normal text-xs">
                      {option.brand?.label}
                    </Text>
                  </View>
                  <View className="flex items-center">
                    <Switch
                      value={index % 2 === 0}
                      disabled={false}
                      activeText={"On"}
                      inActiveText={"Off"}
                      circleSize={20}
                      barHeight={14}
                      circleBorderWidth={1}
                      backgroundActive={"#1976D233"}
                      backgroundInactive={"gray"}
                      circleActiveColor={"#1A73E8"}
                      circleInActiveColor={"#ffff"}
                      changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                      innerCircleStyle={{
                        alignItems: "center",
                        justifyContent: "center",
                      }} // style for inner animated circle for what you (may) be rendering inside the circle
                      outerCircleStyle={{}} // style for outer animated circle
                      renderActiveText={false}
                      renderInActiveText={false}
                      switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                      switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                      switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
                      switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
                    />
                  </View>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-3">
                    <Text className="font-normal text-xs p-1 border rounded-lg border-app-cyan-500">
                      <Text className="font-bold text-base">
                        {option.hoursPerDay}{" "}
                      </Text>
                      <Text className="text-xs font-normal">hrs</Text>
                      {"\n"}por día
                    </Text>
                    <Text className="font-normal text-xs p-1 border rounded-lg border-app-cyan-500">
                      <Text className="font-bold text-base">
                        {getRandomApplianceKWh()}{" "}
                      </Text>
                      <Text className="text-xs font-normal">kWh</Text>
                      {"\n"}horas
                    </Text>
                  </View>
                  <View className="flex justify-center items-center">
                    <Image
                      source={getImages(option.value)}
                      style={{ width: 60, height: 80 }}
                      resizeMode="contain"
                      className="overflow-visible"
                    />
                  </View>
                </View>
              </View>
            ));
          })}
      </View>
    </ScrollView>
  );
}
