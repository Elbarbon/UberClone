import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_KEY } from '@env'
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { Icon } from 'react-native-elements';

const NavegateCard = () => {
    const dispatch = useDispatch(setDestination);
    const navigation = useNavigation();
    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Buenos días, Javier</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                        styles={toInputBoxStyles}
                        query={{
                            key: GOOGLE_MAPS_KEY,
                            language:"en"
                        }}
                        minLength={2}
                        returnKeyType={"search"}
                        placeholder='Destino'
                        nearbyPlacesAPI="GooglePlacesSearch"
                        enablePoweredByContainer={false}
                        fetchDetails={true}
                        onPress={(data, details= null)=> {
                            dispatch(setDestination({
                                location: details.geometry.location,
                                description: data.description
                            }));

                            navigation.navigate('RideOptionsCard')
                        }}
                        debounce={400}
                    />
                </View>
                <NavFavourites/>
                <View style={tw`flex-row bg-white justify-evenly py-2 border-t border-gray-100`}>
                    <TouchableOpacity 
                        onPress={()=> navigation.navigate("RideOptionsCard")}
                        style={tw`flex justify-between flex-row bg-black w-24 px-4 py-3 rounded-full`}>
                        <Icon name="car" type="font-awesome" color="white" size={16} />
                        <Text style={tw`text-white text-center`}>Rides</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
                        <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
                        <Text style={tw`text-black text-center`}>Eats</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default NavegateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0
    },
    textInput:{
        backgroundColor:'#DDDDDF',
        borderRadius:0,
        fontSize:18
    },
    textInputContainer:{
        paddingHorizontal: 20
    }
})
