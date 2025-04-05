// import { CodePreview } from "@/app/landing/code-preview";
import { LandingFeature } from "./landing-feature";
import Link from "next/link";
import Image from "next/image";

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
      <div className="min-h-80 flex flex-1 flex-col gap-5 w-full px-15 sm:px-40 justify-center items-center">
        <div className="h-full my-15 grid auto-rows-min gap-15 lg:gap-7 lg:grid-cols-3">
          <div className="text-center max-w-sm">
            <h2 className="text-4xl mb-2">Adaptive</h2>
            <p className="text-gray-400 text-lg">
              We analyze your system requirements, design, and implementation to
              create comprehensive test plans on a change-by-change basis.
            </p>
          </div>

          <div className="text-center max-w-sm">
            <h2 className="text-4xl mb-2">Thorough</h2>
            <p className="text-gray-400 text-lg">
              We'll perform both regression testing and new feature validation
              to ensure your system is working as expected.
            </p>
          </div>

          <div className="text-center max-w-sm">
            <h2 className="text-4xl mb-2">Insightful</h2>
            <p className="text-gray-400 text-lg">
              We'll provide data-driven insights to help you understand the
              impact of your changes and generate verification reports for
              compliance.
            </p>
          </div>
        </div>
      </div>
      <div className="min-h-[90vh] bg-[url('/images/landing-section-2.png')] bg-cover bg-left flex flex-1 flex-col justify-center gap-5 w-full items-center">
        <Image
          src="/images/envs-screenshot.png"
          alt="Environment Management"
          width={1000}
          height={1000}
          className="w-full max-w-9/10 lg:max-w-3/4 rounded-lg"
        />
      </div>
    </div>
  );
}
