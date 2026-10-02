import Link from 'next/link'
import ObfuscatedEmail from '../components/ObfuscatedEmail'
import './epk.css'

export const metadata = {
  title: 'Press Kit | Seth Freeman',
  description: 'Electronic press kit for Seth Freeman — bio, photos, and music links.',
}

export default function Epk() {
  return (
    <div className="epk-page">
      <h1>Electronic Press Kit</h1>

      <section className="epk-section">
        <h2>About</h2>
        <p>
          Seth Freeman is a multifaceted singer, songwriter, and guitarist known for his soulful
          performances and heartwarming storytelling. A graduate of Berklee College of Music, he
          has performed from Boston to L.A. — including a standout appearance at the WBCN Rumble —
          and continues to tour the country. With his band{' '}
          <a href="https://littlejohnrocks.com" target="_blank" rel="noopener noreferrer">Little John</a>{' '}
          he signed with EMI Records and earned a Boston Music Awards nod for Best New Artist. He
          landed in the singer-songwriter alt-country roots-rock arena with his debut solo record
          &ldquo;One And Only Maybe,&rdquo; followed by the solo acoustic record &ldquo;Heart
          Back,&rdquo; and most recently the compilation of his three-EP trilogy &ldquo;Took To The
          Air.&rdquo; Now rooted in Central Arkansas, he writes with his songwriting team{' '}
          <a href="https://freemanoleary.com" target="_blank" rel="noopener noreferrer">Freeman / O&apos;Leary</a>{' '}
          and performs with{' '}
          <a href="https://stillspark.com" target="_blank" rel="noopener noreferrer">Still Spark</a>.
        </p>
        <p>
          <Link href="/bio">Read the full bio</Link>.
        </p>
      </section>

      <section className="epk-section">
        <h2>Photos</h2>
        <p>
          Browse current photos on{' '}
          <a href="https://www.instagram.com/sethfreemanmusic/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          . High-resolution press photos are available on request.
        </p>
      </section>

      <section className="epk-section">
        <h2>Music</h2>
        <div className="epk-links">
          <a href="https://music.apple.com/us/artist/seth-freeman/1031393197" target="_blank" rel="noopener noreferrer">
            Apple Music
          </a>
          <a href="https://open.spotify.com/artist/4VTNwGyq01beyw46MzTa67" target="_blank" rel="noopener noreferrer">
            Spotify
          </a>
          <a href="https://music.amazon.com/artists/B0DYCY3W1F/seth-freeman" target="_blank" rel="noopener noreferrer">
            Amazon Music
          </a>
          <a href="https://sethfreeman.bandcamp.com/" target="_blank" rel="noopener noreferrer">
            Bandcamp
          </a>
        </div>
      </section>

      <section className="epk-section">
        <h2>Contact</h2>
        <p>
          Booking &amp; press: <ObfuscatedEmail user="seth" domain="sethfreemanmusic.com" />
        </p>
      </section>
    </div>
  )
}
