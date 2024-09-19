import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import NavigationBar from "../components/mentors/navigation-bar";
import MentorFooter from "../components/mentors/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nikonekti | Mentorship",
  description: "Empower students to achieve their career goals with our mentorship platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-svh w-full`}
      >
        <UserProvider>
          <div className="h-full w-full flex flex-col gap-2">
            <NavigationBar />
            <div className="">
              {children}
            </div>
            <div>
              <MentorFooter />
            </div>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
