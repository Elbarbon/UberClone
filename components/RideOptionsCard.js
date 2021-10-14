import React, {useState} from 'react'
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, FlatList, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';
import "intl";
import "intl/locale-data/jsonp/en";

const data = [
    {
        id: "Uber-X-123",
        title: "UberX",
        multiplier: 1,
        image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_896,h_504/f_auto,q_auto/products/carousel/UberX.png"
    },
    {
        id: "Uber-XL-456",
        title: "UberXL",
        multiplier: 1.2,
        image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_863,h_485/f_auto,q_auto/products/carousel/blacksuv.png"
    },
    {
        id: "Uber-LUX-789",
        title: "UberLUX",
        multiplier: 1.75,
        image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_858,h_483/f_auto,q_auto/products/carousel/Black.png"
    }
];

const SURGE_CHARGE_RATE = 10.5;

const RideOptionsCard = () => {
    const navigator = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity
                    onPress={()=> navigator.navigate("NavegateCard")}
                    style={[tw`absolute top-3 left-5 z-50 p-3 rounded-full`]}
                >
                    <Icon name="chevron-left" type="fontawesome"/>
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>¿En qué viajas? - {travelTimeInformation?.distance.text}</Text>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item)=> item.id}
                renderItem={({item: {id,title, multiplier, image}, item})=> (
                    <TouchableOpacity
                        onPress={()=> setSelected(item)}
                        style={tw`flex-row justify-between items-center px-10 ${
                            id=== selected?.id && "bg-gray-200" 
                        }`}
                    >
                        <Image
                            style={{
                                width:100,
                                height:100,
                                resizeMode: "contain"
                            }}
                            source={{uri:image}}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl font-semibold`}>{title}</Text>
                            <Text>tiempo de viaje {travelTimeInformation?.duration.text}</Text>
                        </View>
                        <Text style={tw`text-xl`}>
                            {new Intl.NumberFormat('es-es', {
                                style: 'currency',
                                currency: 'CLP',

                            }).format(
                                (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) 
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
            />  
            <View>
                <TouchableOpacity style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`} disabled={!selected}>
                    <Text style={tw`text-center text-white text-xl `}>Opción {selected?.title}</Text>
                </TouchableOpacity>
            </View>          
        </SafeAreaView>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({})
