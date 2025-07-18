import type { Metadata } from "next";
import { Geist, Geist_Mono, DotGothic16 } from "next/font/google";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dotGothic16 = DotGothic16({
  variable: "--font-dotgothic16",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Halidom",
  description:
    "Protect against costly failures with AI agents for firmware and hardware verification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dotGothic16.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <AppHeader />
            <main style={{ flex: 1 }}>
              {children}
              <SpeedInsights />
              <Analytics />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
