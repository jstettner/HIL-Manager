// import { CodePreview } from "@/app/landing/code-preview";
import { LandingFeature } from "./landing-feature";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col bg-zinc-900">
      <div className="min-h-[90vh] w-full hero bg-[url('/images/hero-bg-2.png')] bg-cover bg-left pb-10">
        <div className="h-full flex flex-col sm:flex-row justify-around items-center gap-12 px-15 sm:px-20">
          <div className="flex flex-col max-w-2xl text-center lg:text-left mt-50 sm:mt-0">
            <h1 className="hero-text">Fortify your Product</h1>
            <h2 className="hero-subtext">
              Protect against costly real-world failures with AI-Agents for
              Hardware Verification.
            </h2>
            <Link
              href="/signin"
              className="mt-4 bg-white text-gray-900 hover:bg-gray-100 transition-colors px-4 py-2 rounded-md font-medium w-min whitespace-nowrap"
            >
              Schedule a Demo
            </Link>
          </div>
          <div className="w-full max-w-2xl sm:mt-30">
            <LandingFeature />
          </div>
        </div>
      </div>
      <div className="min-h-[90vh] flex flex-1 flex-col gap-5 px-4 pt-7 pb-10 w-full">
        <div className="grid auto-rows-min gap-7 md:grid-cols-3 h-min-content">
          <div className="rounded-xl h-full bg-muted-foreground"></div>
          <div className="rounded-xl h-full bg-muted-foreground"></div>
          <div className="rounded-xl h-full bg-muted-foreground"></div>
        </div>
      </div>
    </div>
  );
}
