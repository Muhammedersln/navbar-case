import './globals.css';

export const metadata = {
  title: 'TripKolic Tours',
  description: 'Find and book amazing tours around the world',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}
