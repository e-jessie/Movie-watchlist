// src/app/layout.tsx

import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Movie Watchlist</title>
        {/* Add any other head elements, like meta tags or fonts */}
      </head>
      <body>
          <main>{children}</main>
      </body>
    </html>
  );
}
