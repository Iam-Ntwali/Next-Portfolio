import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://iamnntwali.me"),

  title: "Pacifique Ntwali 🇷🇼",
  authors: {
    name: "Ntwali",
  },

  description:
    "I am a Tech and Web Developer based in Rwanda 🇷🇼, dedicated to crafting digital experiences that thrive on the internet 🙂",
  openGraph: {
    title: "Ntwali Portfolio Website",
    description:
      "I am a Tech and Web Developer based in Rwanda 🇷🇼, dedicated to crafting digital experiences that thrive on the internet. 🙂",
    url: "https://iamntwali.me/",
    siteName: "Daily Vote",
    images: "/Project-Img1.png",
    type: "website",
  },
  keywords: [
    "portfolio",
    "Pacifique ntwali",
    "tech enthusiast",
    "fullstack dev",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={spaceGrotesk.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
