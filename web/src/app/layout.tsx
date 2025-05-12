import { ReactNode } from 'react';
import { Major_Mono_Display } from 'next/font/google';

const majorMono = Major_Mono_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-major-mono',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${majorMono.className}`}>
        
        <body>
            
            {children}
        </body>
    </html>
  );
}
