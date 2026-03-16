"use client";

import { Button } from "@/components/ui/button";
import { Plane, IdCard, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { Itinerary } from "@/types/itinerary";
import DayDetailsCard from "./day-details-card";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ResultBlockProps {
  itineraryId: string;
  itinerary: Itinerary;
}

const mockCountryList = [
  { code: "IN", name: "India" },
  { code: "NP", name: "Nepal" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  // Add more as needed
];

const mockVisaApi = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    visaRequired: false,
    visaType: "Visa-Free",
    stayDurationDays: 2,
    summary: "Visa-Free for India citizens traveling to Nepal",
    requiredDocuments: [
      "Passport (original, any validity)",
      "Voter ID (alternative for Indians)",
      "Aadhaar card (alternative for Indians)",
      "Hotel booking confirmation",
      "Bank statement or cash proof",
    ],
  };
};

const mockDocumentAnalysisApi = async (files: File[]) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Mock response: list of fields and values
  return [
    { field: "Full Name", value: "John Doe" },
    { field: "Passport Number", value: "A1234567" },
    { field: "Nationality", value: "India" },
    { field: "Date of Birth", value: "1990-01-01" },
    { field: "Hotel Name", value: "Hotel Everest" },
    // Add more as needed
  ];
};

function ResultBlock({ itineraryId, itinerary }: ResultBlockProps) {
  const router = useRouter();
  const [visaDrawerOpen, setVisaDrawerOpen] = useState(false);
  const [visaResult, setVisaResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [countryList, setCountryList] = useState<typeof mockCountryList>([]);
  const [error, setError] = useState<string | null>(null);
  const [documentFiles, setDocumentFiles] = useState<{
    [key: string]: File | null;
  }>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [analysisFields, setAnalysisFields] = useState<
    { field: string; value: string }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  // Cache country list (simulate API call)
  useEffect(() => {
    if (countryList.length === 0) {
      // Simulate fetch and cache
      setCountryList(mockCountryList);
    }
  }, [countryList.length]);

  const [form, setForm] = useState({
    originCountryCode: "",
    destinationCountryCode: "",
    purpose: "",
    entryDate: "",
    exitDate: "",
    passportCountryCode: "",
  });
  const saveItinerary = async () => {
    router.push(`/itinerary/${itineraryId}`);
  };

  const handleVisaClick = () => setVisaDrawerOpen(true);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVisaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.originCountryCode === form.destinationCountryCode) {
      setError("Origin and Destination country cannot be the same.");
      return;
    }
    setLoading(true);
    setVisaResult(null);
    // Mock API call
    const result = await mockVisaApi();
    setVisaResult(result);
    if (result.requiredDocuments) {
      const files: { [key: string]: File | null } = {};
      result.requiredDocuments.forEach((doc: string) => {
        files[doc] = null;
      });
      setDocumentFiles(files);
    }
    setLoading(false);
  };

  const handleFileChange = (doc: string, file: File | null) => {
    setDocumentFiles((prev) => ({
      ...prev,
      [doc]: file,
    }));
  };

  const handleAnalyzeDocuments = async () => {
    // Collect all uploaded files
    const files = Object.values(documentFiles).filter(
      (f) => f !== null,
    ) as File[];
    if (files.length === 0) return;
    const fields = await mockDocumentAnalysisApi(files);
    setAnalysisFields(fields);
    setModalOpen(true);
  };

  const filteredFields = analysisFields.filter(
    (item) =>
      item.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.value.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex-grow p-4 md:p-8 h-[65vh] overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-xl font-bold">Planning Your Trip</h2>
          <div className="flex justify-between items-center">
            <Button
              onClick={handleVisaClick}
              className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 mr-5"
            >
              <IdCard className="mr-2 h-4 w-4" />
              Visa
            </Button>
            <Button
              onClick={saveItinerary}
              className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600"
            >
              <Plane className="mr-2 h-4 w-4" />
              Save Itinerary
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {itinerary.details.map((day) => (
            <DayDetailsCard
              itineraryId={itineraryId}
              day={day}
              key={day.day_id}
            />
          ))}
        </div>
      </div>

      <Drawer
        open={visaDrawerOpen}
        onOpenChange={setVisaDrawerOpen}
        direction="right"
      >
        <DrawerContent className="w-full max-w-2xl ml-auto h-screen overflow-y-auto pb-10">
          <DrawerHeader>
            <DrawerTitle>Visa Information</DrawerTitle>
          </DrawerHeader>
          <form onSubmit={handleVisaSubmit} className="space-y-4 p-4">
            <div>
              <Label htmlFor="origin">Origin Country</Label>
              <select
                id="originCountryCode"
                name="originCountryCode"
                value={form.originCountryCode}
                onChange={handleFormChange}
                required
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select country</option>
                {countryList.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="destination">Destination Country</Label>
              <select
                id="destinationCountryCode"
                name="destinationCountryCode"
                value={form.destinationCountryCode}
                onChange={handleFormChange}
                required
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select country</option>
                {countryList.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="nationality">Nationality</Label>
              <select
                id="passportCountryCode"
                name="passportCountryCode"
                value={form.passportCountryCode}
                onChange={handleFormChange}
                required
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select country</option>
                {countryList.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="purpose">Purpose</Label>
              <Input
                id="purpose"
                name="purpose"
                value={form.purpose}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="from">From</Label>
              <Input
                id="entryDate"
                name="entryDate"
                type="date"
                value={form.entryDate}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="to">To</Label>
              <Input
                id="exitDate"
                name="exitDate"
                type="date"
                value={form.exitDate}
                onChange={handleFormChange}
                required
              />
            </div>
            <DrawerFooter>
              {error && (
                <div className="text-red-600 text-sm mb-2">{error}</div>
              )}
              <Button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700"
                disabled={loading}
              >
                {loading ? "Checking..." : "Submit"}
              </Button>
            </DrawerFooter>
          </form>
          {visaResult && (
            <div className="p-6 mt-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-teal-200 dark:border-teal-800 m-10">
              <div className="flex items-center mb-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    visaResult.visaRequired
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {visaResult.visaRequired ? (
                    <>
                      <span className="mr-2">❌</span> Visa Required
                    </>
                  ) : (
                    <>
                      <span className="mr-2">✅</span> Visa Not Required
                    </>
                  )}
                </span>
                <span className="ml-auto px-2 py-1 bg-teal-100 text-teal-800 rounded text-xs font-medium">
                  {visaResult.visaType}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Stay Duration:
                </span>{" "}
                <span className="text-teal-700 dark:text-teal-300 font-bold">
                  {visaResult.stayDurationDays} days
                </span>
              </div>
              <div className="mb-4">
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Summary:
                </span>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {visaResult.summary}
                </p>
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Required Documents:
                </span>
                <ul className="mt-2 space-y-3">
                  {visaResult.requiredDocuments.map(
                    (doc: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-gray-600 dark:text-gray-400">
                          {doc}
                        </span>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(e) =>
                              handleFileChange(doc, e.target.files?.[0] || null)
                            }
                          />
                          <UploadCloud
                            className={`w-6 h-6 transition-colors ${
                              documentFiles[doc]
                                ? "text-green-600"
                                : "text-gray-400 hover:text-teal-600"
                            }`}
                          />
                          {documentFiles[doc] && (
                            <span className="ml-2 text-xs text-gray-700 dark:text-gray-300 truncate max-w-[120px]">
                              {documentFiles[doc]?.name}
                            </span>
                          )}
                        </label>
                      </li>
                    ),
                  )}
                </ul>
                <Button
                  className="mt-4 bg-teal-600 hover:bg-teal-700"
                  onClick={handleAnalyzeDocuments}
                  disabled={
                    Object.values(documentFiles).filter((f) => f !== null)
                      .length === 0
                  }
                >
                  Analyze Documents
                </Button>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Visa Form Fields</DialogTitle>
          </DialogHeader>
          <div className="mb-4">
            <Input
              placeholder="Search fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-2 px-3 border-b font-semibold">
                    Field Name
                  </th>
                  <th className="py-2 px-3 border-b font-semibold">
                    Field Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredFields.length === 0 ? (
                  <tr>
                    <td
                      colSpan={2}
                      className="py-2 px-3 text-gray-500 text-center"
                    >
                      No fields found.
                    </td>
                  </tr>
                ) : (
                  filteredFields.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2 px-3 border-b">{item.field}</td>
                      <td className="py-2 px-3 border-b">{item.value}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ResultBlock;
