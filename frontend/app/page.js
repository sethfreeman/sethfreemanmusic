import './home.css'

export default function Home() {
  return (
    <div className="home-wrapper">
      <div className="hero-section" style={{ backgroundImage: 'url(/header-bg.jpg)' }}>
        <div className="hero-overlay"></div>
      </div>

      <div className="home-content">
        <div className="bio-section">
          <p className="bio-text">
            <strong>SETH FREEMAN</strong> is a multifaceted singer, songwriter, and guitarist, known for his soulful performances and heartwarming storytelling. Teaming up with <a href="https://freemanoleary.com" target="_blank" rel="noopener noreferrer">Freeman/O'Leary</a> to create songs for <strong><a href="https://stillspark.com" target="_blank" rel="noopener noreferrer">Still Spark</a></strong>, Seth has penned numerous tunes and landed multiple film placements. A proud graduate of Berklee College of Music, he's performed from Boston to L.A., with a standout appearance at the WBCN Rumble, and continues to tour the country. With his band <strong><a href="https://littlejohnrocks.com" target="_blank" rel="noopener noreferrer">Little John</a></strong>, he inked a deal with EMI Records and snagged a Boston Music Awards nod for Best New Artist. Now rooted in Central Arkansas with his wife and family, Seth's latest songs draw inspiration from the simple joys of rural life, God, dogs, trucks, kids, friends, and fond memories.
          </p>
        </div>

        <div className="music-links">
          <a href="https://music.apple.com/us/artist/seth-freeman/1031393197" target="_blank" rel="noopener noreferrer" className="music-button">Apple Music</a>
          <a href="https://open.spotify.com/artist/4VTNwGyq01beyw46MzTa67" target="_blank" rel="noopener noreferrer" className="music-button">Spotify</a>
          <a href="https://music.amazon.com/artists/B0DYCY3W1F/seth-freeman" target="_blank" rel="noopener noreferrer" className="music-button">Amazon Music</a>
        </div>

        <div className="project-links">
          <a href="https://freemanoleary.com" target="_blank" rel="noopener noreferrer" className="project-button">Freeman O'Leary</a>
          <a href="https://stillspark.com" target="_blank" rel="noopener noreferrer" className="project-button">Still Spark</a>
          <a href="https://littlejohnrocks.com" target="_blank" rel="noopener noreferrer" className="project-button">Little John</a>
        </div>

      </div>
    </div>
  )
}
