"use client";

import { useGoogleMaps } from "@/client/contexts/google-maps-context";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Spinner } from "../ui/spinner";

interface GoogleMapsProps {
  center: { lat: number; lng: number };
  zoom: number;
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

const GoogleMaps = ({ center, zoom }: GoogleMapsProps) => {
  const { googleApiKey, isLoadingGoogleMaps } = useGoogleMaps();

  if (isLoadingGoogleMaps) {
    return (
      <div className="flex h-96 flex-col items-center justify-center">
        <Spinner size={"large"} />
      </div>
    );
  }

  if (!googleApiKey) {
    return (
      <div className="text-secondary flex h-full w-full flex-col items-center justify-center">
        <h1>Error: Google Maps API key is missing.</h1>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={googleApiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMaps;
