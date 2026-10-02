'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import './Navbar.css'

const baseLinks = [
  { href: '/', label: 'Home' },
  { href: '/music', label: 'Music' },
  { href: '/photos', label: 'Photos' },
  { href: '/video', label: 'Video' },
  { href: '/bio', label: 'Bio' },
  { href: '/shows', label: 'Tour' },
  { href: '/tips', label: 'Tip Jar' },
  { href: '/members', label: 'Fan Club' },
]

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        checkIfAdmin()
      } else {
        setIsAdmin(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    if (user) {
      await checkIfAdmin()
    }
  }

  const checkIfAdmin = async () => {
    const { data, error } = await supabase.rpc('is_admin')
    if (!error && data === true) {
      setIsAdmin(true)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsAdmin(false)
    setOpen(false)
    window.location.href = '/'
  }

  const closeMenu = () => setOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Seth Freeman</h1>
        <p className="tagline">Singer / Songwriter</p>
      </div>

      <button
        type="button"
        className="nav-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        aria-controls="primary-nav"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`hamburger ${open ? 'is-open' : ''}`} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <ul id="primary-nav" className={open ? 'is-open' : ''}>
        {baseLinks.map((l) => (
          <li key={l.href}>
            <Link href={l.href} onClick={closeMenu}>{l.label}</Link>
          </li>
        ))}
        {isAdmin && (
          <li><Link href="/admin" onClick={closeMenu}>Admin</Link></li>
        )}
        {user && (
          <li><Link href="/profile" onClick={closeMenu}>Profile</Link></li>
        )}
        {user ? (
          <li>
            <button type="button" className="nav-link-button" onClick={handleSignOut}>
              Sign Out
            </button>
          </li>
        ) : (
          <li><Link href="/login" onClick={closeMenu}>Sign In</Link></li>
        )}
      </ul>
    </nav>
  )
}
