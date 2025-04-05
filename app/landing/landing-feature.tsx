import {
  GitPullRequestArrow,
  ShieldCheck,
  Target,
  Text,
  BookOpenCheck,
  CheckCircle,
  Circle,
  Container,
} from "lucide-react";

const hilTestCases = [
  "AccelFilter_NormalDrive",
  "AccelFilter_HardBrake",
  "AccelFilter_HardThrottle",
  "AccelFilter_CollisionFront",
  "AccelFilter_CollisionRear",
  "AccelFilter_CollisionSide",
  "HUD_AlertCollision",
  "HUD_NoAlertBrake",
  "Audio_CollisionAlert",
  "Audio_NoAlertThrottle",
  "Dashcam_RecordCollision",
  "Dashcam_NoRecordBrake",
  "Filter_SignalNoiseRobustness",
  "Filter_ResponseLatency",
  "Filter_DropoutRecovery",
  "AccelFilter_PotholeImpact",
  "AccelFilter_BrakeOnHill",
  "AccelFilter_ThrottleSlip",
  "SeatbeltTighten_Collision",
  "SeatbeltTighten_FalsePos",
];

const hilTestBeds = [
  ["HIL_Accel", "9/20"],
  ["HOL_Accel", "9/20"],
  ["HIL_Audio", "2/20"],
  ["HIL_Dashcam", "2/20"],
  ["HOL_EndToEnd", "20/20"],
  ["HIL_Seatbelt", "11/20"],
];

export function LandingFeature() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full rounded-lg overflow-hidden bg-stone-100 backdrop-blur-sm shadow-2xl border border-gray-700 p-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-slate-800 text-4xl font-semibold mb-2">
            Improve Collision Detection #5991
          </h1>
          <div className="flex flex-col lg:flex-row items-center gap-2">
            <div className="w-full lg:w-auto">
              <div className="w-min bg-green-600 text-white px-3 py-1 rounded-full flex items-center gap-2">
                <GitPullRequestArrow className="w-5 h-5" />
                <span>Open</span>
              </div>
            </div>
            <span className="text-gray-700">
              jstettner wants to merge 1 commit into
              <span className="bg-blue-500 text-white px-2 py-0.5 rounded-md mx-1 whitespace-nowrap">
                main
              </span>
              from
              <span className="bg-blue-500 text-white px-2 py-0.5 rounded-md mx-1 whitespace-nowrap">
                feat/safety-9921
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="h-4 w-0.5 bg-stone-700/60"></div>
      <div className="w-full rounded-lg overflow-hidden bg-stone-100 backdrop-blur-sm shadow-2xl border border-gray-700 p-4">
        <div className="grid lg:grid-cols-3 auto-rows-min gap-2">
          <div className="flex flex-col gap-1 border-b lg:border-b-0 lg:border-r border-gray-300 pr-2">
            <span className="font-semibold text-gray-900 whitespace-nowrap flex flex-row items-center gap-2">
              <Text className="w-5 h-5" />
              Auto-Summary
            </span>
            <span className="text-gray-700">
              Updated accelerometer signal filtering to be robust to intentional
              throttle or braking.
            </span>
          </div>
          <div className="flex flex-col gap-1 border-b lg:border-b-0 lg:border-r border-gray-300 pr-2">
            <span className="font-semibold text-gray-900 whitespace-nowrap flex flex-row items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              Impacts
            </span>
            <span className="text-gray-700">
              Digital signal processing (common code), auto-seatbelt tightening,
              HUD, audio alerts, dashcam.
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-900 whitespace-nowrap flex flex-row items-center gap-2">
              <Target className="w-5 h-5" />
              Objectives
            </span>
            <span className="text-gray-700">
              Improve collision response KPI.
            </span>
          </div>
        </div>
      </div>
      <div className="h-4 w-0.5 bg-stone-700/60"></div>
      <div className="w-full rounded-lg max-h-[170px] overflow-hidden bg-stone-100 backdrop-blur-sm shadow-2xl border border-gray-700 p-4 flex flex-col relative">
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-stone-100 to-transparent pointer-events-none"></div>
        <span className="font-semibold text-gray-900 whitespace-nowrap flex flex-row items-center gap-2 pb-1">
          <BookOpenCheck className="w-5 h-5" />
          Suggested Test Plan
        </span>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 auto-rows-min gap-2">
          {hilTestCases.map((testCase) => (
            <div key={testCase} className="flex flex-col gap-1">
              <span className="text-gray-700">{testCase}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-4 w-0.5 bg-stone-700/60"></div>
      <div className="w-full rounded-lg max-h-[170px] overflow-hidden bg-stone-100 backdrop-blur-sm shadow-2xl border border-gray-700 p-4 flex flex-col relative">
        <span className="font-semibold text-gray-900 whitespace-nowrap flex flex-row items-center gap-2 pb-1">
          <Container className="w-5 h-5" />
          Your Compatible Environments
        </span>
        <div className="grid lg:grid-cols-3 auto-rows-min gap-2">
          {hilTestBeds.map((testBed) => (
            <div
              key={testBed[0]}
              className="flex flex-row items-baseline gap-1"
            >
              <span className="text-gray-700">{testBed[0]}</span>
              <span className="text-gray-400 text-xs">{testBed[1]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 sm:px-8 w-full">
        <div className="w-full flex flex-col items-center">
          {/* Progress bar with circles */}
          <div className="relative w-full max-w-3xl">
            {/* Progress bar line */}
            <div className="mx-9 absolute top-5 left-0 right-0 h-[2px] bg-gray-100/60 z-0"></div>

            {/* Circles with labels */}
            <div className="flex justify-between relative">
              {/* First circle - Done */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center z-10">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="text-center mt-2">
                  <span className="text-sm font-medium text-white sm:text-gray-700 block">
                    Detect Changes
                  </span>
                  <span className="text-xs hidden sm:block text-green-600 block">
                    Completed
                  </span>
                </div>
              </div>

              {/* Second circle - Done */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center z-10">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="text-center mt-2">
                  <span className="text-sm font-medium text-white sm:text-gray-700 block">
                    Assess and Dispatch Tests
                  </span>
                  <span className="text-xs hidden sm:block text-green-600 block">
                    Completed
                  </span>
                </div>
              </div>

              {/* Third circle - In Progress with animation */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center z-10">
                    <Circle className="w-6 h-6" />
                  </div>
                  {/* Radiating animation */}
                  <div className="absolute top-0 left-0 w-10 h-10 rounded-full bg-blue-300 opacity-70 animate-ping"></div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-sm font-medium text-white sm:text-gray-700 block">
                    Compile Results
                  </span>
                  <span className="text-xs hidden sm:block text-blue-600 block">
                    In Progress
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
