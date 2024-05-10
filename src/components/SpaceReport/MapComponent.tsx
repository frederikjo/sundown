import L from "leaflet";
import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  lat: number;
  long: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ lat, long }) => (
  <MapContainer
    center={[lat, long]}
    zoom={3}
    className="h-[500px]"
    style={{ width: "100%", height: "500px" }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker
      position={[lat, long]}
      icon={L.divIcon({
        iconSize: [25, 25],
        iconAnchor: [25 / 2, 25 + 10],
        className: "ISSSpaceStation",
        html: "🛰",
      })}
    />
  </MapContainer>
);

export default MapComponent;
