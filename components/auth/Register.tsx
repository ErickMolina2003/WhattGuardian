import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppLogo from "@/assets/images/logo.png";
import AppLogo2 from "@/assets/images/logo2.png";
import GoogleLogo from "@/assets/images/google.png";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {
  ELECTRODOMESTICS_OPTIONS_TYPE,
  ELECTRODOMESTICS_TYPE,
} from "@/constants/types";
import {
  AddIcon,
  AirIcon,
  ClockIcon,
  FridgeIcon,
  LaptopIcon,
  MicrowaveIcon,
  RemoveIcon,
  TvIcon,
  WashingIcon,
  WaterHeaterIcon,
} from "../Icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Collapsible } from "../Collapsible";
import { ElectrodomesticsBrands } from "@/constants/Brands";

enum REGISTER_STEPS {
  EMAIL,
  FORM,
  ELECTRODOMESTICS,
  ELECTRODOMESTICS_DETAILS,
}

const ELECTRODOMESTICS_OPTIONS = [
  {
    value: ELECTRODOMESTICS_TYPE.FRIDGE,
    amount: 1,
    icon: FridgeIcon,
    hoursPerDay: 1,
  },
  {
    value: ELECTRODOMESTICS_TYPE.WASHER,
    amount: 1,
    icon: WashingIcon,
    hoursPerDay: 1,
  },
  {
    value: ELECTRODOMESTICS_TYPE.TV,
    amount: 4,
    icon: TvIcon,
    hoursPerDay: 1,
  },
  {
    value: ELECTRODOMESTICS_TYPE.AIR_CONDITIONER,
    amount: 1,
    icon: AirIcon,
    hoursPerDay: 1,
  },
  {
    value: ELECTRODOMESTICS_TYPE.MICROWAVE,
    amount: 1,
    icon: MicrowaveIcon,
    hoursPerDay: 1,
  },
  {
    value: ELECTRODOMESTICS_TYPE.PC,
    amount: 4,
    icon: LaptopIcon,
    hoursPerDay: 1,
  },
  {
    value: ELECTRODOMESTICS_TYPE.WATER_HEATER,
    amount: 4,
    icon: WaterHeaterIcon,
    hoursPerDay: 1,
  },
];

export default function Register() {
  const [registerStep, setRegisterStep] = useState<REGISTER_STEPS>(
    REGISTER_STEPS.EMAIL
  );
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [electrodomesticsOptions, setElectrodomesticsOptions] = useState<
    ELECTRODOMESTICS_OPTIONS_TYPE[]
  >(ELECTRODOMESTICS_OPTIONS);
  const [showDate, setShowDate] = useState(false);

  const auth = FIREBASE_AUTH;

  function handleChangeStep() {
    if (registerStep === REGISTER_STEPS.EMAIL) {
      if (!email) return;
      setRegisterStep(REGISTER_STEPS.FORM);
    }

    if (registerStep === REGISTER_STEPS.FORM) {
      if (!email || !name || !password || !confirmPassword) return;
      if (password !== confirmPassword) return;
      setRegisterStep(REGISTER_STEPS.ELECTRODOMESTICS);
    }

    if (registerStep === REGISTER_STEPS.ELECTRODOMESTICS) {
      setRegisterStep(REGISTER_STEPS.ELECTRODOMESTICS_DETAILS);
    }

    if (registerStep === REGISTER_STEPS.ELECTRODOMESTICS_DETAILS) {
      handleCreateAccount();
    }
  }

  function handleCreateAccount() {
    handleSignUp();
  }

  async function handleSignUp() {
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        const newElectrodomestics = electrodomesticsOptions.map((option) => ({
          value: option.value,
          amount: option.amount,
          brand: option.brand,
          model: option.model,
          date: option.date,
          hoursPerDay: option.hoursPerDay,
        }));
        const newDoc = {
          name,
          email,
          electrodomestics: newElectrodomestics,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        await setDoc(
          doc(FIREBASE_DB, "users", userCredential.user.uid),
          newDoc
        );
      }
    } catch (error) {
      console.log(error);
      alert("Error al crear cuenta\nIntente nuevamente");
    } finally {
      setLoading(false);
    }
  }

  function addAmount(value: ELECTRODOMESTICS_TYPE) {
    const index = electrodomesticsOptions.findIndex(
      (option) => option.value === value
    );
    if (index === -1) return;

    electrodomesticsOptions[index].amount++;
    setElectrodomesticsOptions([...electrodomesticsOptions]);
  }

  function removeAmount(value: ELECTRODOMESTICS_TYPE) {
    const index = electrodomesticsOptions.findIndex(
      (option) => option.value === value
    );
    if (index === -1) return;

    if (electrodomesticsOptions[index].amount === 0) return;

    electrodomesticsOptions[index].amount--;
    setElectrodomesticsOptions([...electrodomesticsOptions]);
  }

  function electrodomesticTranslation(value: ELECTRODOMESTICS_TYPE) {
    if (value === ELECTRODOMESTICS_TYPE.FRIDGE) return "Refrigerador";
    if (value === ELECTRODOMESTICS_TYPE.WASHER) return "Lavadora";
    if (value === ELECTRODOMESTICS_TYPE.TV) return "Televisor";
    if (value === ELECTRODOMESTICS_TYPE.AIR_CONDITIONER)
      return "Aire acondicionado";
    if (value === ELECTRODOMESTICS_TYPE.MICROWAVE) return "Microondas";
    if (value === ELECTRODOMESTICS_TYPE.PC) return "Computadora";
    if (value === ELECTRODOMESTICS_TYPE.WATER_HEATER)
      return "Calentador de agua";
  }

  function getElectrodomesticBrand(value: ELECTRODOMESTICS_TYPE) {
    const brands = ElectrodomesticsBrands.find(
      (brands) => brands.type === value
    );
    if (brands) return brands.options;
    return [];
  }

  function setElectrodomesticBrand(
    value: ELECTRODOMESTICS_TYPE,
    newBrand: { value: string; label: string }
  ) {
    const index = electrodomesticsOptions.findIndex(
      (option) => option.value === value
    );

    electrodomesticsOptions[index].brand = newBrand;
    setElectrodomesticsOptions([...electrodomesticsOptions]);
  }

  function setElectrodomesticModel(
    value: ELECTRODOMESTICS_TYPE,
    newModel: string
  ) {
    const index = electrodomesticsOptions.findIndex(
      (option) => option.value === value
    );

    electrodomesticsOptions[index].model = newModel;
    setElectrodomesticsOptions([...electrodomesticsOptions]);
  }

  function onDatePickerChange(date: any, value: ELECTRODOMESTICS_TYPE) {
    if (date.type === "dismissed") {
      setShowDate(false);
      return;
    }
    const index = electrodomesticsOptions.findIndex(
      (option) => option.value === value
    );

    electrodomesticsOptions[index].date = new Date(date.nativeEvent.timestamp);
    setShowDate(false);
  }

  function addHours(value: ELECTRODOMESTICS_TYPE) {
    const index = electrodomesticsOptions.findIndex(
      (option) => option.value === value
    );
    if (index === -1) return;

    electrodomesticsOptions[index].hoursPerDay++;
    setElectrodomesticsOptions([...electrodomesticsOptions]);
  }

  function removeHours(value: ELECTRODOMESTICS_TYPE) {
    const index = electrodomesticsOptions.findIndex(
      (option) => option.value === value
    );
    if (index === -1) return;

    if (electrodomesticsOptions[index].hoursPerDay === 0) return;

    electrodomesticsOptions[index].hoursPerDay--;
    setElectrodomesticsOptions([...electrodomesticsOptions]);
  }

  return registerStep === REGISTER_STEPS.EMAIL ? (
    <View className="flex flex-grow justify-center gap-8">
      <View className="flex items-center">
        <Image source={AppLogo} style={{ width: 149, height: 80 }} />
      </View>
      <View className="flex items-center gap-4">
        <Text className="text-2xl font-medium text-app-blue-500 self-start text-center mb-10">
          Te damos la bienvenida a WhattGuardian
        </Text>
        <View className="w-full">
          <Pressable className="bg-transparent border border-app-cyan-700 rounded-lg">
            <View className="flex flex-row justify-center items-center gap-3 py-2 ">
              <Image source={GoogleLogo} style={{ width: 16, height: 16 }} />
              <Text className="text-app-gray-600 font-normal text-sm">
                Google
              </Text>
            </View>
          </Pressable>
        </View>
        <Text className="text-xs font-normal text-app-cyan-800">~ o ~</Text>
        <TextInput
          className="w-full p-2 bg-white border border-app-gray-500 rounded-lg shadow-md"
          placeholder="Correo Electrónico"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <View className="w-full mb-10">
          <Pressable
            className="flex items-center p-3 bg-app-cyan-700 rounded-lg"
            onPress={handleChangeStep}
          >
            <Text className="text-white font-normal text-sm">CONTINUAR</Text>
          </Pressable>
        </View>
        <Text className="text-center">
          <Text className="text-center text-app-gray-800 font-normal text-xs">
            Al avanzar, aceptas {"\n"}
          </Text>
          <Text className="text-center text-app-cyan-800 font-normal text-xs">
            Condiciones del servicio{" "}
          </Text>
          <Text className="text-center text-app-gray-800 font-normal text-xs">
            y{" "}
          </Text>
          <Text className="text-center text-app-cyan-800 font-normal text-xs">
            Políticas de privacidad
          </Text>
        </Text>
      </View>
    </View>
  ) : registerStep === REGISTER_STEPS.FORM ? (
    <View className="flex flex-grow justify-center gap-8">
      <View className="flex-1 justify-evenly">
        <View className="flex items-center">
          <Image source={AppLogo2} style={{ width: 180, height: 22 }} />
        </View>
        <View className="flex items-center gap-4">
          <Text className="text-2xl font-medium text-app-cyan-800 self-start">
            Crea tu cuenta
          </Text>
          <View className="w-full">
            <Text className="mb-3 text-app-gray-600">Nombre Completo</Text>
            <TextInput
              className="w-full p-2 bg-white border border-app-gray-500 rounded-lg shadow-md"
              placeholder="Escribe tu nombre completo"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View className="w-full">
            <Text className="mb-3 text-app-gray-600">Contraseña</Text>
            <TextInput
              className="w-full p-2 bg-white border border-app-gray-500 rounded-lg shadow-md"
              placeholder="Ingresar al menos 8 caracteres"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View className="w-full">
            <Text className="text-xs font-bold text-app-gray-500">
              La contraseña debe incluir al menos:
            </Text>
            <Text className="text-xs font-bold text-app-gray-700">
              {`\u2022`} 6 caracteres{"\n"}
              {`\u2022`}1 número{"\n"}
              {`\u2022`}1 letra mayúscula{"\n"}
              {`\u2022`}1 letra minúscula
            </Text>
          </View>
          <View className="w-full">
            <Text className="mb-3 text-app-gray-600">Repetir contraseña</Text>
            <TextInput
              className="w-full p-2 bg-white border border-app-gray-500 rounded-lg shadow-md"
              placeholder="Ingresar al menos 8 caracteres"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
        </View>
      </View>
      <View>
        <View className="w-full mb-10">
          <Pressable
            className="flex items-center p-3 bg-app-cyan-700 rounded-lg"
            onPress={handleChangeStep}
            disabled={loading}
          >
            <Text className="text-white font-normal text-sm">CONTINUAR</Text>
          </Pressable>
        </View>
      </View>
    </View>
  ) : registerStep === REGISTER_STEPS.ELECTRODOMESTICS ? (
    <View className="flex flex-grow justify-center gap-8">
      <View className="flex-1 justify-evenly">
        <View className="flex items-center">
          <Image source={AppLogo2} style={{ width: 180, height: 22 }} />
        </View>
        <View className="flex items-center gap-4">
          <View className="w-full">
            <Text className="text-2xl font-medium self-start mb-1">
              Registra tus Electrodomésticos
            </Text>
            <Text className="text-sm font-extralight mb-3 text-app-gray-600">
              Selecciona los electrodomésticos que tienes en casa para llevar un
              control preciso de tu consumo de energía.
            </Text>
          </View>

          <View className="w-full">
            <Text className="font-bold text-sm mb-3 text-app-gray-600">
              Haz clic en los electrodomésticos que deseas registrar
            </Text>
          </View>
          <View className="w-full">
            {electrodomesticsOptions.map((option, index) => (
              <View
                key={index}
                className="flex flex-row justify-between items-center mb-3"
              >
                <View className="flex flex-row">
                  <View className="w-8 text-center justify-center">
                    <option.icon />
                  </View>
                  <View>
                    <Text>{option.value}</Text>
                  </View>
                </View>
                <View className="h-full flex flex-row items-center justify-end gap-2">
                  <Pressable
                    className="flex items-center h-full w-1/6 rounded-md p-1 border"
                    onPress={() => {
                      removeAmount(option.value);
                    }}
                  >
                    <RemoveIcon />
                  </Pressable>
                  <Pressable className="flex items-center h-full w-1/6 rounded-md p-1 border">
                    <Text className="text-center">{option.amount}</Text>
                  </Pressable>

                  <Pressable
                    className="flex items-center h-full w-1/6 rounded-md p-1 border"
                    onPress={() => {
                      addAmount(option.value);
                    }}
                  >
                    <AddIcon />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View>
        <View className="w-full mb-10">
          <Pressable
            className="flex items-center p-3 bg-app-cyan-700 rounded-lg"
            onPress={handleChangeStep}
            disabled={loading}
          >
            <Text className="text-white font-normal text-sm">CONTINUAR</Text>
          </Pressable>
        </View>
      </View>
    </View>
  ) : (
    <View className="flex flex-grow">
      <View className="flex-1 mt-10">
        <View className="flex items-center mb-10">
          <Image source={AppLogo2} style={{ width: 180, height: 22 }} />
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          className="h-full mb-3"
        >
          {electrodomesticsOptions.map((option, index) => (
            <View key={index} className="py-5 border-b border-b-app-gray-700">
              <Collapsible
                title={`Detalles de tu ${electrodomesticTranslation(
                  option.value
                )}`}
              >
                <View className="w-full">
                  <Text className="font-light text-sm text-app-gray-700 mb-5">
                    Proporcione los detalles para obtener un análisis preciso.
                  </Text>
                  <View className="flex gap-3 mb-5">
                    <Text className="text-sm font-light text-app-gray-500">
                      Marca
                    </Text>
                    <Dropdown
                      style={[styles.dropdown]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.itemTextStyle}
                      data={getElectrodomesticBrand(option.value)}
                      labelField="label"
                      valueField="value"
                      placeholder={"Marca del producto"}
                      value={option?.brand?.value ?? null}
                      onChange={(item) => {
                        setElectrodomesticBrand(option.value, {
                          value: item.value,
                          label: item.label,
                        });
                      }}
                    />
                  </View>
                  <View className="w-full flex gap-3 mb-5">
                    <Text className="text-sm font-light text-app-gray-500">
                      Modelo
                    </Text>
                    <TextInput
                      style={styles.dropdown}
                      className="w-full p-2 bg-white border border-app-gray-500 rounded-lg shadow-md text-app-gray-500"
                      placeholder="Modelo del producto"
                      autoCapitalize="none"
                      value={option.model}
                      onChangeText={(text) =>
                        setElectrodomesticModel(option.value, text)
                      }
                    />
                  </View>
                  <View className="flex gap-3 mb-5">
                    <Text className="text-sm font-light text-app-gray-500">
                      Año de adquisición
                    </Text>
                    <Pressable
                      className="h-12 rounded-md border-[0.5px] border-app-gray-500"
                      onPress={() => {
                        setShowDate(true);
                      }}
                    >
                      <View className="h-full flex flex-row justify-between items-center px-2">
                        <Text className="text-app-gray-500 font-normal text-sm">
                          {option?.date
                            ? `${option.date.toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}`
                            : "Selecciona el año"}
                        </Text>
                        <Ionicons
                          name={"chevron-down"}
                          size={16}
                          color={"#757575"}
                        />
                      </View>
                    </Pressable>
                    {showDate && (
                      <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="default"
                        onChange={(value) =>
                          onDatePickerChange(value, option.value)
                        }
                      />
                    )}
                  </View>
                  <View className="flex gap-3">
                    <View className="flex flex-row justify-between items-center mb-3">
                      <View className="flex flex-row">
                        <View className="w-8 text-center justify-center">
                          <ClockIcon />
                        </View>
                        <View>
                          <Text>Horas de uso por día</Text>
                        </View>
                      </View>
                      <View className="h-full flex flex-row items-center justify-end gap-2">
                        <Pressable
                          className="flex items-center h-full w-1/6 rounded-md p-1 border"
                          onPress={() => {
                            removeHours(option.value);
                          }}
                        >
                          <RemoveIcon />
                        </Pressable>
                        <Pressable className="flex items-center h-full w-1/6 rounded-md p-1 border">
                          <Text className="text-center">
                            {option.hoursPerDay}
                          </Text>
                        </Pressable>

                        <Pressable
                          className="flex items-center h-full w-1/6 rounded-md p-1 border"
                          onPress={() => {
                            addHours(option.value);
                          }}
                        >
                          <AddIcon />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </View>
              </Collapsible>
            </View>
          ))}
        </ScrollView>
      </View>
      <View>
        <View className="w-full mb-10">
          <Pressable
            className="flex items-center p-3 bg-app-cyan-700 rounded-lg"
            onPress={handleChangeStep}
            disabled={loading}
          >
            <Text className="text-white font-normal text-sm">CONTINUAR</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "#BDBDBD",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    fontWeight: 300,
    color: "#757575",
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: 300,
    color: "#757575",
  },
  itemTextStyle: {
    fontSize: 14,
    fontWeight: 300,
    color: "#757575",
  },
  label: {
    color: "#757575",
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },

  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
