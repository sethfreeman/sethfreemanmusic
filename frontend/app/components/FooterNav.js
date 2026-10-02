import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/music', label: 'Music' },
  { href: '/photos', label: 'Photos' },
  { href: '/video', label: 'Video' },
  { href: '/bio', label: 'Bio' },
  { href: '/shows', label: 'Tour' },
  { href: '/epk', label: 'Press Kit' },
  { href: '/tips', label: 'Tip Jar' },
  { href: '/members', label: 'Fan Club' },
]

export default function FooterNav() {
  return (
    <nav className="footer-nav" aria-label="Footer navigation">
      {links.map((l, i) => (
        <span key={l.href}>
          {i > 0 && <span className="footer-nav-sep" aria-hidden="true">|</span>}
          <Link href={l.href}>{l.label}</Link>
        </span>
      ))}
    </nav>
  )
}
