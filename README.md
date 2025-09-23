# 💻 Code-Meet – Real-Time Coding Interview Platform

![License](https://img.shields.io/badge/License-MIT-green)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-13+-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-blue?logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue?logo=prisma)
![Database](https://img.shields.io/badge/Database-MySQL%2FPostgreSQL-orange)
![Deployed](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)

Code-Meet is a **real-time coding interview platform** that combines **video calls, coding tests, and interview management** into a single system.  
It is designed for companies, HR teams, and developers to streamline the technical interview process.

---

## 📌 Project Overview

This project provides a unified platform for conducting interviews where:

- **Admins** approve users, oversee activities, and manage resources.
- **Interviewers** (HR or Senior Leads) schedule sessions, evaluate coding tasks, and provide feedback.
- **Candidates** attend interviews, solve coding problems in a live environment, and receive evaluations.

This structure mirrors a real company setup:
- **Admins → CEO/HR/Manager**
- **Interviewers → Senior Leads**
- **Candidates → Applicants**

---

## 🔑 Key Features

- **🔐 Role-Based Login** → Admin, Interviewer, Candidate.
- **✅ Approval Workflow** → Admin approves/rejects users before they access the platform.
- **📅 Smart Scheduling** → Match candidates with interviewers using an availability matrix.
- **🖥️ Real-Time Coding Environment** → Live compiler and code editor.
- **🎥 Video/Audio Calls** → Face-to-face remote interviews.
- **📊 Auto & Manual Evaluation** → Combine automated coding results with interviewer feedback.
- **📈 Result Dashboard** → Weighted scores and performance summary.

---

## 🧠 Algorithm (Logical Flow)

```text
Login & Role Detection: Input → Role {Admin, Interviewer, Candidate}
Approval: Admin decides → P(User) = Approved / Rejected
Scheduling: M(Candidate, Interviewer) → Slot based on availability matrix
Coding Test: Candidate attempts Q = {q1, q2, q3} → Evaluated automatically
Interview Feedback: Interviewer adds technical + behavioral scores
Final Result: Result = Weighted(AutoEval, Feedback)
