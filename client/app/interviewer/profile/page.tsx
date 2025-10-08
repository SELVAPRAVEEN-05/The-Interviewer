"use client";

import { useFormStore } from "@/components/store/onBoarding/index";
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
  Phone,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function InterviewerProfile() {
  const router = useRouter();
  const store = useFormStore();

  const firstName = store.first_name || store.firstName || "Ram";
  const lastName = store.last_name || store.lastName || "Doe";
  const fullName = `${firstName} ${lastName}`.trim();
  const mobile = store.phone || store.mobile || "+9080619540";
  const email =
    store.email || store.interviewerEmail || "ram.doqe23@example.com";
  const dob = store.dob_iso || store.dob || "1990-01-15";
  const gender = store.genderId
    ? store.genderId === 1
      ? "Male"
      : "Other"
    : store.gender || "Male";
  const language = store.languageId ? "English" : store.language || "English";
  const country = store.countryId ? "India" : store.country || "India";

  const positionLabel = store.position || "Product";
  const companyLabel = store.company || "Google";
  const department = store.department || "Human Resource";

  const github = store.github_url || "https://github.com/SELVAPRAVEEN-05";
  const linkedin =
    store.linkedin_url || "https://www.linkedin.com/in/selvapraveen-s-bit/";
  const portfolio = store.portfolio_url || "https://selva-33.vercel.app/";

  const resumeFile = store.resumeFile ?? null;
  const resumeUrl = store.resume_url || null;

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
                    {store.profile_picture_url ? (
                      <img
                        src={store.profile_picture_url}
                        alt={fullName}
                        className="object-cover w-full h-full"
                      />
                    ) : store.profilePhoto ? (
                      <img
                        src={URL.createObjectURL(store.profilePhoto)}
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
                    {positionLabel} at {companyLabel}
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
                  onClick={() => router.push("/interviewerOnBoarding")}
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
                    <Languages className="w-4 h-4 text-slate-400" /> {language}
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
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${resumeUrl ? "border-indigo-300 bg-indigo-50 hover:bg-indigo-100" : "border-gray-300 bg-white"}`}
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
            {/* Professional Card */}
            <div className="bg-gray-100 rounded-2xl shadow-sm border border-gray-300 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                </div>
                Professional
              </h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                  <div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                      Position
                    </div>
                    <div className="text-sm text-slate-900">
                      {positionLabel}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                      Company
                    </div>
                    <div className="text-sm text-slate-900">{companyLabel}</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    Department
                  </div>
                  <div className="text-sm text-slate-900">{department}</div>
                </div>
              </div>
            </div>

            {/* Skills placeholder */}
            <div className="bg-gray-100 rounded-2xl shadow-sm border border-gray-300 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Award className="w-4 h-4 text-indigo-600" />
                </div>
                Skills & Experience
              </h2>
              <p className="text-sm text-slate-700">
                Add skills and experience fields in interviewer profile as
                needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
