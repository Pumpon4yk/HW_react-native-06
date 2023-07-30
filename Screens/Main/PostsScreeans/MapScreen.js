import { ScrollView, Text,View, StyleSheet } from "react-native";
import MapView, { Marker} from 'react-native-maps';


export default function MapScreen({route}) {
const {locationPostCoord: {latitude, longitude}} = route.params[0].post

  return(
    <View style={styles.container}>

<MapView style={styles.map}
   region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.005,
        }}
>
  <Marker
          title="Photo marker"
          coordinate={{
            latitude: latitude,
          longitude: longitude,
          }}
          description="it`s here"
        />
</MapView>
    </View>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  map:{
    width: '100%',
    height: '100%'
  }
})

