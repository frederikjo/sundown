import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Image from "next/image";
import dayjs, { Dayjs } from "dayjs";
import { User } from "@/UserContext";

export interface Image {
  id: string;
  url: string;
}

export interface SpaceReportType {
  id?: string;
  userId?: User | number | null;
  missionName: string;
  missionDescription: string;
  missionDate: Dayjs | null | undefined;
  lat: number | null;
  long: number | null;
  selectedImages: string[];
}

const FinaliseReport: React.FC<SpaceReportType> = ({
  missionName,
  missionDescription,
  missionDate,
  lat,
  long,
  selectedImages,
}) => {
  console.log(selectedImages);
  return (
    <div className="flex items-center gap-4">
      <div>
        <TextField
          label="Mission Name"
          error={!missionName}
          value={missionName}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          error={!missionDescription}
          label="Mission Description"
          value={missionDescription}
          fullWidth
          required
          multiline
          rows={4}
          margin="normal"
        />
        <TextField
          label="Latitude"
          value={lat}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Longitude"
          value={long}
          fullWidth
          margin="normal"
        />
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker value={missionDate} />
      </LocalizationProvider>
      <div>
        {selectedImages?.map((image) => (
          <Image
            key={image}
            src={image}
            alt="Selected"
            width={50}
            height={50}
          />
        ))}
      </div>
    </div>
  );
};

export default FinaliseReport;
