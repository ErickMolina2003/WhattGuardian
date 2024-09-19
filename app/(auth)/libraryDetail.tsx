import { Image, ScrollView, Text, View } from "react-native";
import PersonImg from "@/assets/images/person.png";

export default function LibraryDetail() {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      className="h-full px-5 bg-white pt-11"
    >
      <View>
        <Text className="text-app-gray-800 font-semibold text-xl text-left justify-center items-center mb-3">
          Maneras eficientes de ahorrar energía
        </Text>
        <View className="flex flex-row justify-between items-center mb-3">
          <View className="flex flex-row items-center justify-center gap-2">
            <Image source={PersonImg} />
            <Text className="font-normal text-xs text-black">Jimmy Reilly</Text>
          </View>
          <View>
            <Text className="font-normal text-xs text-black">07 may 20</Text>
          </View>
        </View>
        <View>
          <Text className="font-light text-sm text-black">
            Lorem ipsum dolor sit amet consectetur. Maecenas et non augue sem
            sed volutpat diam. Laoreet ut tristique consequat odio a arcu diam
            vulputate. Quis sed egestas ipsum non. Et nisl lacus at euismod
            odio. Suspendisse viverra libero sed in sit. Turpis elementum vitae
            nam faucibus egestas blandit. Sit etiam nisl metus a dictum
            ridiculus aliquet. Amet a curabitur sapien parturient sed. Facilisis
            augue tortor pharetra sed amet viverra. Malesuada at malesuada
            cursus a. Vulputate tellus eleifend habitant turpis sit diam posuere
            integer. Quis ante orci sit amet. Laoreet amet pulvinar nunc etiam
            dolor eget tempor elit dui. Vitae pellentesque eu amet a quam. Nec
            volutpat turpis sagittis nibh elementum mauris sit morbi. Potenti
            urna sit bibendum nec tellus. Lacus turpis ante enim viverra sed
            pharetra sit aliquam. Dui cras etiam nec egestas sit ullamcorper
            tempus mauris. Morbi et mauris integer est volutpat sed purus et.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
