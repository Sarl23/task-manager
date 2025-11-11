import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Providers } from "./providers";
import { Header } from "@/components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  );
}
