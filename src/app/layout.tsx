import type { Metadata } from "next";

import "./globals.css";
import { Header } from "@/components/header";
import { AuthProvider } from "@/providers/auth";
import { ModalProvider } from '@/providers/modal';

export const metadata: Metadata = {
  title: "Go Nuts Client Contorl - System to manage your clients",
  description: "Manage you clients in a eay way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ModalProvider>
            <Header/>
            {children}
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
