import '../music.css'

export default function Music() {
  return (
    <div className="music">
      <h1>Music</h1>
      
      <div className="music-content">
        <p>Seth's music can be found on:</p>
        
        <div className="music-platforms">
          <a href="https://sethfreeman.bandcamp.com/" target="_blank" rel="noopener noreferrer">BandCamp</a>
          <a href="https://www.reverbnation.com/sethfreeman" target="_blank" rel="noopener noreferrer">ReverbNation</a>
          <a href="https://music.apple.com/us/artist/seth-freeman/1031393197" target="_blank" rel="noopener noreferrer">iTunes / Apple Music</a>
          <a href="https://open.spotify.com/artist/4VTNwGyq01beyw46MzTa67" target="_blank" rel="noopener noreferrer">Spotify</a>
          <a href="https://music.amazon.com/artists/B0DYCY3W1F/seth-freeman" target="_blank" rel="noopener noreferrer">Amazon Music</a>
        </div>

        <p className="projects-intro">Also see Seth's songwriting team <a href="https://freemanoleary.com" target="_blank" rel="noopener noreferrer">Freeman / O'Leary</a> and Seth's band <a href="https://stillspark.com" target="_blank" rel="noopener noreferrer">Still Spark</a>.</p>

        <div className="social-section">
          <p>Visit Seth's social media pages at:</p>
          <div className="social-platforms">
            <a href="https://www.facebook.com/sethfreemanmusic" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com/sethfreeman" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://www.instagram.com/sethfreemanmusic/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.youtube.com/rockerseth" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>
      </div>
    </div>
  )
}
