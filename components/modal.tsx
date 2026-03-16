import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  DollarSign,
  Plane,
  Hotel,
  Camera,
  Share2,
  Clock,
  AlertCircle,
  Star,
  ChevronUp,
  ChevronDown,
  Check,
  FileText,
  X,
  Eye,
  Upload,
  Search,
  CheckCircle,
} from "lucide-react";

export const VoyageAI = (): any => {
  const [stage, setStage] = useState<any>("landing");
  const [inputValue, setInputValue] = useState<any>("");
  const [tags, setTags] = useState<any[]>([]);
  const [expandedCard, setExpandedCard] = useState<any>(null);
  const [showVisaModal, setShowVisaModal] = useState<any>(false);
  const [visaStep, setVisaStep] = useState<any>(1);
  const [uploadedDocs, setUploadedDocs] = useState<any>({});
  const [formData, setFormData] = useState<any>({});
  const [searchField, setSearchField] = useState<any>("");
  const [highlightedDoc, setHighlightedDoc] = useState<any>(null);
  const [totalCost, setTotalCost] = useState<any>(0);
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [showSampleForm, setShowSampleForm] = useState<any>(false);

  const itinerary: any[] = [
    {
      id: 1,
      type: "flight",
      day: "Nov 12",
      time: "08:00 AM",
      title: "Flight to Tokyo",
      subtitle: "United Airlines UA7922",
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
      rating: 4.5,
      price: 850,
      details: {
        duration: "13h 30m",
        stops: "Non-stop",
        class: "Economy",
        baggage: "2 checked bags included",
      },
    },
    {
      id: 2,
      type: "hotel",
      day: "Nov 12",
      time: "03:00 PM",
      title: "Check-in at Shibuya Grand Hotel",
      subtitle: "4 nights • Central Tokyo",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      rating: 4.7,
      price: 480,
      details: {
        room: "Deluxe Room with City View",
        amenities: "Free WiFi, Breakfast included, Gym",
        cancellation: "Free cancellation until Nov 10",
      },
    },
    {
      id: 3,
      type: "activity",
      day: "Nov 13",
      time: "10:00 AM",
      title: "Tsukiji Fish Market Food Tour",
      subtitle: "Guided walking tour",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
      rating: 4.9,
      price: 85,
      details: {
        duration: "3 hours",
        group: "Small group (max 12)",
        includes: "Tastings, English guide",
      },
    },
    {
      id: 4,
      type: "activity",
      day: "Nov 14",
      time: "09:00 AM",
      title: "Day Trip to Mount Fuji & Hakone",
      subtitle: "Bus tour with lunch",
      image:
        "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80",
      rating: 4.8,
      price: 120,
      details: {
        duration: "Full day (10 hours)",
        pickup: "Hotel pickup included",
        includes: "Lunch, Cable car tickets",
      },
    },
    {
      id: 5,
      type: "hotel",
      day: "Nov 16",
      time: "02:00 PM",
      title: "Check-in at Kyoto Ryokan Inn",
      subtitle: "3 nights • Traditional Japanese Inn",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
      rating: 4.9,
      price: 390,
      details: {
        room: "Traditional Tatami Room",
        amenities: "Onsen bath, Kaiseki dinner, Tea ceremony",
        cancellation: "Non-refundable",
      },
    },
    {
      id: 6,
      type: "activity",
      day: "Nov 17",
      time: "08:00 AM",
      title: "Fushimi Inari Shrine & Bamboo Forest",
      subtitle: "Private guided tour",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
      rating: 5.0,
      price: 95,
      details: {
        duration: "4 hours",
        group: "Private tour",
        includes: "Photography, Cultural insights",
      },
    },
    {
      id: 7,
      type: "flight",
      day: "Nov 22",
      time: "06:00 PM",
      title: "Return Flight from Osaka",
      subtitle: "United Airlines UA7923",
      image:
        "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&q=80",
      rating: 4.5,
      price: 850,
      details: {
        duration: "12h 45m",
        stops: "Non-stop",
        class: "Economy",
        baggage: "2 checked bags included",
      },
    },
  ];

  const visaRequirements: any[] = [
    { id: 1, name: "Valid Passport", required: true },
    { id: 2, name: "Passport Photo", required: true },
    { id: 3, name: "Bank Statement (3 months)", required: true },
    { id: 4, name: "Flight Reservation", required: true },
    { id: 5, name: "Hotel Confirmation", required: true },
    { id: 6, name: "Travel Insurance", required: false },
  ];

  const visaFormFields: any[] = [
    {
      id: "passportNumber",
      label: "Passport Number",
      docLocation: "passport-top-right",
      sampleValue: "N1234567",
    },
    {
      id: "fullName",
      label: "Full Name (as on passport)",
      docLocation: "passport-center",
      sampleValue: "JOHN SMITH",
    },
    {
      id: "dateOfBirth",
      label: "Date of Birth",
      docLocation: "passport-bio-page",
      sampleValue: "15 JAN 1990",
    },
    {
      id: "placeOfBirth",
      label: "Place of Birth",
      docLocation: "passport-bio-page",
      sampleValue: "NEW YORK, USA",
    },
    {
      id: "nationality",
      label: "Nationality",
      docLocation: "passport-bio-page",
      sampleValue: "UNITED STATES",
    },
    {
      id: "passportIssueDate",
      label: "Passport Issue Date",
      docLocation: "passport-bottom",
      sampleValue: "10 MAY 2020",
    },
    {
      id: "passportExpiryDate",
      label: "Passport Expiry Date",
      docLocation: "passport-bottom",
      sampleValue: "10 MAY 2030",
    },
    {
      id: "address",
      label: "Current Address",
      docLocation: "bank-statement-header",
      sampleValue: "123 Main St, New York, NY 10001",
    },
    {
      id: "occupation",
      label: "Occupation",
      docLocation: "bank-statement",
      sampleValue: "Software Engineer",
    },
    {
      id: "employerName",
      label: "Employer Name",
      docLocation: "bank-statement",
      sampleValue: "Tech Corp Inc.",
    },
    {
      id: "purposeOfVisit",
      label: "Purpose of Visit",
      docLocation: "none",
      sampleValue: "Tourism",
    },
    {
      id: "durationOfStay",
      label: "Duration of Stay",
      docLocation: "flight-booking",
      sampleValue: "10 days",
    },
    {
      id: "arrivalDate",
      label: "Intended Arrival Date",
      docLocation: "flight-booking",
      sampleValue: "12 NOV 2024",
    },
    {
      id: "departureDate",
      label: "Intended Departure Date",
      docLocation: "flight-booking",
      sampleValue: "22 NOV 2024",
    },
  ];

  useEffect((): any => {
    const extractedTags: any[] = [];
    const input: any = inputValue.toLowerCase();
    if (input.includes("japan"))
      extractedTags.push({ type: "location", value: "Japan" });
    if (input.includes("november") || input.includes("nov"))
      extractedTags.push({ type: "date", value: "Nov 12" });
    if (input.includes("10-day") || input.includes("10 day"))
      extractedTags.push({ type: "duration", value: "10 days" });
    if (input.includes("$5k") || input.includes("5000"))
      extractedTags.push({ type: "budget", value: "$5,000" });
    if (input.includes("food"))
      extractedTags.push({ type: "interest", value: "Food" });
    if (input.includes("culture"))
      extractedTags.push({ type: "interest", value: "Culture" });
    setTags(extractedTags);
  }, [inputValue]);

  useEffect((): any => {
    const selected: any[] = Object.values(selectedOptions);
    const total: any = selected.reduce(
      (sum: any, item: any) => sum + (item?.price || 0),
      0,
    );
    setTotalCost(total);
  }, [selectedOptions]);

  const handleGenerate = (): any => {
    if (inputValue.trim()) {
      setStage("itinerary");
      setSelectedOptions({});
    }
  };

  const toggleCard = (id: any): any =>
    setExpandedCard(expandedCard === id ? null : id);
  const handleBooking = (item: any): any =>
    setSelectedOptions((prev: any) => ({
      ...prev,
      [item.id]: prev[item.id] ? null : item,
    }));
  const handleDocUpload = (reqId: any): any =>
    setUploadedDocs((prev: any) => ({ ...prev, [reqId]: true }));

  const handleFieldSearch = (field: any): any => {
    setSearchField(field);
    const fieldData: any = visaFormFields.find((f: any) => f.id === field);
    if (fieldData) {
      setHighlightedDoc(fieldData.docLocation);
      setFormData((prev: any) => ({
        ...prev,
        [field]: fieldData.sampleValue || "",
      }));
    }
  };

  const loadSampleForm = (): any => {
    const sampleData: any = {};
    visaFormFields.forEach((field: any) => {
      sampleData[field.id] = field.sampleValue;
    });
    setFormData(sampleData);
    setShowSampleForm(true);
    setVisaStep(3);
  };

  const getIcon = (type: any): any => {
    switch (type) {
      case "flight":
        return <Plane className="w-5 h-5" />;
      case "hotel":
        return <Hotel className="w-5 h-5" />;
      case "activity":
        return <Camera className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const getTagIcon = (type: any): any => {
    switch (type) {
      case "date":
        return <Calendar className="w-3 h-3" />;
      case "location":
        return <MapPin className="w-3 h-3" />;
      case "budget":
        return <DollarSign className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  if (stage === "landing") {
    return (
      <>
        <div className="min-h-screen bg-gray-50">
          <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-purple-600">VoyageAI</h1>
                <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Nov 12 - 22, 2024</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>Japan</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </button>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-semibold">
                  <DollarSign className="w-4 h-4" />
                  <span>\${totalCost.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </header>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Your Japan Adventure
                </h2>
                <p className="text-gray-600">
                  10-day cultural and culinary journey through Tokyo and Kyoto
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
                <AlertCircle className="w-5 h-5" />
                <span className="font-semibold">Visa Required</span>
              </div>
            </div>
            <div className="space-y-4">
              {itinerary.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div
                    onClick={() => toggleCard(item.id)}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
                      <div
                        className={`flex-shrink-0 w-full sm:w-32 h-32 rounded-lg overflow-hidden ${
                          expandedCard === item.id
                            ? "ring-2 ring-purple-500"
                            : ""
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2 flex-1">
                            <div
                              className={`p-1.5 rounded-lg ${
                                item.type === "flight"
                                  ? "bg-blue-100 text-blue-600"
                                  : item.type === "hotel"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-orange-100 text-orange-600"
                              }`}
                            >
                              {getIcon(item.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-gray-500">
                                {item.day} • {item.time}
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 truncate">
                                {item.title}
                              </h3>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{item.rating}</span>
                            </div>
                            {expandedCard === item.id ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{item.subtitle}</p>
                      </div>
                    </div>
                  </div>
                  {expandedCard === item.id && (
                    <div className="border-t bg-gray-50 p-4 sm:p-6 space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        {Object.entries(item.details).map(
                          ([key, value]: any) => (
                            <div key={key} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                              <div>
                                <div className="text-xs text-gray-500 uppercase">
                                  {key}
                                </div>
                                <div className="text-sm font-medium text-gray-900">
                                  {value}
                                </div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                        <button
                          onClick={() => handleBooking(item)}
                          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                            selectedOptions[item.id]
                              ? "bg-green-500 text-white hover:bg-green-600"
                              : "bg-purple-600 text-white hover:bg-purple-700"
                          }`}
                        >
                          {selectedOptions[item.id] ? (
                            <span className="flex items-center justify-center gap-2">
                              <Check className="w-5 h-5" />
                              Booked
                            </span>
                          ) : (
                            `Book Now - $${item.price}`
                          )}
                        </button>
                        <button className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setShowVisaModal(true)}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-110 z-50 group"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6" />
              <span className="hidden group-hover:inline font-semibold pr-2 whitespace-nowrap">
                Travel Readiness
              </span>
            </div>
          </button>
          {showVisaModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 sm:p-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold">
                      Japan Visa Application
                    </h2>
                    <p className="text-purple-100 text-sm mt-1">
                      Step {visaStep} of 3
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowVisaModal(false);
                      setVisaStep(1);
                      setShowSampleForm(false);
                    }}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex-1 overflow-auto p-4 sm:p-6">
                  {visaStep === 1 && (
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-blue-900">
                            <p className="font-semibold mb-1">
                              Document Requirements
                            </p>
                            <p>
                              Please ensure you have the following documents
                              ready for your Japan visa application.
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={loadSampleForm}
                        className="w-full mb-4 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
                      >
                        <Eye className="w-5 h-5" />
                        View Sample Result (No Upload Required)
                      </button>
                      {visaRequirements.map((req) => (
                        <div
                          key={req.id}
                          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-lg border-2 transition-all ${
                            uploadedDocs[req.id]
                              ? "bg-green-50 border-green-300"
                              : "bg-white border-gray-200 hover:border-purple-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                uploadedDocs[req.id]
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-200 text-gray-500"
                              }`}
                            >
                              {uploadedDocs[req.id] ? (
                                <Check className="w-5 h-5" />
                              ) : (
                                <X className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {req.name}
                              </div>
                              {req.required && (
                                <div className="text-xs text-red-600">
                                  Required
                                </div>
                              )}
                            </div>
                          </div>
                          {!uploadedDocs[req.id] && (
                            <button
                              onClick={() => handleDocUpload(req.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm w-full sm:w-auto justify-center"
                            >
                              <Upload className="w-4 h-4" />
                              Upload
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => setVisaStep(3)}
                        disabled={Object.keys(uploadedDocs).length < 3}
                        className="w-full mt-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue to Form
                      </button>
                    </div>
                  )}
                  {visaStep === 3 && (
                    <div className="space-y-6">
                      {showSampleForm && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Eye className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-blue-900">
                              <p className="font-semibold mb-1">
                                Sample Result Mode
                              </p>
                              <p>
                                This is a pre-filled example showing how the
                                form would look after auto-extracting data from
                                your documents.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="grid lg:grid-cols-2 gap-6">
                        <div className="bg-gray-100 rounded-lg p-4 overflow-auto max-h-[600px] order-2 lg:order-1">
                          <h3 className="font-semibold text-gray-900 mb-4">
                            Uploaded Documents
                          </h3>
                          <div className="space-y-4">
                            {/* ...uploaded document cards... */}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg border p-4 overflow-auto max-h-[600px] order-1 lg:order-2">
                          <div className="sticky top-0 bg-white pb-4 mb-4 border-b z-10">
                            <h3 className="font-semibold text-gray-900 mb-3">
                              Visa Application Form
                            </h3>
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="text"
                                placeholder="Search for a field..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                                onChange={(e) => {
                                  const value = e.target.value.toLowerCase();
                                  const field = visaFormFields.find((f) =>
                                    f.label.toLowerCase().includes(value),
                                  );
                                  if (field && value)
                                    handleFieldSearch(field.id);
                                }}
                              />
                            </div>
                          </div>
                          <div className="space-y-4">
                            {visaFormFields.map((field) => (
                              <div
                                key={field.id}
                                className={`${
                                  searchField === field.id
                                    ? "bg-yellow-50 p-3 rounded-lg border-2 border-yellow-400"
                                    : ""
                                }`}
                              >
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  {field.label}
                                </label>
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={formData[field.id] || ""}
                                    onChange={(e) =>
                                      setFormData((prev: any) => ({
                                        ...prev,
                                        [field.id]: e.target.value,
                                      }))
                                    }
                                    onClick={() => handleFieldSearch(field.id)}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                                    placeholder={`Enter ${field.label.toLowerCase()}`}
                                  />
                                  {formData[field.id] && (
                                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                                  )}
                                </div>
                                {field.docLocation !== "none" && (
                                  <button
                                    onClick={() => handleFieldSearch(field.id)}
                                    className="text-xs text-purple-600 hover:text-purple-700 mt-1"
                                  >
                                    Auto-fill from document
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                          <button className="w-full mt-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-600 transition-all">
                            Submit Application
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600')] bg-cover bg-center animate-[zoom_20s_ease-in-out_infinite]"></div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${10 + Math.random() * 20}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
              Voyage<span className="text-purple-400">AI</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your AI-powered travel concierge for seamless journeys
            </p>
          </div>
          <div className="w-full max-w-3xl">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Describe your dream trip... (e.g., 'Plan a 10-day honeymoon in Japan starting November 12th, focus on food and culture, budget $5k')"
                className="w-full bg-transparent text-white placeholder-gray-400 text-lg outline-none resize-none h-24"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && e.ctrlKey) handleGenerate();
                }}
              />
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 mb-4">
                  {tags.map((tag, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 px-3 py-1 bg-purple-500/30 border border-purple-400/50 rounded-full text-sm text-purple-100"
                    >
                      {getTagIcon(tag.type)}
                      <span>{tag.value}</span>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={handleGenerate}
                disabled={!inputValue.trim()}
                className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                Generate Itinerary
              </button>
            </div>
            <div className="text-center mt-6 text-gray-400 text-sm">
              Press Ctrl + Enter to generate
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          @keyframes zoom {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }
        `}</style>
      </div>
    </>
  );
};
