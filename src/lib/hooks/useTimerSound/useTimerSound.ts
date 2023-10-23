import useSound from 'use-sound'

import breakStartAudio from './audio/break-start.mp3'
import overtimeAudio from './audio/overtime.mp3'
import sessionStartAudio from './audio/session-start.mp3'

export function useTimerSound() {
  const [playSessionStart] = useSound(sessionStartAudio)
  const [playOvertime] = useSound(overtimeAudio)
  const [playBreakStart] = useSound(breakStartAudio)

  return {
    playSessionStart,
    playOvertime,
    playBreakStart,
  }
}
