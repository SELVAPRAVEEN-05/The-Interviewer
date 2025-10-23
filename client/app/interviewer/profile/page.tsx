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
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getRequest } from "@/utils/axios/axios";
import { URL } from "@/utils/axios/endPoint";

interface Country {
  id: number;
  name: string;
  iso_code: string;
}

interface Gender {
  id: number;
  value: string;
}

interface Language {
  id: number;
  name: string;
  iso_code: string;
}

interface Skill {
  id: number;
  name: string;
  category: string;
}

interface UserSkill {
  id: string;
  skillId: number;
  proficiency: string | null;
  years_of_experience: number | null;
  skill: Skill;
}

interface EducationLevel {
  id: number;
  level_name: string;
}

interface Institute {
  id: number;
  name: string;
  city: string;
  state: string;
  email: string;
  countryId: number;
}

interface EducationDetail {
  id: string;
  educationLevelId: number;
  instituteId: number | null;
  specialization: string | null;
  board_or_university: string | null;
  marks_obtained: string | null;
  max_marks: string | null;
  year_of_passing: number | null;
  educationLevel: EducationLevel;
  institute: Institute | null;
}

interface ProfileData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_url: string | null;
  mobile_number: string;
  role: string;
  country: Country;
  gender: Gender;
  github_url: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  language: Language;
  resume_url: string | null;
  profile_picture_url: string | null;
  created_at: string;
  educationDetails: EducationDetail[];
  userSkills: UserSkill[];
  userPositions: any[];
}

export default function InterviewerProfile() {
  const router = useRouter();
  const store = useFormStore();

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("authToken")
            : null;

        const response: any = await getRequest(
          URL.USER_PROFILE || "api/user/profile",
          {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
          }
        );

        const data = response.data || response;
        setProfileData(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Profile not found"}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const fullName = `${profileData.first_name} ${profileData.last_name}`.trim();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5001/";
  const profilePictureUrl = profileData.profile_picture_url
    ? `${baseUrl}${profileData.profile_picture_url.replace(/\\/g, "/")}`
    : null;
  const resumeUrl = profileData.resume_url
    ? `${baseUrl}${profileData.resume_url.replace(/\\/g, "/")}`
    : null;

  const mobile = profileData.mobile_number;
  const email = profileData.email;
  const gender = profileData.gender.value;
  const language = profileData.language.name;
  const country = profileData.country.name;

  const github = profileData.github_url;
  const linkedin = profileData.linkedin_url;
  const portfolio = profileData.portfolio_url;

  // For interviewer, we might not have these fields yet
  const positionLabel = "Interviewer";
  const companyLabel = "The Interviewer Platform";
  const department = "Interview Panel";

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
                    {profilePictureUrl ? (
                      <img
                        src={profilePictureUrl}
                        alt={fullName}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                        <span className="text-4xl font-bold text-slate-400">
                          {profileData.first_name[0]}
                          {profileData.last_name[0]}
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
                    Created At
                  </div>
                  <div className="text-sm text-slate-900">
                    {new Date(profileData.created_at).toLocaleDateString()}
                  </div>
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
              {/* Skills placeholder */}
              <div className="bg-gray-100 rounded-2xl shadow-sm border border-gray-300 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Award className="w-4 h-4 text-indigo-600" />
                  </div>
                  Skills & Experience
                </h2>
                {profileData.userSkills && profileData.userSkills.length > 0 ? (
                  <div className="space-y-3">
                    {profileData.userSkills.map((userSkill) => (
                      <div
                        key={userSkill.id}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                      >
                        <div>
                          <p className="font-medium text-slate-900">
                            {userSkill.skill.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {userSkill.skill.category}
                          </p>
                        </div>
                        {userSkill.proficiency && (
                          <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                            {userSkill.proficiency}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-700">
                    No skills added yet. Update your profile to add skills.
                  </p>
                )}
              </div>

              {/* Education Details */}
              {profileData.educationDetails &&
                profileData.educationDetails.length > 0 && (
                  <div className="bg-gray-100 rounded-2xl shadow-sm border border-gray-300 p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                      </div>
                      Education
                    </h2>
                    <div className="space-y-4">
                      {profileData.educationDetails.map((edu) => (
                        <div
                          key={edu.id}
                          className="p-4 bg-white rounded-lg border border-gray-200"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-slate-900">
                                {edu.educationLevel.level_name}
                              </h3>
                              {edu.institute && (
                                <p className="text-sm text-slate-600">
                                  {edu.institute.name}
                                </p>
                              )}
                            </div>
                            {edu.year_of_passing && (
                              <span className="text-xs font-medium text-slate-500">
                                {edu.year_of_passing}
                              </span>
                            )}
                          </div>
                          {edu.specialization && (
                            <p className="text-sm text-slate-600 mb-1">
                              Specialization: {edu.specialization}
                            </p>
                          )}
                          {edu.marks_obtained && edu.max_marks && (
                            <p className="text-sm text-slate-600">
                              Marks: {edu.marks_obtained}/{edu.max_marks}
                            </p>
                          )}
                          {edu.institute && (
                            <p className="text-xs text-slate-500 mt-2">
                              {edu.institute.city}, {edu.institute.state}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
