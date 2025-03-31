import { CodePreview } from "@/app/landing/code-preview";

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <div className="h-[90vh] w-full hero bg-[url('/images/hero-bg-2.png')] bg-cover bg-left">
        <div className="h-full flex flex-col sm:flex-row justify-around items-center gap-12 px-4">
          <div className="flex flex-col">
            <h1 className="hero-text">Test Anything</h1>
            <h2 className="hero-subtext">AI-Native Verification</h2>
          </div>
          <div className="w-full max-w-2xl">
            <CodePreview />
          </div>
        </div>
      </div>
      <div className="h-[100vh] flex flex-1 flex-col gap-5 px-4 pt-7 pb-10 w-full">
        <div className="grid auto-rows-min gap-7 md:grid-cols-3 h-min-content">
          <div className="rounded-xl h-full bg-muted-foreground"></div>
          <div className="rounded-xl h-full bg-muted-foreground"></div>
          <div className="rounded-xl h-full bg-muted-foreground"></div>
        </div>
      </div>
    </div>
  );
}
