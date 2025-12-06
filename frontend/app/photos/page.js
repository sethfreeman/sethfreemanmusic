import '../photos.css'

export default function Photos() {
  return (
    <div className="photos">
      <h1>Photos</h1>
      
      <div className="instagram-embed">
        <p>Follow Seth on Instagram for the latest photos and updates:</p>
        <a 
          href="https://www.instagram.com/sethfreemanmusic/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="instagram-link"
        >
          @sethfreemanmusic
        </a>
      </div>

      <p className="more-link">
        See more at the <a href="https://www.instagram.com/sethfreemanmusic/" target="_blank" rel="noopener noreferrer">Instagram page</a>.
      </p>
    </div>
  )
}
