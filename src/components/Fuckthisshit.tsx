// import React, { useEffect, useState } from "react";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import {
//   Button,
//   StepButton,
//   StepContent,
//   TextField,
// } from "@mui/material";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import useSWR from "swr";
// import Image from "next/image";
// import { useUser } from "@/UserContext";

// const steps = ["1", "2", "3", "4"];

// const CreateSpaceReportPage: React.FC = () => {
//   const [isMounted, setIsMounted] = useState(false);
//   const [spaceReports, setSpaceReports] = useState<
//     Array<{
//       missionName: string;
//       missionDescription: string;
//       missionDate: string | null;
//       selectedImages: string[];
//     }>
//   >([]);
//   const [currentReportIndex, setCurrentReportIndex] = useState<
//     number | null
//   >(null);

//   const { user } = useUser();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [missionName, setMissionName] = React.useState("");
//   const [missionDate, setMissionDate] = React.useState("");
//   const [missionDescription, setMissionDescription] =
//     React.useState("");
//   const [errorMessage, setErrorMessage] = React.useState("");
//   const [completed, setCompleted] = React.useState<{
//     [k: number]: boolean;
//   }>({});

//   const fetcher = (url: string) =>
//     fetch(url).then((res) => res.json());

//   const { data, error } = useSWR(
//     activeStep === 1
//       ? "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=DEMO_KEY&sol=15"
//       : null,
//     fetcher
//   );

//   const images = data?.photos || [];

//   const totalSteps = () => {
//     return steps.length;
//   };

//   const completedSteps = () => {
//     return Object.keys(completed).length;
//   };

//   const isLastStep = () => {
//     return activeStep === totalSteps() - 1;
//   };

//   const allStepsCompleted = () => {
//     return completedSteps() === totalSteps();
//   };

//   const handleNext = () => {
//     const newActiveStep =
//       isLastStep() && !allStepsCompleted()
//         ? steps.findIndex((step, i) => !(i in completed))
//         : activeStep + 1;
//     setActiveStep(newActiveStep);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleStep = (step: number) => () => {
//     setActiveStep(step);
//   };

//   const handleComplete = () => {
//     if (currentReportIndex !== null) {
//       // Update existing space report
//       setSpaceReports((prev) =>
//         prev.map((report, index) =>
//           index === currentReportIndex
//             ? {
//                 missionName: missionName,
//                 missionDescription: missionDescription,
//                 missionDate: missionDate,
//                 selectedImages: report.selectedImages,
//               }
//             : report
//         )
//       );
//     } else {
//       // Add new space report
//       setSpaceReports((prev) => [
//         ...prev,
//         {
//           missionName: missionName,
//           missionDescription: missionDescription,
//           missionDate: missionDate,
//           selectedImages: spaceReports.selectedImages,
//         },
//       ]);
//     }

//     // Reset current report index
//     setCurrentReportIndex(null);

//     const newCompleted = completed;
//     newCompleted[activeStep] = true;
//     setCompleted(newCompleted);
//     handleNext();
//   };

//   const handleImageSelect = (imageSrc: string) => {
//     if (spaceReports.selectedImages.includes(imageSrc)) {
//       setSpaceReports((prevSpaceReport) => ({
//         ...prevSpaceReport,
//         selectedImages: prevSpaceReport.selectedImages.filter(
//           (src) => src !== imageSrc
//         ),
//       }));
//     } else if (spaceReports.selectedImages.length < 7) {
//       setSpaceReports((prevSpaceReport) => ({
//         ...prevSpaceReport,
//         selectedImages: [...prevSpaceReport.selectedImages, imageSrc],
//       }));
//     } else {
//       console.log("You can only select a maximum of 7 images.");
//     }
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//     setCompleted({});
//   };

//   useEffect(() => {
//     const savedspaceReports = localStorage.getItem(
//       `spaceReports_${user?.id}`
//     );
//     if (savedspaceReports) {
//       setSpaceReports(JSON.parse(savedspaceReports));
//     }
//   }, [user?.id]);

//   useEffect(() => {
//     localStorage.setItem(
//       `spaceReports_${user?.id}`,
//       JSON.stringify(spaceReports)
//     );
//   }, [spaceReports, user?.id]);

//   useEffect(() => {
//     // Needed to prevent hydration
//     setIsMounted(true);
//   }, []);

//   console.log(spaceReports);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen m-auto">
//       {isMounted && (
//         <Stepper nonLinear activeStep={activeStep}>
//           {steps?.map((label, index) => (
//             <Step key={label} completed={completed[index]}>
//               <StepButton
//                 color="inherit"
//                 onClick={handleStep(index)}
//               />
//             </Step>
//           ))}
//         </Stepper>
//       )}
//       <div>
//         {allStepsCompleted() ? (
//           <>
//             <div className="mt-2 mb-1">
//               All steps completed - you&apos;re finished
//             </div>
//             <div className="flex flex-row pt-2">
//               <div className="flex-auto" />
//               <Button onClick={handleReset}>Reset</Button>
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="py-1 mt-2 mb-1">
//               Step {activeStep + 1}
//             </div>
//             {activeStep === 0 && (
//               <div className="flex items-center gap-4">
//                 <div>
//                   <TextField
//                     label="Mission Name"
//                     error={!!errorMessage && !missionName}
//                     value={missionName}
//                     onChange={(e) => setMissionName(e.target.value)}
//                     fullWidth
//                     required
//                     margin="normal"
//                     color="primary"
//                   />
//                   <TextField
//                     error={!!errorMessage && !missionDescription}
//                     label="Mission Description"
//                     value={missionDescription}
//                     onChange={(e) =>
//                       setMissionDescription(e.target.value)
//                     }
//                     fullWidth
//                     required
//                     multiline
//                     rows={4}
//                     margin="normal"
//                   />
//                 </div>

//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DatePicker
//                     value={dayjs(missionDate)}
//                     onChange={(newValue) =>
//                       setMissionDate(
//                         newValue?.format("YYYY-MM-DD") ?? ""
//                       )
//                     }
//                   />
//                 </LocalizationProvider>
//               </div>
//             )}
//             {activeStep === 1 && (
//               <div className="flex justify-center">
//                 <div className="flex flex-wrap w-[512px] h-[512px] overflow-auto">
//                   {images
//                     .filter(
//                       (image: { img_src: string }) =>
//                         !spaceReports.selectedImages.includes(
//                           image.img_src
//                         )
//                     )
//                     .map(
//                       (
//                         image: { img_src: string; id: string },
//                         index: number
//                       ) => (
//                         <Image
//                           onClick={() =>
//                             handleImageSelect(image.img_src)
//                           }
//                           key={index}
//                           src={image.img_src}
//                           alt={image.id}
//                           width={20}
//                           height={20}
//                           className="w-1/3 p-1"
//                         />
//                       )
//                     )}
//                 </div>
//                 <div className="flex items-center justify-center w-1/2 w-[512px] max-h-[512px] flex-wrap overflow-auto">
//                   {spaceReports.selectedImages &&
//                     spaceReports.selectedImages.map(
//                       (image, index) => (
//                         <Image
//                           key={index}
//                           src={image}
//                           alt={`Selected ${index}`}
//                           width={100}
//                           height={100}
//                           onClick={() => handleImageSelect(image)}
//                           className="w-1/3 p-1"
//                         />
//                       )
//                     )}
//                 </div>
//               </div>
//             )}
//             <div className="flex items-center justify-start">
//               <Button
//                 color="inherit"
//                 disabled={activeStep === 0}
//                 onClick={handleBack}
//                 className="mr-1"
//               >
//                 Back
//               </Button>
//               <div className="flex-auto" />
//               {activeStep !== steps.length &&
//                 (completed[activeStep] ? (
//                   <div className="inline-block">
//                     Step {activeStep + 1} already completed
//                   </div>
//                 ) : (
//                   <Button onClick={handleComplete}>
//                     {completedSteps() === totalSteps() - 1
//                       ? "Finish"
//                       : "Complete Step"}
//                   </Button>
//                 ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CreateSpaceReportPage;
