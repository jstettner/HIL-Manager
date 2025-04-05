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
        <div className="h-full my-30 grid auto-rows-min gap-30 lg:gap-7 lg:grid-cols-3">
          <div className="text-center max-w-sm">
            <h2 className="text-4xl mb-2">Adaptive</h2>
            <p className="text-gray-300 text-lg">
              We analyze your system requirements, design, and implementation to
              create comprehensive test plans on a change-by-change basis.
            </p>
          </div>

          <div className="text-center max-w-sm">
            <h2 className="text-4xl mb-2">Thorough</h2>
            <p className="text-gray-300 text-lg">
              We'll perform both regression testing and new feature validation
              to ensure your system is working as expected.
            </p>
          </div>

          <div className="text-center max-w-sm">
            <h2 className="text-4xl mb-2">Insightful</h2>
            <p className="text-gray-300 text-lg">
              We'll provide data-driven insights to help you understand the
              impact of your changes and generate verification reports for
              compliance.
            </p>
          </div>
        </div>
      </div>
      <div className="min-h-[90vh] bg-[url('/images/landing-section-alt.png')] bg-cover bg-left flex flex-1 flex-col justify-center gap-5 w-full items-center">
        <Image
          src="/images/envs-screenshot.png"
          alt="Environment Management"
          width={1000}
          height={1000}
          className="w-full max-w-9/10 xl:max-w-3/4 rounded-lg"
        />
      </div>
      <div className="min-h-80 flex flex-1 flex-col gap-5 w-full px-15 sm:px-40 justify-center items-center">
        <div className="h-full my-30">
          <div className="text-center max-w-xl">
            <h2 className="text-4xl mb-2">AI Native</h2>
            <p className="text-gray-300 text-lg">
              Halidom is built from the ground up around bleeding edge AI
              techniques. Our entire stack, from change analysis to test
              execution to data review, is powered by generative AI.
              <br />
              <br />
              We deliver a level of flexibility that has never been possible
              with traditional testing tools.
            </p>
          </div>
        </div>
        <div className="h-full mb-30">
          <div className="text-center max-w-xl">
            <h2 className="text-4xl mb-2">Backed By</h2>
            <Image
              src="/yc.svg"
              alt="Y Combinator logo"
              width={300}
              height={300}
              className=""
            />
          </div>
        </div>
      </div>
      <div className="min-h-80 bg-[url('/images/banner-med-grad.png')] bg-cover bg-left flex items-center justify-center">
        <Link
          href="/signin"
          className="mt-4 bg-white/50 text-gray-900 hover:bg-gray-100 transition-colors px-4 py-2 rounded-md font-medium text-4xl w-min whitespace-nowrap"
        >
          Schedule a Demo
        </Link>
      </div>
      <footer className="w-full py-6 text-center text-zinc-400 text-sm">
        © 2025 Helium AI. All rights reserved.
      </footer>
    </div>
  );
}
