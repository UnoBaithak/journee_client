const steps = [
  { title: "Basic Info", subtitle: "Travel details" },
  { title: "Documents", subtitle: "Upload passport" },
  { title: "Travel Form Details", subtitle: "Forms and Info" },
];

import {
  Globe2Icon,
  FileTextIcon,
  ChevronRight,
  ChevronDown,
  BriefcaseIcon,
  CalendarIcon,
  MapPinIcon,
  GlobeIcon,
} from "lucide-react";
import { useState } from "react";

export const VisaModalContent = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(0);
  const [basicInfo, setBasicInfo] = useState<any>({});

  return (
    <div className="bg-white w-full max-w-5xl h-[700px] shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row border border-slate-200">
      {/* Sidebar Stepper */}
      <aside className="w-full md:w-72 bg-teal-50 border-r p-8 flex flex-col">
        <div className="mb-10 flex items-center gap-3">
          <div>
            <Globe2Icon className="size-8 text-teal-600" />
          </div>
          <h2 className="text-xl font-bold text-teal-700 tracking-tight">
            Journee
          </h2>
        </div>
        <nav className="flex-1">
          <ul className="space-y-6">
            {steps.map((s, idx) => (
              <li key={s.title} className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-200 ${
                    step === idx
                      ? "bg-teal-600 text-white"
                      : "bg-teal-100 text-teal-400"
                  }`}
                >
                  {idx + 1}
                </div>
                <div>
                  <p
                    className={`text-sm ${step === idx ? "font-semibold text-teal-700" : "font-medium text-teal-600/80"}`}
                  >
                    {s.title}
                  </p>
                  <p className="text-xs text-black-400">{s.subtitle}</p>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <header className="p-8 border-b">
          <h1 className="text-2xl font-bold text-teal-800 mb-2">
            Visa Application
          </h1>
          <p className="text-black-500">
            {step === 0 &&
              "Step 1: Provide your travel details and trip purpose to begin your application."}
            {step === 1 &&
              "Step 2: Upload your passport and required documents."}
            {step === 2 &&
              "Step 3: Review and complete your travel form details required for the government portal."}{" "}
          </p>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {step === 0 && (
            <form className="space-y-8 max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Origin Country */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-teal-700">
                    Origin Country
                  </label>
                  <div className="relative">
                    <GlobeIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400 w-5 h-5" />
                    <select className="w-full pl-10 pr-4 py-2.5 bg-white border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all appearance-none text-teal-700">
                      <option value="">Select origin</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                      <option>Canada</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>
                {/* Destination Country */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-teal-700">
                    Destination Country
                  </label>
                  <div className="relative">
                    <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400 w-5 h-5" />
                    <select className="w-full pl-10 pr-4 py-2.5 bg-white border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all appearance-none text-teal-700">
                      <option value="">Select destination</option>
                      <option>France</option>
                      <option>Japan</option>
                      <option>United Arab Emirates</option>
                      <option>Australia</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>
                {/* Passport Country */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-teal-700">
                    Passport Issuing Country
                  </label>
                  <div className="relative">
                    <FileTextIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400 w-5 h-5" />
                    <select className="w-full pl-10 pr-4 py-2.5 bg-white border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all appearance-none text-teal-700">
                      <option value="">Select passport country</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                      <option>Canada</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>
                {/* Purpose of Travel */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-teal-700">
                    Purpose of Travel
                  </label>
                  <div className="relative">
                    <BriefcaseIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400 w-5 h-5" />
                    <select className="w-full pl-10 pr-4 py-2.5 bg-white border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all appearance-none text-teal-700">
                      <option value="">Select purpose</option>
                      <option>Tourism</option>
                      <option>Business</option>
                      <option>Education</option>
                      <option>Family Visit</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>
                {/* From Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-teal-700">
                    From Date
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400 w-5 h-5" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-teal-700"
                    />
                  </div>
                </div>
                {/* To Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-teal-700">
                    To Date
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400 w-5 h-5" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-teal-700"
                    />
                  </div>
                </div>
              </div>
            </form>
          )}

          {step === 1 && (
            <div className="max-w-2xl mx-auto space-y-8">
              <h2 className="text-xl font-semibold text-teal-700 mb-4">
                Upload Documents
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-teal-700 mb-2">
                    Passport Scan
                  </label>
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full border border-teal-200 rounded-lg px-4 py-2.5 bg-white text-teal-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-teal-700 mb-2">
                    Visa Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full border border-teal-200 rounded-lg px-4 py-2.5 bg-white text-teal-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-teal-700 mb-2">
                    Additional Documents
                  </label>
                  <input
                    type="file"
                    multiple
                    className="w-full border border-teal-200 rounded-lg px-4 py-2.5 bg-white text-teal-700"
                  />
                </div>
              </div>
              <p className="text-sm text-teal-600 mt-4">
                Please upload clear and legible documents. Accepted formats:
                PDF, JPG, PNG.
              </p>
            </div>
          )}

          {step === 2 && (
            <form className="max-w-2xl mx-auto space-y-8">
              <h2 className="text-xl font-semibold text-teal-700 mb-4">
                Travel Form Details
              </h2>
              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-teal-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-teal-200 rounded-lg px-4 py-2.5 bg-white text-teal-700"
                    defaultValue="Amit Sharma"
                  />
                </div>
                {/* Passport Number */}
                <div>
                  <label className="block text-sm font-semibold text-teal-700 mb-1">
                    Passport Number
                  </label>
                  <input
                    type="text"
                    className="w-full border border-teal-200 rounded-lg px-4 py-2.5 bg-white text-teal-700"
                    defaultValue="N1234567"
                  />
                </div>
                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-semibold text-teal-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="w-full border border-teal-200 rounded-lg px-4 py-2.5 bg-white text-teal-700"
                    defaultValue="1990-05-15"
                  />
                </div>
                {/* Nationality */}
                <div>
                  <label className="block text-sm font-semibold text-teal-700 mb-1">
                    Nationality
                  </label>
                  <input
                    type="text"
                    className="w-full border border-teal-200 rounded-lg px-4 py-2.5 bg-white text-teal-700"
                    defaultValue="Indian"
                  />
                </div>
                {/* Address in Home Country */}
                <div>
                  <label className="block text-sm font-semibold text-teal-700 mb-1">
                    Address in Home Country
                  </label>
                  <input
                    type="text"
                    className="w-full border border-teal-200 rounded-lg px-4 py-2.5 bg-white text-teal-700"
                    defaultValue="123, Green Park, Delhi"
                  />
                </div>
                {/* Contact Number */}
                <div>
                  <label className="block text-sm font-semibold text-teal-700 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    className="w-full border border-teal-200 rounded-lg px-4 py-2.5 bg-white text-teal-700"
                    defaultValue="+91 9876543210"
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-teal-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border border-teal-200 rounded-lg px-4 py-2.5 bg-white text-teal-700"
                    defaultValue="amit.sharma@email.com"
                  />
                </div>
                {/* Purpose of Visit */}
                <div>
                  <label className="block text-sm font-semibold text-teal-700 mb-1">
                    Purpose of Visit
                  </label>
                  <input
                    type="text"
                    className="w-full border border-teal-200 rounded-lg px-4 py-2.5 bg-white text-teal-700"
                    defaultValue="Tourism"
                  />
                </div>
                {/* Address in Destination Country */}
                <div>
                  <label className="block text-sm font-semibold text-teal-700 mb-1">
                    Address in Destination Country
                  </label>
                  <input
                    type="text"
                    className="w-full border border-teal-200 rounded-lg px-4 py-2.5 bg-white text-teal-700"
                    placeholder="Enter hotel or residence address"
                  />
                </div>
                {/* Emergency Contact */}
                <div>
                  <label className="block text-sm font-semibold text-teal-700 mb-1">
                    Emergency Contact Name & Number
                  </label>
                  <input
                    type="text"
                    className="w-full border border-teal-200 rounded-lg px-4 py-2.5 bg-white text-teal-700"
                    placeholder="Enter emergency contact"
                  />
                </div>
              </div>
              <p className="text-sm text-teal-600 mt-4">
                Please verify and complete all required details. These will be
                used to auto-fill government visa forms.
              </p>
            </form>
          )}
        </div>

        <footer className="p-8 border-t flex justify-between items-center bg-white">
          <button
            className="px-6 py-2.5 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
            onClick={() => (step === 0 ? onClose() : setStep(step - 1))}
          >
            {step === 0 ? "Cancel" : "Back"}
          </button>
          <div className="flex gap-4">
            {step < steps.length - 1 ? (
              <button
                className="px-8 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-lg transition-all flex items-center gap-2"
                onClick={() => setStep(step + 1)}
              >
                Next Step
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                className="px-8 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-lg transition-all flex items-center gap-2"
                onClick={onClose}
              >
                Done
              </button>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
};
