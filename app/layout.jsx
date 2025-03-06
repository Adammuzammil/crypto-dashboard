import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/AuthContext";
import AuthLayout from "@/AuthLayout";

const plus = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Kaizen",
  description:
    "Kaizen is a powerful cryptocurrency dashboard that provides real-time crypto prices, market trends, and detailed insights into your favorite digital assets. Stay informed and make smarter investment decisions.",
  keywords: [
    "Kaizen",
    "Crypto Dashboard",
    "Cryptocurrency Prices",
    "Bitcoin",
    "Ethereum",
    "Market Trends",
    "Crypto Tracker",
    "Crypto News",
    "Blockchain",
    "Digital Assets",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={plus.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <AuthLayout>
              <main>{children}</main>
            </AuthLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
