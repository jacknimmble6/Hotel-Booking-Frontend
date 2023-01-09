import React, { useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const Map = ({ hotelData }: any) => {
  const [activeMarker, setActiveMarker] = useState('');

  const containerStyle = {
    width: '400px',
    height: '480px',
    marginLeft: "930px",
    marginTop: "51px"
  };
      
  const center = {
    lat: 35.5175,
    lng: 276.5804
  };

  return (
    <LoadScript
    googleMapsApiKey="AIzaSyDialFLnDwOLWl1RhibVYP6XbBJ-NSxTLQ"
  >
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      mapTypeId='roadmap'
    >
      {
        hotelData.map((hotel: { latitude: string; longitude: string; _id: string; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; address: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
          const position = {
            lat: parseFloat(hotel?.latitude),
            lng: parseFloat(hotel?.longitude)
          }

          return (
            <Marker key={hotel?._id} position={position} onClick={() => setActiveMarker(hotel._id)}>
              {activeMarker === hotel._id && (
                <InfoWindow position={position} onCloseClick={() => setActiveMarker('')}>
                  <div className="text-black">
                    <p className="text-black">{hotel?.name}<br/>{hotel?.address}</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          )
        })
      }
    </GoogleMap>
  </LoadScript>
  )
}

export default Map