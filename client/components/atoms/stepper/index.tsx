"use client";

import * as React from "react";
import Stepper from "@mui/joy/Stepper";
import Step, { stepClasses } from "@mui/joy/Step";
import StepIndicator, { stepIndicatorClasses } from "@mui/joy/StepIndicator";
import Typography, { typographyClasses } from "@mui/joy/Typography";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

interface StepItem {
  title: string;
  label: string;
  completed?: boolean;
  active?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface CompanyRegistrationStepperProps {
  steps: StepItem[];
}

export default function StepperAtom({
  steps,
}: CompanyRegistrationStepperProps) {
//   const steps = [
//     {
//       title: "Step 1",
//       label: "Basic Details",
//       completed: true,
//       icon: <CheckRoundedIcon />,
//     },
//     {
//       title: "Step 2",
//       label: "Company Details",
//       completed: true,
//       icon: <CheckRoundedIcon />,
//     },
//     {
//       title: "Step 3",
//       label: "Subscription plan",
//       active: true,
//       icon: <AppRegistrationRoundedIcon />,
//     },
//     {
//       title: "Step 4",
//       label: "Payment details",
//       disabled: true,
//     },
//   ];

  return (
    <Stepper
      orientation="vertical"
      sx={(theme) => ({
        "--Stepper-verticalGap": "2.5rem",
        "--StepIndicator-size": "2.5rem",
        "--Step-gap": "1rem",
        "--Step-connectorInset": "0.5rem",
        "--Step-connectorRadius": "1rem",
        "--Step-connectorThickness": "4px",
        "--joy-palette-success-solidBg": "var(--joy-palette-success-400)",
        [`& .${stepClasses.completed}`]: {
          "&::after": { bgcolor: "success.solidBg" },
        },
        [`& .${stepClasses.active}`]: {
          [`& .${stepIndicatorClasses.root}`]: {
            border: "4px solid",
            borderColor: "#fff",
            boxShadow: `0 0 0 1px ${theme.vars.palette.primary[500]}`,
          },
        },
        [`& .${stepClasses.disabled} *`]: {
          color: "neutral.softDisabledColor",
        },
        [`& .${typographyClasses["title-sm"]}`]: {
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontSize: "10px",
        },
      })}
    >
      {steps.map((step, index) => (
        <Step
          key={index}
          completed={step.completed}
          active={step.active}
          disabled={step.disabled}
          indicator={
            <StepIndicator
              variant="solid"
              color={
                step.completed ? "success" : step.active ? "primary" : "neutral"
              }
            >
              {step.icon || (step.completed ? <CheckRoundedIcon /> : index + 1)}
            </StepIndicator>
          }
        >
          <div>
            <Typography level="title-sm">{step.title}</Typography>
            {step.label}
          </div>
        </Step>
      ))}
    </Stepper>
  );
}
