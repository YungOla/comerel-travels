import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WhatsAppFloat } from "../components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Comerel Travels - Premium Global Flight & Hotel Booking Platform",
  description: "Book flights, hotels, visa assistance and luxury travel experiences globally with Comerel Travels.",
  keywords: ["Comerel Travels", "flights booking", "luxury hotel booking", "visa assistance", "global travel concierge"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased min-h-screen flex flex-col justify-between">
        <AppProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <WhatsAppFloat />
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
