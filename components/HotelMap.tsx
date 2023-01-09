import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const HotelMap = ({ hotelData }: any) => {
  const containerStyle = {
    width: '1200px',
    height: '480px',
    marginLeft: "6px",
    marginTop: "21px"
  };

  const position = {
    lat: parseFloat(hotelData.latitude),
    lng: parseFloat(hotelData.longitude)
  }

  return (
    <LoadScript
    googleMapsApiKey="AIzaSyDialFLnDwOLWl1RhibVYP6XbBJ-NSxTLQ"
  >
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position}
      zoom={15}
      mapTypeId='roadmap'
    >
     <Marker position={position} />
    </GoogleMap>
  </LoadScript>
  )
}

export default HotelMap
