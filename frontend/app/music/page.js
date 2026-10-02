import '../music.css'

export const metadata = {
  title: 'Music | Seth Freeman',
  description: 'Listen to Seth Freeman on your favorite streaming platform.',
}

const platforms = [
  { name: 'Apple Music', href: 'https://music.apple.com/us/artist/seth-freeman/1031393197' },
  { name: 'Spotify', href: 'https://open.spotify.com/artist/4VTNwGyq01beyw46MzTa67' },
  { name: 'Amazon Music', href: 'https://music.amazon.com/artists/B0DYCY3W1F/seth-freeman' },
  { name: 'Bandcamp', href: 'https://sethfreeman.bandcamp.com/' },
  { name: 'ReverbNation', href: 'https://www.reverbnation.com/sethfreeman' },
]

const projects = [
  {
    name: 'Still Spark',
    href: 'https://www.stillspark.com',
    note: 'Soulful Americana band',
  },
  {
    name: 'Little John',
    href: 'https://www.littlejohnrocks.com',
    note: 'Melodic alt-rock band',
  },
  {
    name: 'Freeman / O\u2019Leary',
    href: 'https://freemanoleary.com',
    note: 'Songwriting team',
  },
]

const socials = [
  { name: 'Facebook', href: 'https://www.facebook.com/sethfreemanmusic' },
  { name: 'Instagram', href: 'https://www.instagram.com/sethfreemanmusic/' },
  { name: 'YouTube', href: 'https://www.youtube.com/@SethFreeman' },
  { name: 'X / Twitter', href: 'https://x.com/SethFreeman' },
]

export default function Music() {
  return (
    <div className="music-page">
      <h1>Music</h1>
      <p className="intro">
        Soulful singer-songwriter storytelling, from Berklee to Central Arkansas.
        Stream Seth Freeman wherever you listen.
      </p>

      <section className="platforms" aria-label="Streaming platforms">
        {platforms.map((p) => (
          <a
            key={p.name}
            className="platform-button"
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {p.name}
          </a>
        ))}
      </section>

      <section className="projects">
        <h2>Projects</h2>
        <div className="project-buttons">
          {projects.map((proj) => (
            <a
              key={proj.name}
              className="project-button"
              href={proj.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="project-name">{proj.name}</span>
              <span className="project-note">{proj.note}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="socials" aria-label="Social media">
        <h2>Follow</h2>
        <div className="social-buttons">
          {socials.map((s) => (
            <a
              key={s.name}
              className="platform-button"
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.name}
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
