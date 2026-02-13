import './globals.css';

export const metadata = {
  title: 'Avalanche Institutional Dashboard',
  description: 'Digital Asset Trusts & ETFs holding $AVAX',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
