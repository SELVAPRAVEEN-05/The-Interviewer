"use client";

import {
  Box,
  Step,
  StepLabel,
  Stepper,
  StepConnector,
  stepConnectorClasses,
} from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";

type VerticalStepperProps = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

// const CustomConnector = styled(StepConnector)(() => ({
//   [`& .${stepConnectorClasses.line}`]: {
//     height: "20%",
//     borderLeftWidth: 2,
//   },
// }));

const steps = ["Personal", "Education", "Skills"];

export default function VerticalStepper({
  activeStep,
  setActiveStep,
}: VerticalStepperProps) {
  return (
    <Box>
      <Stepper
        activeStep={activeStep}
        // connector={<CustomConnector />}
        orientation="vertical"
        sx={{
          backgroundColor: "transparent",
          padding: 2,
          borderRadius: 2,
        }}
      >
        {steps.map((label) => (
          <Step
            key={label}
            sx={{
              mb: 1,
            }}
          >
            <StepLabel
              sx={{
                fontSize: "14px",
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
