import { Button, Colors, Icon, IconName } from "@siva/ui"
import { useReducer, useState } from "react"
import { Text, ScrollView, StyleSheet, View, TouchableOpacity, TextInput } from "react-native"
import VehicleTypeButton from "./components/VehicleTypeButton"
import FilterComponent from "./components/FilterComponent"
import { ModalSheet, ModalSheetProvider, useModalSheetRef } from "apps/expo/app/components/ModalSheet"
import { FontAwesome } from '@expo/vector-icons'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import FilterComponentModal from "./components/FilterComponentWithModal"
import { useLocalSearchParams, useRouter } from "expo-router"


const tabs: Array<TabItem> = [
    {
        label: 'Auto', icon: 'car',
        name: "car"
    },
    {
        label: 'Moto', icon: 'motorbike',
        name: "motorcycle"
    },
    {
        label: 'Furgone', icon: 'truck',
        name: "van"
    },
]
const brands = {
    "FIAT": ["Punto", "600", "Spider"],
    "AUDI": ["A1", "A6", "RSQ8"],
    "Mercedes": ["Classe a", "Classe g", "GLC"]
}
const colors = [
    {
        name: "Bianco",
        hex: "#FFFFFF"
    },
    {
        name: "Blu",
        hex: "#0000ff"
    },
    {
        name: "Rosso",
        hex: "#ff0000"
    },
    {
        name: "Giallo",
        hex: "#ffff00"
    },
    {
        name: "Verde",
        hex: "#00ff00"
    },
]
const traction = [
    "4x4", "Anteriore", "Posteriore"
]
const emission = [
    "Euro 1", "Euro 2", "Euro 3", "Euro 4", "Euro 5", "Euro 6", "Altro",
]
const optionals = ["Optional1", "Optional2", "Optional3", "Optional4", "Optional5", "Optional6", "Optional7", "Optional8", "Optional9",]

const materials = ["Material1", "Material2", "Material3", "Material4", "Material5", "Material6", "Material7", "Material8", "Material9",]

const maintenance = ["Manutenzione ordinaria", "Manutenzione straordinaria"]

const insurances = ["RCA", "Infortunio conducente", "Furto e incendio", "Cristalli", "Atti vandalici", "Eventi atmosferici", "Assistenza nelle pratiche burocratiche", "Assistenza stradale H24"]

const otherServices = ["Kasko", "Mini kasko"]

type buttonProps = {
    name: string
    icon: IconName
}

const fuels: Array<buttonProps> = [
    {
        name: "Benzina",
        icon: "drop"
    },
    {
        name: "Diesel",
        icon: "drop"
    },
    {
        name: "Elettrico",
        icon: "flash"
    },
    {
        name: "Elettrico/Benzina",
        icon: "dropflash"
    },
    {
        name: "Elettrico/Diesel",
        icon: "dropflash"
    },
    {
        name: "Metano",
        icon: "fire"
    },
    {
        name: "GPL",
        icon: "fire"
    },
    {
        name: "Altro",
        icon: "other"
    },
]

const transmissions: Array<buttonProps> = [
    {
        name: "Automatico",
        icon: "automatic"
    },
    {
        name: "Manual",
        icon: "manual"
    },
    {
        name: "Semi Automatic",
        icon: "semi_automatic"
    },
    {
        name: "Altro",
        icon: "other"
    },
]

const bodies: Array<buttonProps> = [
    {
        name: "Cabrio",
        icon: "cabrio"
    },
    {
        name: "City Car",
        icon: "citycar"
    },
    {
        name: "Coupe",
        icon: "coupe"
    },
    {
        name: "Berlina",
        icon: "sedan"
    },
    {
        name: "Station Wagon",
        icon: "station_wagon"
    },
    {
        name: "SUV",
        icon: "suv"
    },
    {
        name: "Altro",
        icon: "other"
    },
]

function reducer(
    state: SearchParameters,
    action:
        { type: 'set_vehicle_type'; payload: VehicleType }
        | { type: 'set_min_price'; payload: number }
        | { type: 'set_max_price'; payload: number }
        | { type: 'set_brand_model'; payload: BrandModels }
        | { type: 'set_min_year'; payload: number }
        | { type: 'set_max_year'; payload: number }
        | { type: 'set_min_mileage'; payload: number }
        | { type: 'set_max_mileage'; payload: number }
        | { type: 'set_min_power'; payload: number }
        | { type: 'set_max_power'; payload: number }
        | { type: 'set_transmission'; payload: string }
        | { type: 'set_body_type'; payload: string }
        | { type: 'set_color'; payload: string }
        | { type: 'set_doors'; payload: number }
        | { type: 'set_seats'; payload: number }
        | { type: 'set_gears'; payload: number }
        | { type: 'set_radius'; payload: number }
        | { type: 'set_price_range'; payload: number[] }
        | { type: 'set_cap'; payload: number }
        | { type: 'set_min_months'; payload: number }
        | { type: 'set_max_months'; payload: number }
        | { type: 'set_only_verified'; payload: boolean }
        | { type: 'set_max_advance'; payload: number }
        | { type: 'set_min_age'; payload: number }
        | { type: 'set_is_new'; payload: boolean }
        | { type: 'set_no_security_deposit'; payload: boolean }
        | { type: 'set_no_advance_payment'; payload: boolean }
        | { type: 'set_no_age_limit'; payload: boolean }
        | { type: 'set_no_annual_limit'; payload: boolean }
        | { type: 'set_annual_limit'; payload: number }
        | { type: 'set_fuels'; payload: string }
        | { type: 'set_with_driver'; payload: boolean }
        | { type: 'set_optionals'; payload: string }
        | { type: 'clean_optionals'; payload: null }
        | { type: 'clean_services'; payload: null }
        | { type: 'set_maintenance'; payload: string }
        | { type: 'set_insurances'; payload: string }
        | { type: 'set_other_services'; payload: string }
        | { type: 'set_internal_colors'; payload: string }
        | { type: 'set_external_colors'; payload: string }
        | { type: 'set_materials'; payload: string }
        | { type: 'set_traction'; payload: string }
        | { type: 'set_emission'; payload: string }
        | { type: 'clean_internal_colors'; payload: null }
        | { type: 'clean_external_colors'; payload: null }
        | { type: 'clean_materials'; payload: null }
        | { type: 'clean_traction'; payload: null }
        | { type: 'clean_emission'; payload: null }
        | { type: 'add_brand'; payload: string }
        | { type: 'set_brands_model'; payload: BrandModel }
        | { type: 'remove_brand'; payload: string }
): SearchParameters {
    switch (action.type) {
        case 'set_vehicle_type':
            return { ...state, vehicleType: action.payload }
        case 'set_min_price':
            return { ...state, minPrice: action.payload }
        case 'set_max_price':
            return { ...state, maxPrice: action.payload }
        case 'set_doors':
            return { ...state, doors: action.payload }
        case 'set_seats':
            return { ...state, seats: action.payload }
        case 'set_radius':
            return { ...state, radius: action.payload }
        case 'set_cap':
            return { ...state, cap: action.payload }
        case 'set_price_range':
            return { ...state, minPrice: action.payload[0], maxPrice: action.payload[1] }
        case 'set_min_months':
            return { ...state, minMonths: action.payload }
        case 'set_max_months':
            return { ...state, maxMonths: action.payload }
        case 'set_only_verified':
            return { ...state, onlyVerified: action.payload }
        case 'set_max_advance':
            return { ...state, maxAdvance: action.payload }
        case 'set_min_age':
            return { ...state, minAge: action.payload }
        case 'set_is_new':
            return { ...state, isNew: action.payload }
        case 'set_no_security_deposit':
            return { ...state, noSecurityDeposit: action.payload }
        case 'set_no_advance_payment':
            return { ...state, noAdvancePayment: action.payload }
        case 'set_no_age_limit':
            return { ...state, noAgeLimit: action.payload }
        case 'set_no_annual_limit':
            return { ...state, noAnnualLimit: action.payload }
        case 'set_annual_limit':
            return { ...state, annualLimit: action.payload }
        case 'set_fuels':
            return { ...state, fuels: state.fuels.includes(action.payload) ? state.fuels.filter(f => f != action.payload) : [...state.fuels, action.payload] }
        case 'set_transmission':
            return { ...state, transmissions: state.transmissions.includes(action.payload) ? state.transmissions.filter(f => f != action.payload) : [...state.transmissions, action.payload] }
        case 'set_body_type':
            return { ...state, bodies: state.bodies.includes(action.payload) ? state.bodies.filter(f => f != action.payload) : [...state.bodies, action.payload] }
        case 'set_seats':
            return { ...state, seats: action.payload }
        case 'set_doors':
            return { ...state, doors: action.payload }
        case 'set_gears':
            return { ...state, gears: action.payload }
        case 'set_with_driver':
            return { ...state, withDriver: action.payload }
        case 'set_optionals':
            return { ...state, optionals: state.optionals.includes(action.payload) ? state.optionals.filter(f => f != action.payload) : [...state.optionals, action.payload] }
        case 'clean_optionals':
            return { ...state, optionals: [] }
        case 'clean_services':
            return { ...state, maintenance: [], insurances: [], otherServices: [] }
        case 'set_maintenance':
            return { ...state, maintenance: state.maintenance.includes(action.payload) ? state.maintenance.filter(f => f != action.payload) : [...state.maintenance, action.payload] }
        case 'set_insurances':
            return { ...state, insurances: state.insurances.includes(action.payload) ? state.insurances.filter(f => f != action.payload) : [...state.insurances, action.payload] }
        case 'set_other_services':
            return { ...state, otherServices: state.otherServices.includes(action.payload) ? state.otherServices.filter(f => f != action.payload) : [...state.otherServices, action.payload] }
        case 'set_min_power':
            return { ...state, minPower: action.payload }
        case 'set_max_power':
            return { ...state, maxPower: action.payload }
        case 'set_internal_colors':
            return { ...state, internalColors: state.internalColors.includes(action.payload) ? state.internalColors.filter(f => f != action.payload) : [...state.internalColors, action.payload] }
        case 'set_external_colors':
            return { ...state, externalColors: state.externalColors.includes(action.payload) ? state.externalColors.filter(f => f != action.payload) : [...state.externalColors, action.payload] }
        case 'set_materials':
            return { ...state, internalMaterials: state.internalMaterials.includes(action.payload) ? state.internalMaterials.filter(f => f != action.payload) : [...state.internalMaterials, action.payload] }
        case 'set_traction':
            return { ...state, traction: state.traction.includes(action.payload) ? state.traction.filter(f => f != action.payload) : [...state.traction, action.payload] }
        case 'set_emission':
            return { ...state, emission: state.emission.includes(action.payload) ? state.emission.filter(f => f != action.payload) : [...state.emission, action.payload] }
        case 'clean_internal_colors':
            return { ...state, internalColors: [] }
        case 'clean_external_colors':
            return { ...state, externalColors: [] }
        case 'clean_materials':
            return { ...state, internalMaterials: [] }
        case 'clean_traction':
            return { ...state, traction: [] }
        case 'add_brand':
            return { ...state, brandModel: [...state.brandModel, { brand: action.payload, models: [] }] }
        case 'set_brands_model':
            return {
                ...state,
                brandModel: state.brandModel.map((item) =>
                    item.brand === action.payload.brand
                        ? { ...item, models: item.models.includes(action.payload.models) ? item.models.filter((m) => m != action.payload.models) : [...item.models, action.payload.models] }
                        : item
                )
            };
        case 'remove_brand':
            return { ...state, brandModel: state.brandModel.filter((bm => bm.brand != action.payload)) }
        default:
            return state
    }
}

type NumberActionType = 'set_min_price' | 'set_max_price' | 'set_radius' | 'set_cap' | 'set_max_advance' | 'set_min_age' | 'set_annual_limit' | 'set_min_power' | 'set_max_power' | 'set_min_months' | 'set_max_months';

type ModalKey = 'brand' | 'model' | 'equipment' | 'services' | 'engine' | 'colors' | 'internal' | 'external' | 'materials' | 'traction' | 'emission'

export const FilterSection = () => {
    const { duration } = useLocalSearchParams()
    const [activeTypes, setActiveTypes] = useState(0)
    const [searchText, setSearchText] = useState("");
    const [search, dispatch] = useReducer(reducer, initialSearchParameters)
    const ref = useModalSheetRef()
    const [selectedBrand, setSelectedBrand] = useState<string>("")
    const router = useRouter()
    const [isHorses, setIsHorses] = useState(false)
    const [modalKey, setModalKey] = useState<ModalKey | null>(null)

    const handlePress = () => {
        switch (modalKey) {
            case "model":
            case "equipment":
            case "services":
            case "colors":
            case "engine":
                closeModal()
                setModalKey(null);
                break;
            case "internal":
            case "external":
            case "materials":
                setModalKey("colors");
                break;
            case "traction":
            case "emission":
                setModalKey("engine");
                break;
            default:
                closeModal()
                console.log(search)
                router.push(`/home/news`);
                break;
        }
    }

    const openModal = (k: ModalKey) => {
        ref?.current?.expand()
        setModalKey(k)
    }

    const closeModal = () => {
        ref?.current?.close()
    }

    const handleNumberInput = (action: NumberActionType, payload: string) => {
        const numericText = payload.replace(/[^0-9]/g, '');
        dispatch({ type: action, payload: numericText ? Number(numericText) : 0 });
    }

    const modals: Record<ModalKey, { title: string; content: JSX.Element }> = {
        brand: {
            title: 'Marca',
            content: (
                <View style={styles.brandsModal}>
                    {(
                        Object.keys(brands).map(brand => (
                            <TouchableOpacity activeOpacity={1} key={brand} style={styles.onlyVerifiedCont} onPress={() => {
                                setSelectedBrand(brand)
                                dispatch({ type: "add_brand", payload: brand })
                                setModalKey("model")
                            }}>
                                <Text>
                                    {brand}
                                </Text>
                            </TouchableOpacity>
                        ))
                    )}
                </View>
            ),
        },
        model: {
            title: 'Modello',
            content: (
                <View style={styles.brandsModal}>
                    {
                        brands[selectedBrand] && brands[selectedBrand].map(model => (
                            <TouchableOpacity key={model} activeOpacity={1} style={styles.option} onPress={() => dispatch({ type: "set_brands_model", payload: { brand: selectedBrand, models: model } })}>
                                <Text>
                                    {model}
                                </Text>
                                <View style={[styles.verifiedCheck, search?.brandModel?.find(b => b.brand == selectedBrand)?.models.includes(model) ? styles.verifiedCheckActive : {}]}>
                                    <FontAwesome name="check" size={13} color={"white"} />
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            ),
        },
        equipment: {
            title: 'Equipaggiamento',
            content: (
                <View style={{ padding: 0, height: "100%" }}>
                    <View style={{ padding: 6, borderBottomColor: Colors.lightGray, borderBottomWidth: 1 }}>
                        <View style={styles.optionalInput}>
                            <Icon name="search" color={Colors.greyPrimary} />
                            <TextInput placeholder="Cerca" style={{ flex: 1 }} onChangeText={text => setSearchText(text)} />
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={styles.optionsList}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
                            <Text style={{ color: Colors.greyPrimary, fontWeight: "600" }}>
                                {search.optionals.length} selezionati
                            </Text>
                            <TouchableOpacity onPress={() => dispatch({ type: "clean_optionals", payload: null })}>
                                <Text style={{ color: Colors.greenPrimary, fontWeight: "600" }}>Azzera</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            optionals.filter(opt => opt.toLowerCase().includes(searchText.toLowerCase())).map((opt: string, key) => {
                                return (
                                    <TouchableOpacity style={styles.option} onPress={() => dispatch({ type: "set_optionals", payload: opt })}>
                                        <Text>
                                            {opt}
                                        </Text>
                                        <View style={[styles.verifiedCheck, search.optionals.includes(opt) ? styles.verifiedCheckActive : {}]}>
                                            <FontAwesome name="check" size={13} color={"white"} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            }

                            )
                        }
                    </ScrollView>
                </View>
            ),
        },
        services: {
            title: 'Servizi inclusi nel noleggio',
            content: (
                <View>
                    <ScrollView contentContainerStyle={styles.optionsList}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
                            <Text style={{ color: Colors.greyPrimary, fontWeight: "600" }}>
                            </Text>
                            <TouchableOpacity onPress={() => dispatch({ type: "clean_services", payload: null })}>
                                <Text style={{ color: "red", fontWeight: "600" }}>Azzera</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
                            <Text style={{ fontSize: 14, color: "black", fontWeight: "600" }}>Manutenzione</Text>
                            <Text style={{ fontSize: 12, color: Colors.greyPrimary, fontWeight: "300" }}>La macchina riceve la manutenzione</Text>
                        </View>
                        {
                            maintenance.map((opt: string, key) => {
                                return (
                                    <TouchableOpacity style={styles.option} onPress={() => dispatch({ type: "set_maintenance", payload: opt })}>
                                        <Text>
                                            {opt}
                                        </Text>
                                        <View style={[styles.verifiedCheck, search.maintenance.includes(opt) ? styles.verifiedCheckActive : {}]}>
                                            <FontAwesome name="check" size={13} color={"white"} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            }

                            )
                        }

                        <View style={{ flexDirection: "column", alignItems: "flex-start", marginTop: 30 }}>
                            <Text style={{ fontSize: 14, color: "black", fontWeight: "600" }}>Copertura assicurativa</Text>
                            <Text style={{ fontSize: 12, color: Colors.greyPrimary, fontWeight: "300" }}>Tipo di olizza che il veicolo possiede</Text>
                        </View>
                        {
                            insurances.map((opt: string, key) => {
                                return (
                                    <TouchableOpacity style={styles.option} onPress={() => dispatch({ type: "set_insurances", payload: opt })}>
                                        <Text>
                                            {opt}
                                        </Text>
                                        <View style={[styles.verifiedCheck, search.insurances.includes(opt) ? styles.verifiedCheckActive : {}]}>
                                            <FontAwesome name="check" size={13} color={"white"} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            }

                            )
                        }


                        <View style={{ flexDirection: "column", alignItems: "flex-start", marginTop: 30 }}>
                            <Text style={{ fontSize: 14, color: "black", fontWeight: "600" }}>Altri Servizi</Text>
                        </View>
                        {
                            otherServices.map((opt: string, key) => {
                                return (
                                    <TouchableOpacity style={styles.option} onPress={() => dispatch({ type: "set_other_services", payload: opt })}>
                                        <Text>
                                            {opt}
                                        </Text>
                                        <View style={[styles.verifiedCheck, search.otherServices.includes(opt) ? styles.verifiedCheckActive : {}]}>
                                            <FontAwesome name="check" size={13} color={"white"} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            }

                            )
                        }
                    </ScrollView>
                </View>
            ),
        },
        engine: {
            title: "Motore",
            content: (
                <View>
                    <ScrollView>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <TouchableOpacity style={[styles.powerCont, isHorses ? styles.onlyVerifiedContActive : {}]} activeOpacity={1} onPress={() => setIsHorses(true)}>
                                <Text>
                                    Cv
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.powerCont, !isHorses ? styles.onlyVerifiedContActive : {}]} activeOpacity={1} onPress={() => setIsHorses(false)}>
                                <Text>
                                    Kw
                                </Text>

                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "column", width: "100%", alignItems: "center", marginTop: 20 }}>
                            <View style={styles.priceInputContainer}>
                                <View style={styles.priceCont}>
                                    <Text style={styles.labelPrice}>Minimo</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Inserisci potenza minima"
                                        keyboardType="numeric"
                                        onChangeText={text => {
                                            const numericValue = text.replace(/[^0-9]/g, '');
                                            const powerValue = isHorses ?
                                                Number(numericValue) :
                                                Math.round(Number(numericValue) / 0.735499);
                                            dispatch({ type: "set_min_power", payload: powerValue });
                                        }}
                                        value={isHorses ?
                                            search.minPower.toString() :
                                            Math.round(search.minPower * 0.735499).toString()
                                        }
                                    />
                                </View>
                                <View style={styles.priceContEnd}>
                                    <Text style={styles.labelPrice}>Massimo</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Inserisci potenza massima"
                                        keyboardType="numeric"
                                        onChangeText={text => {
                                            const numericValue = text.replace(/[^0-9]/g, '');
                                            const powerValue = isHorses ?
                                                Number(numericValue) :
                                                Math.round(Number(numericValue) / 0.735499);
                                            dispatch({ type: "set_max_power", payload: powerValue });
                                        }}
                                        value={isHorses ?
                                            search.maxPower.toString() :
                                            Math.round(search.maxPower * 0.735499).toString()
                                        }
                                    />
                                </View>
                            </View>
                            <View style={styles.sliderContainer}>
                                <MultiSlider
                                    values={[search.minPower, search.maxPower]}
                                    sliderLength={300}
                                    onValuesChange={values => {
                                        dispatch({ type: "set_min_power", payload: values[0] })
                                        dispatch({ type: "set_max_power", payload: values[1] })
                                    }}
                                    min={0}
                                    max={1000}
                                    step={1}
                                    allowOverlap={false}
                                    snapped
                                    trackStyle={styles.track}
                                    selectedStyle={styles.selectedTrack}
                                    unselectedStyle={styles.unselectedTrack}
                                    markerStyle={styles.marker}
                                />
                            </View>
                        </View>
                        <FilterComponentModal title={"Trazione"} icon="wheel" items={search.traction} onClick={() => {
                            openModal("traction")
                        }} />
                        <FilterComponentModal title={"Classe di emissioni"} icon="services" items={search.emission} onClick={() => {
                            openModal("emission")
                        }} />

                    </ScrollView>
                </View>
            )
        },
        colors: {
            title: "Colori e interni",
            content: (
                <View>
                    <ScrollView>
                        <FilterComponentModal title={"Colore interni"} icon="wheel" items={search.internalColors} onClick={() => {
                            openModal("internal")
                        }} />
                        <FilterComponentModal title={"Colore esterni"} icon="services" items={search.externalColors} onClick={() => {
                            openModal("external")
                        }} />
                        <FilterComponentModal title={"Materiale interni"} icon="colors" items={search.internalMaterials} onClick={() => {
                            openModal("materials")
                        }} />
                    </ScrollView>
                </View>
            )
        },
        internal: {
            title: "Colore interni",
            content: (
                <View>
                    <ScrollView contentContainerStyle={styles.optionsList}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
                            <Text style={{ color: Colors.greyPrimary, fontWeight: "600" }}>
                                {search.internalColors.length} selezionati
                            </Text>
                            <TouchableOpacity onPress={() => dispatch({ type: "clean_internal_colors", payload: null })}>
                                <Text style={{ color: Colors.greenPrimary, fontWeight: "600" }}>Azzera</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            colors.map((opt, key) => {
                                return (
                                    <TouchableOpacity style={styles.option} onPress={() => dispatch({ type: "set_internal_colors", payload: opt.name })}>
                                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                            <View style={{ backgroundColor: opt.hex, width: 25, height: 25, borderRadius: 25, borderColor: Colors.lightGray, borderWidth: 1 }}></View>
                                            <Text>
                                                {opt.name}
                                            </Text>
                                        </View>
                                        <View style={[styles.verifiedCheck, search.internalColors.includes(opt.name) ? styles.verifiedCheckActive : {}]}>
                                            <FontAwesome name="check" size={13} color={"white"} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            }

                            )
                        }
                    </ScrollView >
                </View >
            )
        },
        external: {
            title: "Colore esterno",
            content: (
                <View>
                    <ScrollView contentContainerStyle={styles.optionsList}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
                            <Text style={{ color: Colors.greyPrimary, fontWeight: "600" }}>
                                {search.externalColors.length} selezionati
                            </Text>
                            <TouchableOpacity onPress={() => dispatch({ type: "clean_external_colors", payload: null })}>
                                <Text style={{ color: Colors.greenPrimary, fontWeight: "600" }}>Azzera</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            colors.map((opt, key) => {
                                return (
                                    <TouchableOpacity style={styles.option} onPress={() => dispatch({ type: "set_external_colors", payload: opt.name })}>
                                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                            <View style={{ backgroundColor: opt.hex, width: 25, height: 25, borderRadius: 25, borderColor: Colors.lightGray, borderWidth: 1 }}></View>
                                            <Text>
                                                {opt.name}
                                            </Text>
                                        </View>
                                        <View style={[styles.verifiedCheck, search.externalColors.includes(opt.name) ? styles.verifiedCheckActive : {}]}>
                                            <FontAwesome name="check" size={13} color={"white"} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            }

                            )
                        }
                    </ScrollView>
                </View>
            )
        },
        materials: {
            title: "Materiale interni",
            content: (
                <View style={{ padding: 0, height: "100%" }}>
                    <ScrollView contentContainerStyle={styles.optionsList}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
                            <Text style={{ color: Colors.greyPrimary, fontWeight: "600" }}>
                                {search.internalMaterials.length} selezionati
                            </Text>
                            <TouchableOpacity onPress={() => dispatch({ type: "clean_materials", payload: null })}>
                                <Text style={{ color: Colors.greenPrimary, fontWeight: "600" }}>Azzera</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            materials.map((opt: string, key) => {
                                return (
                                    <TouchableOpacity style={styles.option} onPress={() => dispatch({ type: "set_materials", payload: opt })}>
                                        <Text>
                                            {opt}
                                        </Text>
                                        <View style={[styles.verifiedCheck, search.internalMaterials.includes(opt) ? styles.verifiedCheckActive : {}]}>
                                            <FontAwesome name="check" size={13} color={"white"} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                            )
                        }
                    </ScrollView>
                </View>
            )
        },
        traction: {
            title: "Trazione",
            content: (
                <View style={{ padding: 0, height: "100%" }}>
                    <ScrollView contentContainerStyle={styles.optionsList}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
                            <Text style={{ color: Colors.greyPrimary, fontWeight: "600" }}>
                                {search.traction.length} selezionati
                            </Text>
                            <TouchableOpacity onPress={() => dispatch({ type: "clean_traction", payload: null })}>
                                <Text style={{ color: Colors.greenPrimary, fontWeight: "600" }}>Azzera</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            traction.map((opt: string, key) => {
                                return (
                                    <TouchableOpacity style={styles.option} onPress={() => dispatch({ type: "set_traction", payload: opt })}>
                                        <Text>
                                            {opt}
                                        </Text>
                                        <View style={[styles.verifiedCheck, search.traction.includes(opt) ? styles.verifiedCheckActive : {}]}>
                                            <FontAwesome name="check" size={13} color={"white"} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            }

                            )
                        }
                    </ScrollView>
                </View>
            )
        },
        emission: {
            title: "",
            content: (
                <View style={{ padding: 0, height: "100%" }}>
                    <ScrollView contentContainerStyle={styles.optionsList}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
                            <Text style={{ color: Colors.greyPrimary, fontWeight: "600" }}>
                                {search.emission.length} selezionati
                            </Text>
                            <TouchableOpacity onPress={() => dispatch({ type: "clean_emission", payload: null })}>
                                <Text style={{ color: Colors.greenPrimary, fontWeight: "600" }}>Azzera</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            emission.map((opt: string, key) => {
                                return (
                                    <TouchableOpacity style={styles.option} onPress={() => dispatch({ type: "set_emission", payload: opt })}>
                                        <Text>
                                            {opt}
                                        </Text>
                                        <View style={[styles.verifiedCheck, search.emission.includes(opt) ? styles.verifiedCheckActive : {}]}>
                                            <FontAwesome name="check" size={13} color={"white"} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            }

                            )
                        }
                    </ScrollView>
                </View>
            )
        }
    }

    return (
        <ModalSheetProvider >
            <ScrollView horizontal={false} style={{ marginBottom: 150 }}>
                <View style={styles.container}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabContainer} >
                        {tabs.map(({ label, icon, name }, i) => (
                            <VehicleTypeButton
                                key={label}
                                icon={<Icon name={icon} color={search.vehicleType == name ? 'black' : Colors.greyPrimary} />}
                                label={label}
                                active={search.vehicleType == name}
                                onClick={() => dispatch({ type: "set_vehicle_type", payload: name })}
                            />
                        ))}
                    </ScrollView>
                </View>
                <View style={{ paddingBottom: 140 }}>
                    <FilterComponent title="Marca e modello" icon="search">
                        <Button style={styles.buttonStyle} onPress={() => openModal("brand")}>Seleziona marca e modello</Button>
                        {search.brandModel.length > 0 && (
                            search.brandModel.map((item) => (
                                <View style={styles.brandModel} key={item.brand}>
                                    <View style={{ flexDirection: "row", gap: 10 }}>
                                        <Text style={{ color: "black" }}>
                                            {item.brand}
                                        </Text>
                                        <Text style={{ color: Colors.greyPrimary }}>
                                            {item.models.join(", ")}
                                        </Text>
                                    </View>
                                    <View style={styles.closeContainer}>
                                        <Icon
                                            name="close"
                                            color="white"
                                            width={13}
                                            onPress={() => dispatch({ type: "remove_brand", payload: item.brand })}
                                        />
                                    </View>
                                </View>
                            ))
                        )}

                        <TouchableOpacity style={styles.addBrandModel} onPress={() => openModal("brand")}>
                            <Text style={{ color: Colors.bluePrimary, fontSize: 20 }}>
                                +
                            </Text>
                            <Text style={{ color: Colors.bluePrimary, fontSize: 14 }}>
                                Aggiungi altre marche e modelli
                            </Text>
                        </TouchableOpacity>
                    </FilterComponent>

                    <FilterComponent title="Posizione" icon="location" description="Indica il luogo in cui vuoi cercare il veicolo">
                        <View style={styles.brandModel}>
                            <TextInput
                                placeholder="Digita città o CAP"
                                onChangeText={text => handleNumberInput("set_cap", text)}
                                style={{ flex: 1 }}
                                value={search.cap.toString()}
                            />
                        </View>

                        <Text style={{ color: Colors.bluePrimary, fontSize: 14 }}>
                            Utilizza la mia posizione
                        </Text>
                        <View style={styles.radiusCont}>
                            <Text>Raggio</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>

                                <TextInput
                                    style={styles.input}
                                    placeholder="Inserisci raggio massimo"
                                    keyboardType="numeric"
                                    onChangeText={text => handleNumberInput("set_radius", text)}
                                    value={search.radius.toString()}
                                />
                                <Text>Km</Text>
                            </View>
                            <MultiSlider
                                values={[search.radius]}
                                sliderLength={300}
                                onValuesChange={values => dispatch({ type: "set_radius", payload: values[0] })}
                                min={0}
                                max={100}
                                step={1}
                                allowOverlap={false}
                                snapped
                                trackStyle={styles.track}
                                selectedStyle={styles.selectedTrack}
                                unselectedStyle={styles.unselectedTrack}
                                markerStyle={styles.marker}
                            />
                        </View>
                    </FilterComponent>
                    <FilterComponent title={duration == "short" ? "Prezzo giornaliero" : "Prezzo mensile"} icon="plate" description={`Indicazione del prezzo per ${duration == "short" ? "giorno" : "mese"} di noleggio`}>
                        <View style={styles.priceInputContainer}>
                            <View style={styles.priceCont}>
                                <Text style={styles.labelPrice}>Minimo</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Inserisci prezzo minimo"
                                    keyboardType="numeric"
                                    onChangeText={text => handleNumberInput("set_min_price", text)}
                                    value={search.minPrice.toString()}
                                />
                            </View>
                            <View style={styles.priceContEnd}>
                                <Text style={styles.labelPrice}>Massimo</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Inserisci prezzo massimo"
                                    keyboardType="numeric"
                                    onChangeText={text => handleNumberInput("set_max_price", text)}
                                    value={search.maxPrice.toString()}
                                />
                            </View>
                        </View>
                        <View style={styles.sliderContainer}>
                            <MultiSlider
                                values={[search.minPrice, search.maxPrice]}
                                sliderLength={300}
                                onValuesChange={values => {
                                    dispatch({ type: "set_min_price", payload: values[0] })
                                    dispatch({ type: "set_max_price", payload: values[1] })
                                }}
                                min={0}
                                max={1000}
                                step={1}
                                allowOverlap={false}
                                snapped
                                trackStyle={styles.track}
                                selectedStyle={styles.selectedTrack}
                                unselectedStyle={styles.unselectedTrack}
                                markerStyle={styles.marker}
                            />
                        </View>
                    </FilterComponent>

                    {duration == "long" &&
                        <FilterComponent title="Durata noleggio" icon="clock" description="Indicazione della durata del noleggio">
                            <View style={styles.priceInputContainer}>
                                <View style={styles.priceCont}>
                                    <Text style={styles.labelPrice}>Da</Text>
                                    <View style={styles.inputDurationCont}>
                                        <Text style={styles.durationLabel}>Mesi</Text>
                                        <TextInput
                                            style={styles.inputDuration}
                                            placeholder="Qualsiasi"
                                            keyboardType="numeric"
                                            onChangeText={text => handleNumberInput("set_min_months", text)}
                                            value={search.minMonths.toString()}
                                        />
                                    </View>
                                </View>
                                <View style={styles.priceCont}>
                                    <Text style={styles.labelPrice}>A</Text>
                                    <View style={styles.inputDurationCont}>
                                        <Text style={styles.durationLabel}>Mesi</Text>
                                        <TextInput
                                            style={styles.inputDuration}
                                            placeholder="Qualsiasi"
                                            keyboardType="numeric"
                                            onChangeText={text => handleNumberInput("set_max_months", text)}
                                            value={search.maxMonths.toString()}
                                        />
                                    </View>
                                </View>
                            </View>
                        </FilterComponent>}

                    <FilterComponent title="Noleggiatori verificati" icon="verified_check" description="Mostra solo annunci da noleggiatori verificati, in modo da avere la sicurezza di noleggiare da professionisti qualificati.">
                        <TouchableOpacity style={[styles.onlyVerifiedCont, search.onlyVerified ? styles.onlyVerifiedContActive : {}]} activeOpacity={1} onPress={() => dispatch({ type: 'set_only_verified', payload: !search.onlyVerified })}>
                            <Text>
                                Mostra solo annunci verificati
                            </Text>
                            <View style={[styles.verifiedCheck, search.onlyVerified ? styles.verifiedCheckActive : {}]}>
                                {
                                    search.onlyVerified &&
                                    <FontAwesome name="check" color="white" />
                                }
                            </View>
                        </TouchableOpacity>
                    </FilterComponent>

                    <FilterComponent title={duration == "short" ? "Deposito cauzionario" : "Anticipo"} icon="card_payment" description={duration == "short" ? "Importo temporaneo trattenuto come garanzia." : "Pagamento iniziale richiesto per noleggi a lungo termine."}>
                        <TouchableOpacity style={[styles.onlyVerifiedCont, search.noAdvancePayment || search.noSecurityDeposit ? styles.onlyVerifiedContActive : {}]} activeOpacity={1} onPress={() => dispatch({ type: duration == "short" ? "set_no_security_deposit" : "set_no_advance_payment", payload: duration == "short" ? !search.noSecurityDeposit : !search.noAdvancePayment })}>
                            <Text>
                                {duration == "short" ? "Mostra solo veicoli senza cauzione" : "Mostra solo veicoli senza anticipo"}
                            </Text>
                            <View style={[styles.verifiedCheck, search.noAdvancePayment || search.noSecurityDeposit ? styles.verifiedCheckActive : {}]}>
                                {
                                    (search.noAdvancePayment || search.noSecurityDeposit) &&
                                    <FontAwesome name="check" color="white" />
                                }
                            </View>
                        </TouchableOpacity>

                        {((duration == "long" && !search.noAdvancePayment) || (duration == "short" && !search.noSecurityDeposit)) &&
                            <View style={styles.advanceCont}>
                                <Text style={styles.labelPrice}>Cifra massima</Text>
                                <View style={styles.anvanceInputCont}>
                                    <Text style={{ paddingHorizontal: 10 }}>€</Text>
                                    <TextInput
                                        style={styles.anvanceInput}
                                        placeholder={duration == "short" ? "Inserisci deposito massimo" : "Inserisci anticipo massimo"}
                                        keyboardType="numeric"
                                        onChangeText={text => handleNumberInput("set_max_advance", text)}
                                        value={search.maxAdvance.toString()}
                                    />
                                </View>

                            </View>
                        }
                    </FilterComponent>


                    {duration == "short" && <FilterComponent title="Limite di età" icon="seats" description="Età minima richiesta per il noleggio.">
                        <TouchableOpacity style={[styles.onlyVerifiedCont, search.noAgeLimit ? styles.onlyVerifiedContActive : {}]} activeOpacity={1} onPress={() => dispatch({ type: "set_no_age_limit", payload: !search.noAgeLimit })}>
                            <Text>
                                Mostra solo veicoli senza limite di età
                            </Text>
                            <View style={[styles.verifiedCheck, search.noAgeLimit ? styles.verifiedCheckActive : {}]}>
                                {
                                    search.noAgeLimit &&
                                    <FontAwesome name="check" color="white" />
                                }
                            </View>
                        </TouchableOpacity>
                        {!search.noAgeLimit &&
                            <View style={styles.advanceCont}>
                                <Text style={styles.labelPrice}>Età minima</Text>

                                <View style={styles.anvanceInputCont}>
                                    <Text style={{ paddingHorizontal: 10 }}>Anni</Text>
                                    <TextInput
                                        style={styles.anvanceInput}
                                        placeholder="Età"
                                        keyboardType="numeric"
                                        onChangeText={text => handleNumberInput("set_min_age", text)}
                                        value={search.minAge.toString()}
                                    />
                                </View>
                            </View>}
                    </FilterComponent>}


                    <FilterComponent title="Stato veicolo" icon="status" description="Stato del veicolo al momento del noleggio.">
                        <TouchableOpacity style={[styles.onlyVerifiedCont, search.isNew ? styles.onlyVerifiedContActive : {}]} activeOpacity={1} onPress={() => dispatch({ type: "set_is_new", payload: true })}>
                            <Text>
                                Nuovo
                            </Text>
                            <View style={[styles.verifiedCheck, search.isNew ? styles.verifiedCheckActive : {}]}>
                                {
                                    search.isNew &&
                                    <FontAwesome name="check" color="white" />
                                }
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.onlyVerifiedCont, !search.isNew ? styles.onlyVerifiedContActive : {}]} activeOpacity={1} onPress={() => dispatch({ type: "set_is_new", payload: false })}>
                            <Text>
                                Usato
                            </Text>
                            <View style={[styles.verifiedCheck, !search.isNew ? styles.verifiedCheckActive : {}]}>
                                {
                                    !search.isNew &&
                                    <FontAwesome name="check" color="white" />
                                }
                            </View>
                        </TouchableOpacity>
                    </FilterComponent>

                    <FilterComponent title="Percorrenza annuale" icon="distance" description="Limite di chilometri inclusi nel noleggio.">

                        <TouchableOpacity style={[styles.onlyVerifiedCont, search.noAnnualLimit ? styles.onlyVerifiedContActive : {}]} activeOpacity={1} onPress={() => dispatch({ type: "set_no_annual_limit", payload: !search.noAnnualLimit })}>
                            <Text>
                                Mostra solo veicoli senza limite km
                            </Text>
                            <View style={[styles.verifiedCheck, search.noAnnualLimit ? styles.verifiedCheckActive : {}]}>
                                {
                                    search.noAnnualLimit &&
                                    <FontAwesome name="check" color="white" />
                                }
                            </View>
                        </TouchableOpacity>
                        {!
                            search.noAnnualLimit &&
                            <View style={styles.advanceCont}>
                                <Text style={styles.labelPrice}>Percorrenza massima</Text>

                                <View style={styles.anvanceInputCont}>
                                    <Text style={{ paddingHorizontal: 10 }}>Km</Text>
                                    <TextInput
                                        style={styles.anvanceInput}
                                        placeholder="Massimo km"
                                        keyboardType="numeric"
                                        onChangeText={text => handleNumberInput("set_annual_limit", text)}
                                        value={search.annualLimit.toString()}
                                    />
                                </View>

                            </View>
                        }
                    </FilterComponent>


                    <FilterComponent title="Dati di base" description="Caratteristiche principali del veicolo.">
                        <Text style={{ marginTop: 15 }}>
                            Alimentazione
                        </Text>
                        <View style={styles.buttonsContainer}>
                            {
                                fuels.map((f) => {
                                    return (
                                        <TouchableOpacity style={[styles.listButton, search.fuels.includes(f.name) ? styles.listButtonActive : {}]} activeOpacity={1} onPress={() => dispatch({ type: "set_fuels", payload: f.name })}>
                                            <Icon name={f.icon} color="black" />
                                            <Text style={styles.listButtonText}>{f.name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>

                        <Text style={{ marginTop: 25 }}>
                            Cambio
                        </Text>
                        <View style={styles.buttonsContainer}>
                            {
                                transmissions.map((f) => {
                                    return (
                                        <TouchableOpacity style={[styles.listButton, search.transmissions.includes(f.name) ? styles.listButtonActive : {}]} activeOpacity={1} onPress={() => dispatch({ type: "set_transmission", payload: f.name })}>
                                            <Icon name={f.icon} color="black" />
                                            <Text style={styles.listButtonText}>{f.name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>

                        <Text style={{ marginTop: 25 }}>
                            Carrozzeria
                        </Text>
                        <View style={styles.buttonsContainer}>
                            {
                                bodies.map((f) => {
                                    return (
                                        <TouchableOpacity style={[styles.listButton, search.bodies.includes(f.name) ? styles.listButtonActive : {}]} activeOpacity={1} onPress={() => dispatch({ type: "set_body_type", payload: f.name })}>
                                            <Icon name={f.icon} color="black" />
                                            <Text style={styles.listButtonText}>{f.name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>

                        <Text style={{ marginTop: 25 }}>
                            Altri dati
                        </Text>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", marginVertical: 5 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
                                <Icon name="clock" color="black" width={20} height={20} />
                                <Text style={styles.dataTitle}>Posti</Text>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center", gap: 13 }}>
                                <TouchableOpacity style={styles.quantityIconCont} onPress={() => dispatch({ type: "set_seats", payload: search.seats > 0 ? search.seats - 1 : 0 })}>
                                    <Text style={styles.quantityIcon}>
                                        -
                                    </Text>
                                </TouchableOpacity>
                                <Text style={{ width: 30, textAlign: "center" }}>
                                    {search.seats}
                                </Text>
                                <TouchableOpacity style={styles.quantityIconCont} onPress={() => dispatch({ type: "set_seats", payload: search.seats + 1 })}>
                                    <Text style={styles.quantityIcon}>
                                        +
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", marginVertical: 5 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
                                <Icon name="clock" color="black" width={20} height={20} />
                                <Text style={styles.dataTitle}>Porte</Text>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center", gap: 13 }}>
                                <TouchableOpacity style={styles.quantityIconCont} onPress={() => dispatch({ type: "set_doors", payload: search.doors > 3 ? search.doors - 1 : 3 })}>
                                    <Text style={styles.quantityIcon}>
                                        -
                                    </Text>
                                </TouchableOpacity>
                                <Text style={{ width: 30, textAlign: "center" }}>
                                    {search.doors}+
                                </Text>
                                <TouchableOpacity style={styles.quantityIconCont} onPress={() => dispatch({ type: "set_doors", payload: search.doors + 1 })}>
                                    <Text style={styles.quantityIcon}>
                                        +
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", marginVertical: 5 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
                                <Icon name="clock" color="black" width={20} height={20} />
                                <Text style={styles.dataTitle}>Marce</Text>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center", gap: 13 }}>
                                <TouchableOpacity style={styles.quantityIconCont} onPress={() => dispatch({ type: "set_gears", payload: search.gears > 1 ? search.gears - 1 : 1 })}>
                                    <Text style={styles.quantityIcon}>
                                        -
                                    </Text>
                                </TouchableOpacity>
                                <Text style={{ width: 30, textAlign: "center" }}>
                                    {search.gears}+
                                </Text>
                                <TouchableOpacity style={styles.quantityIconCont} onPress={() => dispatch({ type: "set_gears", payload: search.gears + 1 })}>
                                    <Text style={styles.quantityIcon}>
                                        +
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </FilterComponent>

                    <FilterComponent title="Veicoli con conducente" icon="distance" description="Servizio di noleggio con conducente incluso.">
                        <TouchableOpacity style={[styles.onlyVerifiedCont, search.withDriver ? styles.onlyVerifiedContActive : {}]} activeOpacity={1} onPress={() => dispatch({ type: 'set_with_driver', payload: !search.withDriver })}>
                            <Text>
                                Mostra solo veicoli con conducente
                            </Text>
                            <View style={[styles.verifiedCheck, search.withDriver ? styles.verifiedCheckActive : {}]}>
                                {
                                    search.withDriver &&
                                    <FontAwesome name="check" color="white" />
                                }
                            </View>
                        </TouchableOpacity>
                    </FilterComponent>
                    <FilterComponentModal title={"Equipaggiamento"} icon="wheel" items={search.optionals} onClick={() => openModal("equipment")} />
                    <FilterComponentModal title={"Servizi inclusi con il noleggio"} icon="services" items={[...search.insurances, ...search.otherServices, ...search.maintenance]} onClick={() => openModal("services")} />
                    <FilterComponentModal title={"Colore e interni"} icon="colors" items={[...search.internalColors, ...search.externalColors, ...search.internalMaterials]} onClick={() => openModal("colors")} />
                    <FilterComponentModal title={"Motore"} icon="engine" items={[...search.traction, ...search.emission]} onClick={() => openModal("engine")} />
                </View>
            </ScrollView>

            <View style={[styles.fixedButtonsContainer]}>
                <TouchableOpacity style={styles.button} activeOpacity={0.95} onPress={handlePress}>
                    <Text style={styles.buttonText}>{modalKey == null ? "Mostra risultati" : "Conferma"}</Text>
                </TouchableOpacity>
            </View>


            <ModalSheet title={modalKey ? modals[modalKey].title : ''} ref={ref}>
                {!!modalKey && modals[modalKey].content}
            </ModalSheet>
        </ModalSheetProvider>
    )
}


const styles = StyleSheet.create({
    tabContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 8,
        padding: 20,
        backgroundColor: "white",
        width: "100%",
        height: "auto"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: Colors.greySecondary,
        marginBottom: 5
    },
    buttonStyle: {
        width: "100%",
        backgroundColor: "black",
        color: "white"
    },
    brandModel: {
        borderColor: Colors.greySecondary,
        borderWidth: 1,
        borderRadius: 10,
        width: "100%",
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    closeContainer: {
        padding: 3,
        borderRadius: 50,
        backgroundColor: Colors.greySecondary
    },
    addBrandModel: {
        borderColor: Colors.greySecondary,
        borderWidth: 1,
        borderRadius: 10,
        width: "100%",
        padding: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    },
    brandsModal: {
        flexDirection: "column",
        gap: 5,
    },
    brandModelButton: {
        borderColor: "white",
        borderWidth: 1,
        width: "100%",
        backgroundColor: "white",
        padding: 10,
    },
    brandModelButtonActive: {
        borderColor: Colors.greenPrimary,
        borderWidth: 1,
        borderRadius: 10,
        color: Colors.greenPrimary
    },
    radiusCont: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 5,
        marginTop: 10
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.greySecondary,
        marginBottom: 10,
        padding: 5,
        borderRadius: 10,
        width: 100,
        paddingVertical: 10
    },
    sliderContainer: {
        width: '100%',
        alignItems: 'center',
    },
    track: {
        backgroundColor: 'yellow',
    },
    selectedTrack: {
        backgroundColor: Colors.greenPrimary,
    },
    unselectedTrack: {
        backgroundColor: Colors.greySecondary,
    },
    marker: {
        height: 30,
        width: 30,
        backgroundColor: 'white',
        borderRadius: 30,
        borderWidth: 0.3,
        borderColor: Colors.greyPrimary,
    },
    priceInputContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    priceCont: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "40%"
    },
    priceContEnd: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        width: "40%"
    },
    labelPrice: {
        fontSize: 12,
        color: 'black',
    },
    inputDuration: {
        padding: 5,
        flex: 1,
        paddingVertical: 10,
        borderLeftWidth: 1,
        borderLeftColor: Colors.greySecondary,
        textAlign: "right"
    },
    inputDurationCont: {
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: Colors.greySecondary,
        flexDirection: "row",
        alignItems: "center"
    },
    durationLabel: {
        paddingRight: 12
    },
    picker: {
        height: 50,
        width: 150,
    },
    onlyVerifiedCont: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.lightGray,
        padding: 10,
        paddingVertical: 14,
        borderRadius: 10
    },
    onlyVerifiedContActive: {
        backgroundColor: 'rgba(0, 193, 92, 0.2)',
        borderColor: Colors.greenPrimary
    },
    verifiedCheck: {
        width: 25,
        height: 25,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: Colors.lightGray,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    verifiedCheckActive: {
        backgroundColor: Colors.greenPrimary
    },
    advanceCont: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%"
    },
    anvanceInputCont: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: Colors.greySecondary,
        padding: 5,
        borderRadius: 10,
        width: '100%',
        paddingVertical: 10
    },
    anvanceInput: {
        flex: 1,
        borderLeftColor: Colors.greyPrimary,
        borderLeftWidth: 1,
        textAlign: "right"
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10
    },
    listButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderColor: Colors.greySecondary,
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5,
        gap: 10
    },
    listButtonActive: {
        borderColor: Colors.greenPrimary,
        backgroundColor: "rgba(0, 193, 92, 0.1)"
    },
    listButtonText: {
        fontWeight: "300",
        fontSize: 13
    },
    quantityIcon: {
        fontSize: 20,
    },
    quantityIconCont: {
        height: 30,
        width: 30,
        borderWidth: 1,
        borderColor: Colors.greySecondary,
        borderRadius: 30,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    dataTitle: {
        fontSize: 14
    },
    fixedButtonsContainer: {
        position: 'absolute',
        bottom: 90,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 18,
        zIndex: 1,
        gap: 8,
    },
    button: {
        backgroundColor: 'rgba(0, 193, 92, 0.98)',
        padding: 12,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 5
    },
    buttonText: {
        color: 'white',
        fontWeight: '400',
    },
    optionalInput: {
        backgroundColor: Colors.lightGray,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 8,
        gap: 10,
        borderRadius: 8
    },
    option: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 1,
        height: 50
    },
    optionsList: {
        paddingBottom: 170
    },
    modalButtonsContainer: {
        position: 'absolute',
        bottom: 120,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        zIndex: 1,
        gap: 8,
    },
    modalButtonsContainer2: {
        position: 'absolute',
        bottom: -50,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        zIndex: 1,
        gap: 8,
    },
    powerCont: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.lightGray,
        padding: 10,
        paddingVertical: 14,
        borderRadius: 10
    },
    modalRowValue: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.blackPrimary,
    },
})

interface TabItem {
    label: string
    icon: IconName
    name: VehicleType
}

interface SearchParameters {
    vehicleType: VehicleType
    brandModel: BrandModels[]
    minPrice: number
    maxPrice: number
    minMonths: number
    maxMonths: number
    cap: number
    radius: number
    onlyVerified: boolean
    noAdvancePayment: boolean
    noSecurityDeposit: boolean
    maxAdvance: number
    isNew: boolean
    noAnnualLimit: boolean
    annualLimit: number
    fuels: string[]
    transmissions: string[]
    bodies: string[]
    seats: number
    doors: number
    gears: number
    withDriver: boolean
    noAgeLimit: boolean
    minAge: number
    optionals: string[]
    maintenance: string[]
    insurances: string[]
    otherServices: string[]
    internalColors: string[]
    externalColors: string[]
    internalMaterials: string[]
    minPower: number
    maxPower: number
    traction: string[]
    emission: string[]
}

const initialSearchParameters: SearchParameters = {
    vehicleType: 'car',
    brandModel: [],
    minPrice: 0,
    maxPrice: 1000,
    minMonths: 0,
    maxMonths: 24,
    radius: 1000,
    cap: 0,
    onlyVerified: false,
    noAdvancePayment: false,
    noSecurityDeposit: false,
    maxAdvance: 0,
    isNew: false,
    noAnnualLimit: false,
    annualLimit: 0,
    fuels: [] as Array<string>,
    transmissions: [] as Array<string>,
    bodies: [] as Array<string>,
    seats: 0,
    doors: 0,
    gears: 0,
    withDriver: false,
    noAgeLimit: false,
    minAge: 0,
    optionals: [] as string[],
    maintenance: [] as string[],
    insurances: [] as string[],
    otherServices: [] as string[],
    internalColors: [] as string[],
    externalColors: [] as string[],
    internalMaterials: [] as string[],
    minPower: 0,
    maxPower: 1000,
    traction: [] as string[],
    emission: [] as string[],
}

interface BrandModels {
    brand: string;
    models: string[];
}


interface BrandModel {
    brand: string;
    models: string;
}

type VehicleType = 'car' | 'van' | 'motorcycle'