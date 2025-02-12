import "./globals.css";
import Navigation from "@/components/Navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orion Tech Studio",
  description: "Building Digital Experiences People Remember",
  openGraph: {
    title: "Orion Tech Studio",
    description: "Building Digital Experiences People Remember",
    url: "https://oriontech.site",
    siteName: "Orion Tech Studio",
    images: [
      {
        url: "https://oriontech.site/images/Preview.jpg",
        width: 1200,
        height: 630,
        alt: "Orion Tech Studio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orion Tech Studio",
    description: "Innovative tech solutions at Orion Tech.",
    images: ["https://oriontech.site/images/Preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
