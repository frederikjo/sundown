import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import {
  Button,
  StepButton,
  StepContent,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import SelectImages from "./SpaceReport/SpaceMissionImages";
import MissionDetails from "./SpaceReport/MissionDetails";
import SatelitePosition from "./SpaceReport/SatelitePosition";
import SpaceMissionImages from "./SpaceReport/SpaceMissionImages";
import FinaliseReport, { Image } from "./SpaceReport/FinaliseReport";
// import DatePicker from "react-date-picker";

const steps = ["1", "2", "3", "4"];

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CreateSpaceReportPage: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [missionName, setMissionName] = useState("");
  const [missionDescription, setMissionDescription] = useState("");
  const [missionDate, setMissionDate] = useState<
    Dayjs | null | undefined
  >(null);
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);

  const totalSteps = useMemo(() => {
    return steps.length;
  }, []);

  const handleNext = useCallback(() => {
    const newActiveStep =
      activeStep === totalSteps - 1 &&
      Object.keys(completed).length !== totalSteps
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  }, [activeStep, totalSteps, completed]);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const handleStep = useCallback(
    (step: number) => () => {
      setActiveStep(step);
    },
    []
  );

  const handlePositionChange = useCallback(
    (newLat: number, newLong: number) => {
      setLat(newLat);
      setLong(newLong);
    },
    []
  );

  const handleComplete = useCallback(() => {
    if (
      activeStep === 0 &&
      (!missionName || !missionDescription || !missionDate)
    ) {
      return;
    }

    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  }, [
    activeStep,
    missionName,
    missionDescription,
    missionDate,
    completed,
    handleNext,
  ]);

  const handleReset = useCallback(() => {
    setActiveStep(0);
    setCompleted({});
  }, []);

  useEffect(() => {
    // Needed to prevent hydration mismatch
    setIsMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen m-auto">
      {isMounted && (
        <Stepper nonLinear activeStep={activeStep}>
          {steps?.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton
                color="inherit"
                onClick={handleStep(index)}
              />
            </Step>
          ))}
        </Stepper>
      )}
      <div>
        {Object.keys(completed).length === totalSteps ? (
          <>
            <div className="mt-2 mb-1">
              All steps completed - you&apos;re finished
            </div>
            <div className="flex flex-row pt-2">
              <div className="flex-auto" />
              <Button onClick={handleReset}>Reset</Button>
            </div>
          </>
        ) : (
          <>
            {activeStep === 0 && (
              <MissionDetails
                missionName={missionName}
                missionDescription={missionDescription}
                missionDate={missionDate}
                setMissionName={setMissionName}
                setMissionDescription={setMissionDescription}
                setMissionDate={setMissionDate}
              />
            )}

            {activeStep === 1 && <SpaceMissionImages onSelect={setSelectedImages} />}
            {activeStep === 2 && (
              <SatelitePosition
                onPositionChange={handlePositionChange}
              />
            )}
            {activeStep === 3 && (
              <FinaliseReport
                missionName={missionName}
                missionDescription={missionDescription}
                missionDate={missionDate}
                lat={lat}
                long={long}
                selectedImages={selectedImages}
              />
            )}
          </>
        )}
        <div className="flex flex-row pt-2">
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <div className="flex-auto" />
          <Button onClick={handleNext} sx={{ mr: 1 }}>
            Next
          </Button>
          {activeStep !== steps.length &&
            (completed[activeStep] ? (
              <div className="inline-block">
                Step {activeStep + 1} already completed
              </div>
            ) : (
              <Button onClick={handleComplete}>
                {Object.keys(completed).length === steps.length - 1
                  ? "Finish"
                  : "Complete Step"}
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CreateSpaceReportPage;
