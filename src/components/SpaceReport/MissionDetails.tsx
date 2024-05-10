import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

interface MissionDetailsProps {
  missionName: string;
  missionDescription: string;
  missionDate: Dayjs | null | undefined;
  setMissionName: React.Dispatch<React.SetStateAction<string>>;
  setMissionDescription: React.Dispatch<React.SetStateAction<string>>;
  setMissionDate: React.Dispatch<
    React.SetStateAction<Dayjs | null | undefined>
  >;
}

const MissionDetails: React.FC<MissionDetailsProps> = ({
  missionName,
  missionDescription,
  missionDate,
  setMissionName,
  setMissionDescription,
  setMissionDate,
}) => {
  return (
    <div className="flex items-center gap-4">
      <div>
        <TextField
          label="Mission Name"
          error={!missionName}
          value={missionName}
          onChange={(e) => setMissionName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          error={!missionDescription}
          label="Mission Description"
          value={missionDescription}
          onChange={(e) => setMissionDescription(e.target.value)}
          fullWidth
          required
          multiline
          rows={4}
          margin="normal"
        />
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={missionDate}
          onChange={(newValue: Dayjs | null) => {
            setMissionDate(newValue ? dayjs(newValue) : null);
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default MissionDetails;
