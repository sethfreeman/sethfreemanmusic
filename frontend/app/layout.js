import Link from 'next/link'
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
          <nav className="navbar">
            <div className="navbar-left">
              <h1>Seth Freeman</h1>
              <p className="tagline">Singer / Songwriter</p>
            </div>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/music">Music</Link></li>
              <li><Link href="/photos">Photos</Link></li>
              <li><Link href="/video">Video</Link></li>
              <li><Link href="/bio">Bio</Link></li>
              <li><Link href="/shows">Tour</Link></li>
            </ul>
          </nav>
          
          <main>
            {children}
          </main>
          
          <footer>
            <p>&copy; 2025 Seth Freeman Music. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
