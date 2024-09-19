import { Timestamp } from "firebase/firestore";
import { FC } from "react";

export enum RegisterStatus {
    LOGIN,
    REGISTER,
}

export interface UserStore {
    uid: string;
    createdAt: Timestamp;
    email: string;
    name: string;
    updatedAt: Timestamp;
    electrodomestics?: ELECTRODOMESTICS_OPTIONS_TYPE[];
}

export enum ELECTRODOMESTICS_TYPE {
    FRIDGE = 'Fridge',
    WASHER = 'Washer',
    TV = 'Tv',
    AIR_CONDITIONER = 'Air Conditioner',
    MICROWAVE = 'Microwave',
    PC = 'Pc',
    WATER_HEATER = 'Water Heater',
}

export type ELECTRODOMESTICS_OPTIONS_TYPE = {
    value: ELECTRODOMESTICS_TYPE;
    amount: number;
    brand?: { value: string; label: string };
    model?: string;
    date?: Date;
    hoursPerDay: number;
    icon: FC;
}