import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "RecTrack",
  description: "A tool for tracking & analyzing your receipts using AI",
  icons: {
    icon: "/convex.svg",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background", poppins.variable)}>
        <ClerkProvider dynamic>
          <ConvexClientProvider>
            <Header />
            <main>{children}</main>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
