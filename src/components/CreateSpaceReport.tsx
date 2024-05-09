import React, { useEffect, useState } from "react";
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
  const [missionName, setMissionName] = useState("");
  const [missionDescription, setMissionDescription] = useState("");
  const [missionDate, setMissionDate] = useState<
    Dayjs | null | undefined
  >(null);

  const [value, onChange] = useState<Value>(new Date());

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    // Check if the required fields are filled
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
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  useEffect(() => {
    // Needed to prevent hydration mismatch
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full">
      {isMounted && (
        <Stepper nonLinear activeStep={activeStep}>
          {steps?.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      )}
      <div>
        {allStepsCompleted() ? (
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
            <div className="py-1 mt-2 mb-1">
              Step {activeStep + 1}
            </div>
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
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </div>
            {activeStep === 0 && (
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
                  onChange={(e) =>
                    setMissionDescription(e.target.value)
                  }
                  fullWidth
                  required
                  multiline
                  rows={4}
                  margin="normal"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={missionDate}
                    onChange={(newValue) => {
                      setMissionDate(newValue);
                    }}
                  />
                </LocalizationProvider>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CreateSpaceReportPage;
