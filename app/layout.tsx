import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from "@/app/providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Kaleido",
    description: "Kaleido empowers you to generate unique content, connect with a vibrant community, and own your creations as NFTs.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className} style={{background:'#DCC1FF'}}>
                <div className="mx-20 max-sm:mx-5">
                    <Providers>
                        {children}
                    </Providers>
                </div>
            </body>
        </html>
    );
}
