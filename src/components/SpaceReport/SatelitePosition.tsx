// SatelitePosition.tsx
import React, { useEffect, useState, Suspense } from "react";
import useSWR from "swr";
import { TextField } from "@mui/material";

const MapComponent = React.lazy(() => import("./MapComponent"));

interface SatelitePositionProps {
  onPositionChange: (lat: number, long: number) => void;
}

const SatelitePosition: React.FC<SatelitePositionProps> = ({
  onPositionChange,
}) => {
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetcher = (url: string) =>
    fetch(url).then((res) => res.json());

  const { data } = useSWR(
    "https://api.wheretheiss.at/v1/satellites/25544",
    fetcher
  );

  useEffect(() => {
    if (data) {
      setLat(data.latitude);
      setLong(data.longitude);
      setLoading(false);
      onPositionChange(data.latitude, data.longitude);
    }
  }, [data, onPositionChange]);

  useEffect(() => {
    const intervalId = setInterval(
      () => fetcher("https://api.wheretheiss.at/v1/satellites/25544"),
      60000 // Fetch data every minute
    );

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <TextField
          label="Latitude"
          value={lat === null ? "" : lat.toFixed(2)}
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Longitude"
          value={long === null ? "" : long.toFixed(2)}
          InputProps={{ readOnly: true }}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : lat !== null && long !== null ? (
        <Suspense fallback={<div>Loading map...</div>}>
          <MapComponent lat={lat} long={long} />
        </Suspense>
      ) : null}
    </div>
  );
};

export default SatelitePosition;
