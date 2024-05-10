import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import React, { useCallback } from "react";

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

const dateFormat = "DD/MM/YYYY";

const MissionDetails: React.FC<MissionDetailsProps> = ({
  missionName,
  missionDescription,
  missionDate,
  setMissionName,
  setMissionDescription,
  setMissionDate,
}) => {
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setMissionName(e.target.value),
    [setMissionName]
  );
  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setMissionDescription(e.target.value),
    [setMissionDescription]
  );
  const handleDateChange = useCallback(
    (newValue: Dayjs | null) => {
      setMissionDate(newValue ? dayjs(newValue) : null);
    },
    [setMissionDate]
  );

  return (
    <div className="flex items-center gap-4">
      <div>
        <TextField
          label="Mission Name"
          value={missionName}
          onChange={handleNameChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Mission Description"
          value={missionDescription}
          onChange={handleDescriptionChange}
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
          format={dateFormat}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
    </div>
  );
};

export default MissionDetails;
