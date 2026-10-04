import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import PortfolioPreloader from "@/components/PortfolioPreloader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const fira = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Smitraj Makvana | Full-Stack Developer",
  description:
    "Portfolio of Smitraj Makvana — Full-Stack Developer building web apps with React, Next.js, Nest.js, Node.js, MongoDB, and PostgreSQL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${fira.variable} bg-slate-950 text-slate-100 font-sans antialiased selection:bg-brand-500 selection:text-white`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!sessionStorage.getItem("sm-portfolio-booted")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("preloader-active")}}catch(e){}`,
          }}
        />
        <PortfolioPreloader />
        {children}
      </body>
    </html>
  );
}
