import React from 'react'
import { View, Text, SafeAreaView, Image } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GOOGLE_MAPS_KEY } from '@env'
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';

const HomeScreen = () => {
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={tw `bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image style={{
                    width: 100, height: 100, resizeMode:'contain'
                }}
                source={{
                    uri: 'https://1000marcas.net/wp-content/uploads/2019/12/UBER-Logo.jpg'
                }}/>
                <GooglePlacesAutocomplete
                    query={{
                        key: GOOGLE_MAPS_KEY,
                        language:"en"
                    }}
                    placeholder="¿Donde vamos?"                    
                    enablePoweredByContainer={false}
                    minLength={2}
                    fetchDetails={true}
                    onPress={(data, details=null)=>{                       
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description
                        }));

                        dispatch(setDestination(null));
                    }}                   
                    styles={{
                        container:{
                            flex:0
                        },                        
                        textInput:{
                            fontSize:18
                        }
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />
                <NavOptions/>
            </View>            
        </SafeAreaView>
    )
}

export default HomeScreen

