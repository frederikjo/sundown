import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { Button, StepButton } from "@mui/material";
import { Dayjs } from "dayjs";
import MissionDetails from "./SpaceReport/MissionDetails";
import SatelitePosition from "./SpaceReport/SatelitePosition";
import SpaceMissionImages from "./SpaceReport/SpaceMissionImages";
import FinaliseReport, {
  SpaceReportType,
  Image,
} from "./SpaceReport/FinaliseReport";
import { useStore } from "@/stores/spaceReportsStore";
import { useRouter } from "next/navigation";
import { useUser } from "@/UserContext";

const steps = ["1", "2", "3", "4"];

const CreateSpaceReportPage: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [missionName, setMissionName] = useState("");
  const [missionDescription, setMissionDescription] = useState("");

  const [editedSteps, setEditedSteps] = useState<number[]>([]);
  const [missionDate, setMissionDate] = useState<
    Dayjs | null | undefined
  >(null);
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);

  const { addMissionData } = useStore() as {
    addMissionData: (data: SpaceReportType) => void;
  };

  const totalSteps = useMemo(() => {
    return steps.length;
  }, []);

  const stepRequirementsMet = useMemo(() => {
    if (activeStep === 0) {
      return (
        missionName.length > 0 &&
        missionDescription.length > 0 &&
        missionDate !== null
      );
    }
    if (activeStep === 1) {
      return selectedImages.length > 0;
    }

    if (activeStep === 2 || activeStep === 3) {
      return true; // No requirements for steps 2 and 3
    }
    return false;
  }, [
    activeStep,
    missionName,
    missionDescription,
    missionDate,
    selectedImages,
  ]);

  const handleNext = useCallback(() => {
    const newActiveStep =
      activeStep === totalSteps - 1 &&
      Object.keys(completed).length !== totalSteps
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  }, [activeStep, totalSteps, completed]);

  const handleBack = useCallback(() => {
    setActiveStep((activeStep) => activeStep - 1);
    setEditedSteps((prevEditedSteps) => [
      ...prevEditedSteps,
      activeStep,
    ]);
  }, [activeStep]);

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

  const handleComplete = () => {
    if (
      activeStep === 0 &&
      (!missionName || !missionDescription || !missionDate)
    ) {
      return;
    }
    if (editedSteps.includes(activeStep)) {
      setEditedSteps(
        editedSteps.filter((step) => step !== activeStep)
      );
    }

    const newCompleted = { ...completed, [activeStep]: true };
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();

    if (activeStep === steps.length - 1) {
      const missionData = {
        missionName,
        missionDescription,
        missionDate,
        lat,
        long,
        selectedImages,
        userId: user?.id,
      };

      addMissionData(missionData);

      router.push("/dashboard");
    }
  };

  const handleReset = useCallback(() => {
    setActiveStep(0);
    setCompleted({});
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen m-auto mt-5 max-w-[716px]">
      <Stepper nonLinear activeStep={activeStep}>
        {steps?.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)} />
          </Step>
        ))}
      </Stepper>
      <div className="w-full">
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

            {activeStep === 1 && (
              <SpaceMissionImages
                onSelect={setSelectedImages}
                isCompleted={completed[activeStep]}
                initialImages={selectedImages}
              />
            )}
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
          {activeStep !== steps.length &&
            (completed[activeStep] ? (
              <Button
                onClick={() => {
                  setEditedSteps([...editedSteps, activeStep]);
                  setCompleted((prevCompleted) => {
                    const newCompleted = { ...prevCompleted };
                    delete newCompleted[activeStep];
                    return newCompleted;
                  });
                }}
              >
                Edit step
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={!stepRequirementsMet}
              >
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
