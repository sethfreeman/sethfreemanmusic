'use client'

import { useEffect } from 'react'
import './tips.css'

export default function TipsPage() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = '//widget.songkick.com/9050329/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="tips-container">
      <h1 className="tips-title">Tip Jar</h1>
      <p className="tips-subtitle">Thank you for the support!</p>
      <p className="tips-merch">Hats and T-Shirts are $20</p>

      <div className="tip-links">

        {/* Venmo */}
        <a
          href="https://venmo.com/Seth-Freeman-21"
          target="_blank"
          rel="noopener noreferrer"
          className="tip-button"
          aria-label="Tip on Venmo"
        >
          <svg className="tip-logo" viewBox="0 0 111 111" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="111" height="111" rx="20" fill="#3D95CE"/>
            <path d="M82.5 22c2.9 4.8 4.2 9.7 4.2 16C86.7 57.5 68.2 80 53.8 91H22L9.5 20h28.3l6.3 50.8C53.3 61.7 62 45.8 62 33.8c0-6.7-1.2-11.2-3-14.8L82.5 22z" fill="white"/>
          </svg>
          <span>Venmo</span>
          <span className="tip-handle">@Seth-Freeman-21</span>
        </a>

        {/* PayPal */}
        <a
          href="https://paypal.me/sethfreemanmusic"
          target="_blank"
          rel="noopener noreferrer"
          className="tip-button"
          aria-label="Tip on PayPal"
        >
          <svg className="tip-logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" fill="#009cde"/>
            <path d="M6.635 8.925c.088-.562.451-.998.94-1.118.226-.056.46-.08.7-.08h5.09c.604 0 1.167.04 1.678.123.148.024.292.052.43.085.138.032.271.069.399.111.065.021.128.043.19.067.24.091.463.202.664.336.24-1.527-.002-2.565-1.027-3.505-1.13-1.04-3.173-1.484-5.784-1.484H6.455c-.524 0-.968.382-1.05.9L2.79 20.28a.641.641 0 0 0 .633.74h4.607l1.157-7.343-2.552-4.752z" fill="#012169"/>
          </svg>
          <span>PayPal</span>
          <span className="tip-handle">@sethfreemanmusic</span>
        </a>

        {/* Cash App */}
        <a
          href="https://cash.app/$manfreeseth"
          target="_blank"
          rel="noopener noreferrer"
          className="tip-button"
          aria-label="Tip on Cash App"
        >
          <svg className="tip-logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="5" fill="#00D54B"/>
            <path d="M15.34 8.27c-.56-.46-1.32-.73-2.18-.77l-.22-1.04a.28.28 0 0 0-.27-.21h-1.12a.28.28 0 0 0-.27.34l.21.97c-.55.05-1.06.18-1.5.4-.7.34-1.19.9-1.3 1.56-.1.6.07 1.16.49 1.58.38.38.94.65 1.72.82l.87.19c.56.12.93.27 1.1.44.14.14.19.32.15.55-.08.44-.57.72-1.29.72-.59 0-1.06-.14-1.38-.4-.24-.2-.38-.47-.4-.8a.28.28 0 0 0-.28-.26H8.2a.28.28 0 0 0-.28.3c.06.82.44 1.5 1.09 1.97.57.42 1.33.67 2.2.73l.22 1.04c.05.22.24.37.47.37h1.1a.28.28 0 0 0 .27-.34l-.21-.98c.62-.06 1.18-.21 1.64-.47.71-.39 1.17-.99 1.27-1.68.1-.63-.08-1.2-.52-1.63-.38-.37-.95-.64-1.76-.81l-.85-.18c-.53-.11-.88-.26-1.04-.42a.52.52 0 0 1-.13-.5c.08-.42.54-.68 1.21-.68.52 0 .93.12 1.22.36.21.17.34.41.38.7.03.16.17.27.33.27h1.47c.17 0 .3-.14.28-.31-.1-.75-.48-1.38-1.12-1.83z" fill="white"/>
          </svg>
          <span>Cash App</span>
          <span className="tip-handle">$manfreeseth</span>
        </a>

      </div>

      <div className="shows-section">
        <h2 className="shows-title">Upcoming Shows</h2>
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
    </div>
  )
}
