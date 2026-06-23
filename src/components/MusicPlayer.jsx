import { useState, useEffect, useRef } from 'react'

// 暫時用測試音樂檢查是否能播
const MUSIC_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || started) return

    const startMusic = async () => {
      try {
        audio.volume = 0.5
        await audio.play()
        setStarted(true)
        console.log('✅ 音樂開始播放')
      } catch (err) {
        console.log('❌ 播放失敗:', err)
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
      crossOrigin="anonymous"
      loop
    />
  )
}
