import { Rubik } from "next/font/google";
import "./globals.css";

import dynamic from 'next/dynamic'
 
const Navigation = dynamic(() => import('@/components/Nav'), {
  ssr: false,
})
import Provider from "@/components/Provider";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Learning Next JS",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Provider>
          <div className="bg-background w-screen flex-col flex items-center">
            <Navigation />
            <main>{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
