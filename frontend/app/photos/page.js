import Image from 'next/image'
import '../photos.css'

export default function Photos() {
  return (
    <div className="photos">
      <h1>Photos</h1>

      <div className="photo-grid">
        <div className="photo-item">
          <Image
            src="/images/seth-freeman-promo-01.jpg"
            alt="Seth Freeman promotional photo"
            width={1500}
            height={1904}
            sizes="(max-width: 768px) 100vw, 380px"
            priority
          />
        </div>
        <div className="photo-item">
          <Image
            src="/images/seth-freeman-promo-02.jpg"
            alt="Seth Freeman promotional photo"
            width={4032}
            height={3024}
            sizes="(max-width: 768px) 100vw, 380px"
          />
        </div>
      </div>

      <p className="more-link">
        See more at the <a href="https://www.instagram.com/sethfreemanmusic/" target="_blank" rel="noopener noreferrer">Instagram page</a>.
      </p>
    </div>
  )
}
