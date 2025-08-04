"use client";
import {
  Box,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  StepLabel,
  Stepper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

// Step labels
const steps = ["Personal", "Education", "Skills"];

type VerticalStepperProps = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

// Custom black connector line, aligned to outer ring
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.vertical}`]: {
    marginLeft: 20, // align with outer ring
  },
  [`& .${stepConnectorClasses.line}`]: {
    minHeight: 60,
    borderLeftWidth: 3,
    borderColor: "#000", // black line
  },
}));

// Custom step icon with matching ring + circle
function StepIconComponent(props: StepIconProps) {
  const { active, completed, icon } = props;

  let color = "#BDBDBD"; // default gray
  if (completed) color = "#4CAF50"; // green
  else if (active) color = "#1E88E5"; // blue

  return (
    <div
      style={{
        position: "relative",
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer ring: same color as circle */}
      <div
        style={{
          position: "absolute",
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: `1px solid ${color}`,
          // boxSizing: "border-box",
        }}
      />
      {/* Inner circle */}
      <div
        style={{
          backgroundColor: color,
          color: "white",
          width: 30,
          height: 30,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: 14,
          zIndex: 1,
        }}
      >
        {icon}
      </div>
    </div>
  );
}

// Main component
export default function VerticalStepper({
  activeStep,
  setActiveStep,
}: VerticalStepperProps) {
  return (
    <Box
      sx={{
        width: "220px",
        borderRadius: "12px",
        padding: "24px 16px",
      }}
    >
      <Stepper
        orientation="vertical"
        activeStep={activeStep}
        connector={<CustomConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={activeStep > index}>
            <StepLabel
              StepIconComponent={StepIconComponent}
              sx={{
                "&.MuiStepLabel-root": { padding: 0 },
                "& .MuiStepLabel-label": {
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#444",
                },
                "& .Mui-active .MuiStepLabel-label": {
                  color: "#1E88E5",
                },
                "& .Mui-completed .MuiStepLabel-label": {
                  color: "#4CAF50",
                },
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
