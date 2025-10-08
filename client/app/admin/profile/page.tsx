"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import {
  ArrowLeft,
  Bell,
  Calendar,
  Edit,
  Eye,
  EyeOff,
  Key,
  LogOut,
  Mail,
  Phone,
  Save,
  Shield,
  User,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

type AdminData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  joinDate: string;
  lastLogin: string;
};

type PasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type Settings = {
  emailNotifications: boolean;
  smsNotifications: boolean;
  interviewReminders: boolean;
  weeklyReports: boolean;
  systemAlerts: boolean;
};

// ------------------------- Mock API & Utilities -----------------------

// Simulate network latency
const delay = (ms = 600) => new Promise((res) => setTimeout(res, ms));

// Mock "server" admin data stored in-memory for this demo
let MOCK_ADMIN_DB: AdminData = {
  id: "ADM001",
  name: "Dark Devil",
  email: "admin@codemeet.com",
  phone: "+91 98765 43210",
  role: "Super Admin",
  department: "IT Administration",
  joinDate: "2023-01-15",
  lastLogin: "2024-08-24 10:30 AM",
};

// Mock settings store
let MOCK_SETTINGS_DB: Settings = {
  emailNotifications: true,
  smsNotifications: false,
  interviewReminders: true,
  weeklyReports: true,
  systemAlerts: true,
};

async function apiFetchAdmin(): Promise<AdminData> {
  await delay(400);
  // return a copy to avoid mutation
  return { ...MOCK_ADMIN_DB };
}

async function apiUpdateAdmin(updated: Partial<AdminData>): Promise<AdminData> {
  await delay(500);
  MOCK_ADMIN_DB = { ...MOCK_ADMIN_DB, ...updated };
  return { ...MOCK_ADMIN_DB };
}

async function apiChangePassword(
  payload: PasswordPayload
): Promise<{ success: boolean; message?: string }> {
  await delay(500);
  // extremely simplified: "current password" must be "password123" for demo
  if (payload.currentPassword !== "password123") {
    return { success: false, message: "Current password is incorrect." };
  }
  // update would happen here; we just return success
  return { success: true };
}

async function apiFetchSettings(): Promise<Settings> {
  await delay(300);
  return { ...MOCK_SETTINGS_DB };
}

async function apiUpdateSettings(s: Settings): Promise<Settings> {
  await delay(350);
  MOCK_SETTINGS_DB = { ...s };
  return { ...MOCK_SETTINGS_DB };
}

// ------------------------- Validation Helpers ------------------------

const validators = {
  required: (v: string) =>
    v && v.trim().length > 0 ? null : "This field is required",
  email: (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Invalid email address",
  phone: (v: string) =>
    /^\+?[0-9\s-]{7,15}$/.test(v) ? null : "Invalid phone number",
  passwordStrength: (v: string) => {
    if (v.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(v)) return "Password should include an uppercase letter";
    if (!/[a-z]/.test(v)) return "Password should include a lowercase letter";
    if (!/[0-9]/.test(v)) return "Password should include a number";
    if (!/[^A-Za-z0-9]/.test(v))
      return "Password should include a special character";
    return null;
  },
};

// small helper to run a set of validators
function runValidators(
  value: string,
  fns: Array<(v: string) => string | null>
) {
  for (const fn of fns) {
    const res = fn(value);
    if (res) return res;
  }
  return null;
}

// --------------------------- Small UI Bits ---------------------------

function FieldLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {children}
    </label>
  );
}

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
      {children}
    </div>
  );
}

function InlineError({ message }: { message?: string | null }) {
  if (!message) return null;
  return <p className="text-xs text-red-600 mt-1">{message}</p>;
}

// --------------------------- Main Component --------------------------

const AdminProfilePage: React.FC = () => {
  // Editing state
  const [isEditing, setIsEditing] = useState(false);

  // Visibility toggles in password modal
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // HeroUI modals
  const {
    isOpen: isPasswordOpen,
    onOpen: onPasswordOpen,
    onOpenChange: onPasswordOpenChange,
  } = useDisclosure();

  const {
    isOpen: isSettingsOpen,
    onOpen: onSettingsOpen,
    onOpenChange: onSettingsOpenChange,
  } = useDisclosure();

  // Data
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [editData, setEditData] = useState<AdminData | null>(null);

  // password form
  const [passwordData, setPasswordData] = useState<PasswordPayload>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // settings
  const [settings, setSettings] = useState<Settings | null>(null);

  // loading & status
  const [loading, setLoading] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);

  // validation messages for profile fields
  const [profileErrors, setProfileErrors] = useState<
    Record<string, string | null>
  >({});

  // validation messages for password
  const [passwordErrors, setPasswordErrors] = useState<
    Record<string, string | null>
  >({});

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const [a, s] = await Promise.all([apiFetchAdmin(), apiFetchSettings()]);
        if (!mounted) return;
        setAdminData(a);
        setEditData(a);
        setSettings(s);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Derived state: whether edits differ
  const hasProfileChanges = useMemo(() => {
    if (!adminData || !editData) return false;
    return (
      adminData.name !== editData.name ||
      adminData.email !== editData.email ||
      adminData.phone !== editData.phone ||
      adminData.department !== editData.department
    );
  }, [adminData, editData]);

  // ------------------ Handlers --------------------------------

  function validateProfile(data: AdminData) {
    const errs: Record<string, string | null> = {};
    errs.name = runValidators(data.name, [validators.required]);
    errs.email = runValidators(data.email, [
      validators.required,
      validators.email,
    ]);
    errs.phone = runValidators(data.phone, [
      validators.required,
      validators.phone,
    ]);
    errs.department = runValidators(data.department, [validators.required]);
    return errs;
  }

  async function handleSaveProfile() {
    if (!editData) return;
    const errs = validateProfile(editData);
    setProfileErrors(errs);
    const hasError = Object.values(errs).some(Boolean);
    if (hasError) return;

    setSavingProfile(true);
    try {
      const updated = await apiUpdateAdmin({
        name: editData.name,
        email: editData.email,
        phone: editData.phone,
        department: editData.department,
      });
      setAdminData(updated);
      setEditData(updated);
      setIsEditing(false);
      // toast / notification
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save profile");
    } finally {
      setSavingProfile(false);
    }
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setEditData(adminData);
    setProfileErrors({});
  }

  function handleChangePasswordLocal(
    field: keyof PasswordPayload,
    value: string
  ) {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  }

  function validatePasswordForm(): Record<string, string | null> {
    const errs: Record<string, string | null> = {};
    errs.currentPassword = runValidators(passwordData.currentPassword, [
      validators.required,
    ]);
    errs.newPassword = runValidators(passwordData.newPassword, [
      validators.required,
      validators.passwordStrength,
    ]);
    errs.confirmPassword = runValidators(passwordData.confirmPassword, [
      validators.required,
    ]);
    if (
      !errs.confirmPassword &&
      passwordData.newPassword !== passwordData.confirmPassword
    ) {
      errs.confirmPassword = "Passwords do not match";
    }
    return errs;
  }

  async function handleChangePassword(onClose: () => void) {
    const errs = validatePasswordForm();
    setPasswordErrors(errs);
    if (Object.values(errs).some(Boolean)) return;

    setChangingPassword(true);
    try {
      const res = await apiChangePassword(passwordData);
      if (!res.success) {
        setPasswordErrors((prev) => ({
          ...prev,
          currentPassword: res.message || "Current password incorrect",
        }));
        return;
      }
      alert("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to change password");
    } finally {
      setChangingPassword(false);
    }
  }

  async function handleSaveSettings(onClose: () => void) {
    if (!settings) return;
    setSavingSettings(true);
    try {
      const updated = await apiUpdateSettings(settings);
      setSettings(updated);
      alert("Settings saved");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save settings");
    } finally {
      setSavingSettings(false);
    }
  }

  function handleSettingsChange(setting: keyof Settings, value: boolean) {
    setSettings((prev) => (prev ? { ...prev, [setting]: value } : prev));
  }

  function handleLogout() {
    if (
      typeof window !== "undefined" &&
      window.confirm("Are you sure you want to logout?")
    ) {
      // clear tokens and redirect in real app
      alert("Logged out (demo)");
    }
  }

  // ------------------ Render Helpers ---------------------------

  if (loading || !adminData || !editData || !settings) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-pulse text-lg text-gray-600">
            Loading profile...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="bg-gray-100 border border-gray-300 shadow px-6 py-4 rounded-lg mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-gray-100 border-gray-300 rounded-lg shadow-sm border  overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b flex items-center gap-6">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {adminData.name}
            </h2>
            <p className="text-gray-600 text-lg">{adminData.role}</p>
            <p className="text-sm text-gray-500 mt-1">
              Last login: {adminData.lastLogin}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={!hasProfileChanges || savingProfile}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingProfile ? "Saving..." : "Save"}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Personal Information Form */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
              {isEditing ? (
                <>
                  <input
                    id="fullName"
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <InlineError message={profileErrors.name} />
                </>
              ) : (
                <div className="flex items-center space-x-2 text-gray-900 py-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{adminData.name}</span>
                </div>
              )}
            </div>

            <div>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              {isEditing ? (
                <>
                  <input
                    id="email"
                    type="email"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <InlineError message={profileErrors.email} />
                </>
              ) : (
                <div className="flex items-center space-x-2 text-gray-900 py-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{adminData.email}</span>
                </div>
              )}
            </div>

            <div>
              <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
              {isEditing ? (
                <>
                  <input
                    id="phone"
                    type="tel"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <InlineError message={profileErrors.phone} />
                </>
              ) : (
                <div className="flex items-center space-x-2 text-gray-900 py-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{adminData.phone}</span>
                </div>
              )}
            </div>

            <div>
              <FieldLabel htmlFor="department">Department</FieldLabel>
              {isEditing ? (
                <>
                  <input
                    id="department"
                    type="text"
                    value={editData.department}
                    onChange={(e) =>
                      setEditData({ ...editData, department: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <InlineError message={profileErrors.department} />
                </>
              ) : (
                <div className="flex items-center space-x-2 text-gray-900 py-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span>{adminData.department}</span>
                </div>
              )}
            </div>

            <div>
              <FieldLabel>Role</FieldLabel>
              <div className="flex items-center space-x-2 text-gray-900 py-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <span>{adminData.role}</span>
              </div>
            </div>

            <div>
              <FieldLabel>Join Date</FieldLabel>
              <div className="flex items-center space-x-2 text-gray-900 py-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{adminData.joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Actions */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Security & Settings
          </h3>
          <div className="flex gap-4">
            <button
              onClick={onPasswordOpen}
              className="w-full flex justify-between items-center bg-gray-200 rounded-xl shadow-sm border border-gray-300 p-6 hover:shadow-md transition-all hover:border-gray-500 text-left group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-200 rounded-lg">
                  <Key className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-gray-900">Change Password</h4>
                  <p className="text-sm text-gray-500">
                    Update your account password
                  </p>
                </div>
              </div>
              <ArrowLeft className="w-5 h-5 rotate-180 text-gray-400 group-hover:text-gray-600" />
            </button>

            <button
              onClick={onSettingsOpen}
              className="w-full flex justify-between items-center bg-gray-200 rounded-xl shadow-sm border border-gray-300 p-6 hover:shadow-md transition-all hover:border-gray-500 text-left group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-200 rounded-lg">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-gray-900">
                    Notification Settings
                  </h4>
                  <p className="text-sm text-gray-500">
                    Manage your notification preferences
                  </p>
                </div>
              </div>
              <ArrowLeft className="w-5 h-5 rotate-180 text-gray-400 group-hover:text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- Password Modal (HeroUI) ------------------ */}
      <Modal isOpen={isPasswordOpen} onOpenChange={onPasswordOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-2">
                <Key className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Change Password</span>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div>
                    <FieldLabel htmlFor="currentPwd">
                      Current Password
                    </FieldLabel>
                    <div className="relative">
                      <input
                        id="currentPwd"
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          handleChangePasswordLocal(
                            "currentPassword",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg"
                      />
                      <button
                        type="button"
                        aria-label="toggle current password visibility"
                        onClick={() => setShowCurrentPassword((s) => !s)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <InlineError message={passwordErrors.currentPassword} />
                  </div>

                  <div>
                    <FieldLabel htmlFor="newPwd">New Password</FieldLabel>
                    <div className="relative">
                      <input
                        id="newPwd"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          handleChangePasswordLocal(
                            "newPassword",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg"
                      />
                      <button
                        type="button"
                        aria-label="toggle new password visibility"
                        onClick={() => setShowNewPassword((s) => !s)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <InlineError message={passwordErrors.newPassword} />
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-2">
                      <h4 className="text-sm font-medium text-yellow-800 mb-1">
                        Password Requirements:
                      </h4>
                      <ul className="text-xs text-yellow-700 space-y-1">
                        <li>• At least 6 characters long</li>
                        <li>• Include uppercase and lowercase letters</li>
                        <li>• Include at least one number</li>
                        <li>• Include at least one special character</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <FieldLabel htmlFor="confirmPwd">
                      Confirm New Password
                    </FieldLabel>
                    <div className="relative">
                      <input
                        id="confirmPwd"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          handleChangePasswordLocal(
                            "confirmPassword",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg"
                      />
                      <button
                        type="button"
                        aria-label="toggle confirm password visibility"
                        onClick={() => setShowConfirmPassword((s) => !s)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <InlineError message={passwordErrors.confirmPassword} />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleChangePassword(onClose)}
                  disabled={changingPassword}
                >
                  {changingPassword ? "Updating..." : "Update Password"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* ---------------- Notification Settings Modal ------------------ */}
      <Modal isOpen={isSettingsOpen} onOpenChange={onSettingsOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Notification Settings</span>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  <SettingToggle
                    label="Email Notifications"
                    description="Receive notifications via email"
                    checked={!!settings.emailNotifications}
                    onChange={(v) =>
                      handleSettingsChange("emailNotifications", v)
                    }
                  />

                  <SettingToggle
                    label="SMS Notifications"
                    description="Receive notifications via SMS"
                    checked={!!settings.smsNotifications}
                    onChange={(v) =>
                      handleSettingsChange("smsNotifications", v)
                    }
                  />

                  <SettingToggle
                    label="Interview Reminders"
                    description="Get reminded about upcoming interviews"
                    checked={!!settings.interviewReminders}
                    onChange={(v) =>
                      handleSettingsChange("interviewReminders", v)
                    }
                  />

                  <SettingToggle
                    label="Weekly Reports"
                    description="Receive weekly summary reports"
                    checked={!!settings.weeklyReports}
                    onChange={(v) => handleSettingsChange("weeklyReports", v)}
                  />

                  <SettingToggle
                    label="System Alerts"
                    description="Important system notifications and updates"
                    checked={!!settings.systemAlerts}
                    onChange={(v) => handleSettingsChange("systemAlerts", v)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleSaveSettings(onClose)}
                  disabled={savingSettings}
                >
                  {savingSettings ? "Saving..." : "Save Settings"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminProfilePage;

// ----------------- Additional small components -----------------------

function SettingToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <div className="font-medium text-gray-900">{label}</div>
        {description ? (
          <div className="text-xs text-gray-500">{description}</div>
        ) : null}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}
