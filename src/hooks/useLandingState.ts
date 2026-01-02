import { useAtom, useSetAtom, useAtomValue } from 'jotai'
import { 
  videoLoadedAtom,
  heroVisibleAtom,
  aboutVisibleAtom,
  featuresVisibleAtom,
  activeSectionAtom,
  landingStateAtom,
  setVideoLoadedAtom,
  setSectionVisibilityAtom
} from '@/store/landing'

export const useLandingState = () => {
  return useAtomValue(landingStateAtom)
}

export const useVideoLoaded = () => {
  const videoLoaded = useAtomValue(videoLoadedAtom)
  const setVideoLoaded = useSetAtom(setVideoLoadedAtom)
  
  return {
    videoLoaded,
    setVideoLoaded
  }
}

export const useSectionVisibility = () => {
  const heroVisible = useAtomValue(heroVisibleAtom)
  const aboutVisible = useAtomValue(aboutVisibleAtom)
  const featuresVisible = useAtomValue(featuresVisibleAtom)
  const activeSection = useAtomValue(activeSectionAtom)
  const setSectionVisibility = useSetAtom(setSectionVisibilityAtom)
  
  return {
    heroVisible,
    aboutVisible,
    featuresVisible,
    activeSection,
    setSectionVisibility
  }
}

export const useActiveSection = () => {
  return useAtomValue(activeSectionAtom)
}