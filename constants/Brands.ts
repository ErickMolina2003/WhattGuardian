import { ELECTRODOMESTICS_TYPE } from "./types"

export const FridgeBrands = {
    type: ELECTRODOMESTICS_TYPE.FRIDGE,
    options: [
        {
            value: '1',
            label: 'Frigidaire',
        },
        {
            value: '2',
            label: 'LG',
        },
        {
            value: '3',
            label: 'Samsung',
        }
    ]
}

export const WasherBrands = {
    type: ELECTRODOMESTICS_TYPE.WASHER,
    options: [
        {
            value: '1',
            label: 'LG',
        },
        {
            value: '2',
            label: 'Samsung',
        },
    ]
}

export const TvBrands = {
    type: ELECTRODOMESTICS_TYPE.TV,
    options: [
        {
            value: '1',
            label: 'LG',
        },
        {
            value: '2',
            label: 'Samsung',
        },
        {
            value: '3',
            label: 'Sony',
        },
        {
            value: '4',
            label: 'AOC',
        },
    ]

}


export const AirConditionerBrands = {
    type: ELECTRODOMESTICS_TYPE.AIR_CONDITIONER,
    options: [
        {
            value: '1',
            label: 'LG',
        },
        {
            value: '2',
            label: 'Samsung',
        },
        {
            value: '3',
            label: 'Frigidaire',
        },

    ]
}


export const MicrowaveBrands = {
    type: ELECTRODOMESTICS_TYPE.MICROWAVE,
    options: [
        {
            value: '1',
            label: 'LG',
        },
        {
            value: '2',
            label: 'Samsung',
        },
    ]
}

export const PcBrands = {
    type: ELECTRODOMESTICS_TYPE.PC,
    options: [
        {
            value: '1',
            label: 'MSI',
        },
        {
            value: '2',
            label: 'Lenovo',
        },
        {
            value: '3',
            label: 'Dell',
        },
        {
            value: '4',
            label: 'Alienware',
        },
    ]
}

export const WaterHeaterBrands = {
    type: ELECTRODOMESTICS_TYPE.WATER_HEATER,
    options: [
        {
            value: '1',
            label: 'LG',
        },
        {
            value: '2',
            label: 'Samsung',
        },
    ]
}

export const ElectrodomesticsBrands = [
    FridgeBrands,
    WasherBrands,
    TvBrands,
    AirConditionerBrands,
    MicrowaveBrands,
    PcBrands,
    WaterHeaterBrands,
]


