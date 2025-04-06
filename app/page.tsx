import { LandingFeature } from "@/components/landing/landing-feature";
import { FeatureWrapper } from "@/components/landing/feature-wrapper";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col bg-zinc-900">
      <div className="min-h-[90vh] w-full hero bg-[url('/images/hero-bg-2.png')] bg-cover bg-left pb-10">
        <div className="h-full flex flex-col justify-around items-center gap-12 px-15 sm:px-20">
          <div className="flex flex-col max-w-2xl items-center text-center mt-[30vh] sm:mt-[40vh]">
            <h1 className="hero-text">Fortify your Product</h1>
            <h2 className="hero-subtext">
              Protect against costly real-world failures with AI-Agents for
              Hardware Verification.
            </h2>
            <Link
              href={
                process.env.BOOK_DEMO_URL ||
                "mailto:founders@halidom.ai?subject=Demo"
              }
              className="mt-4 bg-[#4494FD] text-white hover:bg-gray-600 transition-colors px-4 py-2 rounded-md font-medium w-min whitespace-nowrap"
            >
              Schedule a Demo
            </Link>
          </div>
          <div className="w-full max-w-5xl sm:mt-40">
            <FeatureWrapper>
              <LandingFeature />
            </FeatureWrapper>
          </div>
        </div>
      </div>
      <div className="min-h-80 flex flex-1 flex-col gap-5 w-full px-15 sm:px-40 justify-center items-center">
        <div className="h-full mt-20">
          <div className="text-center max-w-3xl">
            <h2 className="text-4xl">HIL and SIL</h2>
            <p className="text-gray-300 text-lg">
              Our framework is designed for both hardware-in-the-loop (HIL) and
              software-in-the-loop (SIL) environments–reducing the friction of
              setting up and running tests. Tests are written to execute
              remotely and intelligently in all environments.
            </p>
          </div>
        </div>
        <div className="w-1/2 border-b border-gray-500 my-20" />
        <div className="h-full mb-30 grid auto-rows-min gap-30 lg:gap-7 lg:grid-cols-3">
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
        <div className="h-full mt-20">
          <div className="text-center max-w-xl">
            <h2 className="text-4xl">AI Native</h2>
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
        <div className="w-1/2 border-b border-gray-500 my-20" />
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
          href={
            process.env.BOOK_DEMO_URL ||
            "mailto:founders@halidom.ai?subject=Demo"
          }
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
