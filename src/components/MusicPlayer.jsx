import { useState, useEffect, useRef } from 'react'

const MUSIC_URL = 'https://raw.githubusercontent.com/zyx-0715/something/5b26b80af9d268e7dc0e3f27ece6f3e699c37310/music/music.mp3'

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [musicBlob, setMusicBlob] = useState(null)

  // 先下載音樂檔案
  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await fetch(MUSIC_URL)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setMusicBlob(url)
        console.log('✅ 音樂檔案已載入')
      } catch (err) {
        console.error('❌ 下載音樂失敗:', err)
      }
    }
    fetchMusic()
  }, [])

  // 點擊開始播放
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || started || !musicBlob) return

    const startMusic = async () => {
      try {
        audio.volume = 0.5
        await audio.play()
        setStarted(true)
        console.log('✅ 音樂開始播放')
      } catch (err) {
        console.error('❌ 播放失敗:', err)
      }
    }

    window.addEventListener('click', startMusic, { once: true })
    window.addEventListener('touchstart', startMusic, { once: true })

    return () => {
      window.removeEventListener('click', startMusic)
      window.removeEventListener('touchstart', startMusic)
    }
  }, [started, musicBlob])

  return (
    <audio
      ref={audioRef}
      src={musicBlob}
      loop
    />
  )
}
