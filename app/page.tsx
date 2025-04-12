import { LandingFeature } from "@/components/landing/landing-feature";
import { FeatureWrapper } from "@/components/landing/feature-wrapper";
import Link from "next/link";
import Image from "next/image";
import { getImageProps } from "next/image";

function getBackgroundImage(srcSet = "") {
  const imageSet = srcSet
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");
  return `image-set(${imageSet})`;
}

export default function Home() {
  const getBackgroundStyle = (
    src: string,
    width: number,
    height: number,
    priority: boolean = false,
  ) => {
    const {
      props: { srcSet },
    } = getImageProps({
      alt: "Background Image",
      width,
      height,
      quality: 100,
      priority,
      blurDataURL: src,
      placeholder: "blur",
      src,
    });
    const backgroundImage = getBackgroundImage(srcSet);
    return { backgroundImage };
  };

  const bgStyle = getBackgroundStyle("/images/hero-bg-2.png", 1920, 1080, true);
  const bgStyle2 = getBackgroundStyle(
    "/images/landing-section-alt.png",
    1920,
    1080,
    false,
  );
  const bgStyle3 = getBackgroundStyle(
    "/images/banner-med-grad.png",
    1920,
    1080,
    false,
  );

  return (
    <div className="flex flex-col bg-zinc-900">
      <div
        className="min-h-[90vh] w-full hero bg-cover bg-left pb-10"
        style={bgStyle}
      >
        <div className="h-full flex flex-col justify-around items-center gap-12 px-5 sm:px-20">
          <div className="flex flex-col mb-5 sm:mb-0 items-center text-center mt-[23vh] sm:mt-[40vh]">
            <h1 className="hero-text">Prevent Production Disasters</h1>
            <h2 className="hero-subtext px-10 sm:px-0 max-w-xl">
              Protect against costly failures with AI agents for firmware and
              hardware verification.
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
            <h2 className="text-4xl mb-2">
              One Platform. Any Test Environment.
            </h2>
            <p className="text-gray-300 text-lg">
              Whether your team tests with physical hardware, simulations, or
              digital twins, Halidom helps you ship faster and catch issues
              earlier. We integrate directly with your hardware-in-the-loop
              (HIL) and software-in-the-loop (SIL) environments, enabling
              frictionless test setup and execution for even the most complex
              systems.
            </p>
          </div>
        </div>
        <div className="w-1/2 border-b border-gray-500 my-20" />
        <div className="h-full mb-30 grid auto-rows-min gap-30 lg:gap-7 lg:grid-cols-3">
          <div className="text-center max-w-sm">
            <h2 className="text-4xl mb-2">
              Automated <br /> Test Planning
            </h2>
            <p className="text-gray-300 text-lg">
              Our AI agents generate tailored test plans for every code change,
              revealing issues even your most diligent engineers might miss.
            </p>
          </div>

          <div className="text-center max-w-sm">
            <h2 className="text-4xl mb-2">Comprehensive Verification</h2>
            <p className="text-gray-300 text-lg">
              From new features to regressions, Halidom verifies that your
              system behaves exactly as expected, every time.
            </p>
          </div>

          <div className="text-center max-w-sm">
            <h2 className="text-4xl mb-2"> Compliance-Ready Reporting </h2>
            <p className="text-gray-300 text-lg">
              Get instant insights into how changes impact your system with
              auto-generated reports for audits, certifications, and safety
              standards.
            </p>
          </div>
        </div>
      </div>
      <div
        className="min-h-[90vh] bg-cover bg-left flex flex-1 flex-col justify-center gap-5 w-full items-start sm:items-center overflow-hidden"
        style={bgStyle2}
      >
        <Image
          src="/images/envs-screenshot.png"
          alt="Environment Management"
          width={1000}
          height={1000}
          className="h-[80vh] w-auto max-w-none sm:h-auto sm:w-full sm:max-w-9/10 xl:max-w-3/4 sm:rounded-lg"
        />
      </div>
      <div className="min-h-80 flex flex-1 flex-col gap-5 w-full px-15 sm:px-40 justify-center items-center">
        <div className="h-full mt-20">
          <div className="text-center max-w-3xl">
            <h2 className="text-4xl mb-2">
              AI Native, Built for the Physical World.
            </h2>
            <p className="text-gray-300 text-lg">
              Our world-class engineering team has built and validated some of
              the most complex physical systems on Earth — and now we’re
              building the platform we always wished we had.
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
      <div
        className="min-h-80 bg-cover bg-left flex items-center justify-center"
        style={bgStyle3}
      >
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
        © 2025 Halidom. All rights reserved.
      </footer>
    </div>
  );
}
