import React, { useEffect, useState, Suspense } from "react";
import useSWR from "swr";
import { TextField } from "@mui/material";

const MapComponent = React.lazy(() => import("./MapComponent"));
interface SatelitePositionProps {
  onPositionChange: (lat: number, long: number) => void;
}

const apiUrl = "https://api.wheretheiss.at/v1/satellites/25544";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SatelitePosition: React.FC<SatelitePositionProps> = ({
  onPositionChange,
}) => {
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const { data, mutate } = useSWR(apiUrl, fetcher, {
    // fetch ISS position every minute
    refreshInterval: 60000,
  });

  useEffect(() => {
    if (data) {
      setLat(data.latitude);
      setLong(data.longitude);
      setLoading(false);
      onPositionChange(data.latitude, data.longitude);
    }
  }, [data, onPositionChange]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        mutate();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [mutate]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center gap-6 mt-4">
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
