import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from "@/app/providers";
import Sidebar from "@/components/common/Sidebar";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className} style={{ background: '#DCC1FF' }}>
                <Providers>
                    <Sidebar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
