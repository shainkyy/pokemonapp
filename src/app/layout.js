import localFont from "next/font/local";
import "./globals.css";
import { PokemonProvider } from "./context/PokemonDetailsContext";
import { PokemonTypeProvider } from "./context/PokemonsByTypeContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Pokemon Search App",
  description: "Generated by shainky yadav",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PokemonTypeProvider>
          <PokemonProvider>{children}</PokemonProvider>
        </PokemonTypeProvider>
      </body>
    </html>
  );
}
