import './globals.css';

export const metadata = {
  title: 'FintechEngine - Modern Ledger Ecosystem',
  description: 'Enterprise resource tracking application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-slate-900 selection:bg-emerald-500 selection:text-slate-900">
      <body className="h-full font-sans antialiased text-slate-100">{children}</body>
    </html>
  );
}