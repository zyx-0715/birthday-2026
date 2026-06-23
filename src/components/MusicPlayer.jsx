import { useState, useEffect, useRef } from 'react'

const MUSIC_URL = 'https://github.com/zyx-0715/something/raw/main/music/music.mp3'

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || started) return

    const startMusic = async () => {
      try {
        audio.volume = 0.5
        const promise = audio.play()
        if (promise instanceof Promise) {
          promise
            .then(() => {
              setStarted(true)
              console.log('✅ 音樂開始播放')
            })
            .catch(err => {
              console.error('❌ 播放失敗:', err.message)
            })
        }
      } catch (err) {
        console.error('❌ 錯誤:', err)
      }
    }

    window.addEventListener('click', startMusic, { once: true })
    window.addEventListener('touchstart', startMusic, { once: true })

    return () => {
      window.removeEventListener('click', startMusic)
      window.removeEventListener('touchstart', startMusic)
    }
  }, [started])

  return (
    <audio
      ref={audioRef}
      src={MUSIC_URL}
      loop
    />
  )
}
