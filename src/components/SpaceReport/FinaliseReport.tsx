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
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col w-full">
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Mission date" value={missionDate} />
        </LocalizationProvider>
      </div>
      <span>Selected image</span>
      <div className="flex flex-col flex-wrap items-center justify-center w-full h-full overflow-auto border-2 border-gray-400 shadow-sm">
        <div className="flex flex-wrap">
          {selectedImages?.map((image) => (
            <Image
              key={image}
              src={image}
              alt="Selected"
              width={100}
              height={100}
              className="h-[150px] hover:p-2 w-1/4 p-1 transition-all duration-200 ease-in-out cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinaliseReport;
