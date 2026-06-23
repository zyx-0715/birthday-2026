import { useState, useEffect, useRef } from 'react'

const MUSIC_URL = 'https://github.com/zyx-0715/something/raw/main/music/music.mp3'

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // 進網站後立即嘗試播放（可能被瀏覽器阻擋）
    const attemptAutoPlay = async () => {
      try {
        audio.volume = 0.5
        const promise = audio.play()
        if (promise instanceof Promise) {
          promise
            .then(() => {
              setStarted(true)
              console.log('✅ 自動播放成功')
            })
            .catch(err => {
              console.log('⚠️ 自動播放被阻擋，需要使用者互動')
              // 自動播放失敗，改成點擊才播
              setupClickToPlay()
            })
        }
      } catch (err) {
        console.error('❌ 錯誤:', err)
      }
    }

    // 延遲 500ms 再自動播（確保 audio 載入完成）
    const timer = setTimeout(attemptAutoPlay, 500)
    return () => clearTimeout(timer)
  }, [])

  // 點擊備用方案
  const setupClickToPlay = () => {
    const handleClick = async () => {
      try {
        const audio = audioRef.current
        if (audio && !started) {
          audio.volume = 0.5
          const promise = audio.play()
          if (promise instanceof Promise) {
            promise
              .then(() => {
                setStarted(true)
                console.log('✅ 點擊播放成功')
              })
              .catch(err => console.error('❌ 播放失敗:', err.message))
          }
        }
      } catch (err) {
        console.error('❌ 錯誤:', err)
      }
    }

    window.addEventListener('click', handleClick, { once: true })
    window.addEventListener('touchstart', handleClick, { once: true })
  }

  return (
    <audio
      ref={audioRef}
      src={MUSIC_URL}
      loop
    />
  )
}
