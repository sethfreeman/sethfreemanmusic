import { SpeedInsights } from '@vercel/speed-insights/next'
import Navbar from './components/Navbar'
import './globals.css'

export const metadata = {
  title: 'Seth Freeman Music',
  description: 'Seth Freeman - Singer / Songwriter',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="App">
          <Navbar />
          
          <main>
            {children}
          </main>
          
          <footer>
            <p>&copy; 2025 Seth Freeman Music. All rights reserved.</p>
          </footer>
        </div>
        <SpeedInsights />
      </body>
    </html>
  )
}
