'use client'

import { useEffect, useState } from 'react'

// Assembles the address in the browser so it never appears as plaintext
// in the server-rendered HTML that scrapers crawl.
export default function ObfuscatedEmail({ user, domain, className }) {
  const [address, setAddress] = useState(null)

  useEffect(() => {
    setAddress(`${user}@${domain}`)
  }, [user, domain])

  if (!address) {
    // Pre-hydration / no-JS fallback: show the parts without a usable mailto link.
    return (
      <span className={className}>
        {user} [at] {domain}
      </span>
    )
  }

  return (
    <a className={className} href={`mailto:${address}`}>
      {address}
    </a>
  )
}
