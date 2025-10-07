"use client";

import {
  Award,
  BookOpen,
  Calendar,
  Clock,
  Edit2,
  FileText,
  Github,
  Globe,
  Languages,
  Linkedin,
  Mail,
  MapPin,
  Phone
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  // Static profile data
  const profilePhoto: File | null = null;
  const firstName = "Selva";
  const lastName = "Praveen";
  const mobile = "+91 9876543210";
  const email = "selva@example.com";
  const dob = "2000-01-01";
  const gender = "Male";
  const language = "English, Tamil";
  const country = "India";

  const college = "XYZ Engineering College";
  const qualification = "B.Tech";
  const specialization = "Computer Science";
  const passingYear = "2022";
  const cgpa = "8.5 CGPA";
  const tenth = "90%";
  const twelfth = "85%";

  const github = "https://github.com/selvapraveen";
  const linkedin = "https://linkedin.com/in/selvapraveen";
  const portfolio = "https://selvapraveen.vercel.app";
  const skills = "Next.js, React, Tailwind CSS, Express, MySQL";

  const resumeFile: File | null = null;
  const fullName = `${firstName} ${lastName}`.trim();
  const resumeUrl = resumeFile ? URL.createObjectURL(resumeFile) : null;

  const skillsArray = skills.split(",").map((s) => s.trim());

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="bg-gray-100 rounded-2xl shadow-sm border border-gray-300 overflow-hidden mb-6">
          <div className="h-32 bg-indigo-600"></div>
          <div className="px-6 md:px-10 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 gap-6">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl bg-white border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                    {profilePhoto ? (
                      <img
                        src={URL.createObjectURL(profilePhoto)}
                        alt={fullName}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                        <span className="text-4xl font-bold text-slate-400">
                          {firstName[0]}
                          {lastName[0]}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pb-2">
                  <h1 className="text-3xl font-bold text-white mb-1">
                    {fullName}
                  </h1>
                  <p className="text-lg text-slate-600 mb-3">
                    {qualification} in {specialization}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-2">
                      <Mail className="w-4 h-4" /> {email}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Phone className="w-4 h-4" /> {mobile}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {country}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push("/candidateOnBoarding")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium shadow-sm transition-colors"
                >
                  <Edit2 className="w-4 h-4" /> Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Personal Info */}
            <div className="bg-gray-100 rounded-2xl shadow-sm border border-gray-300 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                </div>
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    Date of Birth
                  </div>
                  <div className="text-sm text-slate-900">{dob}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    Gender
                  </div>
                  <div className="text-sm text-slate-900">{gender}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    Languages
                  </div>
                  <div className="text-sm text-slate-900 flex items-center gap-2">
                    <Languages className="w-4 h-4 text-slate-400" />
                    {language}
                  </div>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="bg-gray-100 rounded-2xl shadow-sm border border-gray-300 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-indigo-600" />
                </div>
                Social Links
              </h2>
              <div className="space-y-3">
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-300 hover:border-indigo-300 hover:bg-indigo-50 transition-all group bg-white"
                  >
                    <Github className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                      GitHub Profile
                    </span>
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-300 hover:border-indigo-300 hover:bg-indigo-50 transition-all group bg-white"
                  >
                    <Linkedin className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                      LinkedIn Profile
                    </span>
                  </a>
                )}
                {portfolio && (
                  <a
                    href={portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-300 hover:border-indigo-300 hover:bg-indigo-50 transition-all group bg-white"
                  >
                    <Globe className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                      Portfolio Website
                    </span>
                  </a>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-gray-100 rounded-2xl shadow-sm border border-gray-300 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <a
                  href={resumeUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    resumeUrl
                      ? "border-indigo-300 bg-indigo-50 hover:bg-indigo-100"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <FileText
                    className={`w-5 h-5 ${resumeUrl ? "text-indigo-600" : "text-slate-400"}`}
                  />
                  <span
                    className={`text-sm font-medium ${resumeUrl ? "text-indigo-900" : "text-slate-500"}`}
                  >
                    {resumeUrl ? "View Resume" : "No Resume Uploaded"}
                  </span>
                </a>

                <button
                  onClick={() => alert("Show interview history (implement)")}
                  className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-gray-300 hover:border-indigo-300 hover:bg-indigo-50 transition-all bg-white"
                >
                  <Clock className="w-5 h-5 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">
                    Interview History
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Education */}
            <div className="bg-gray-100 rounded-2xl shadow-sm border border-gray-300 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                </div>
                Education
              </h2>

              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-indigo-200">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-indigo-600"></div>
                  <div className="mb-1 text-sm font-semibold text-indigo-600">
                    {passingYear}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {qualification}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">{college}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Award className="w-4 h-4 text-slate-400" />
                    <span className="font-medium">{specialization}</span>
                    <span className="text-slate-400">•</span>
                    <span>{cgpa}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="p-4 rounded-xl bg-slate-50">
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                      10th Standard
                    </div>
                    <div className="text-2xl font-bold text-slate-900">
                      {tenth}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50">
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                      12th Standard
                    </div>
                    <div className="text-2xl font-bold text-slate-900">
                      {twelfth}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-gray-100 rounded-2xl shadow-sm border border-gray-300 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Award className="w-4 h-4 text-indigo-600" />
                </div>
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {skillsArray.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium border-2 border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
