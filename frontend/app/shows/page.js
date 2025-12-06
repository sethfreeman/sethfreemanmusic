'use client'

import { useEffect } from 'react'
import '../shows.css'

export default function Shows() {
  useEffect(() => {
    // Load Songkick widget script
    const script = document.createElement('script')
    script.src = '//widget.songkick.com/9050329/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="shows">
      <h1>Tour Dates</h1>
      <div className="songkick-container">
        <a 
          href="https://www.songkick.com/artists/9050329" 
          className="songkick-widget" 
          data-theme="dark" 
          data-track-button="on" 
          data-detect-style="true" 
          data-background-color="transparent"
        >
          Seth Freeman tour dates
        </a>
      </div>
    </div>
  )
}
