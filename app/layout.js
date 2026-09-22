import "./globals.css";

export const metadata = {
  title: "Genesis Vidyapeeth — Digital Campus",
  description: "Premium school management and learning platform."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
