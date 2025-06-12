
import "../styles/globals.css";
import ClickSpark from '../components/ClickSpark';
import type { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: 'Vakalatnama',
  description: 'Convenience Portal',
  icons: {
  icon: '/favicon.svg', 
  },
};


  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>
            <ClickSpark
              sparkColor='#fff'
              sparkSize={15}
              sparkRadius={30}
              sparkCount={4}
              duration={300}
            >
              {children}
              <Analytics />
            </ClickSpark>
        </body>
      </html>
    );
  }


  


