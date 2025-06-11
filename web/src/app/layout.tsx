
import "../styles/globals.css";
import ClickSpark from '../components/ClickSpark';


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
            </ClickSpark>
        </body>
      </html>
    );
  }


  


