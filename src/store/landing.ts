import { atom } from 'jotai'

export interface LandingState {
  isVideoLoaded: boolean
  isHeroVisible: boolean
  isAboutVisible: boolean
  isFeaturesVisible: boolean
  activeSection: string
}

export const videoLoadedAtom = atom(false)

export const heroVisibleAtom = atom(false)

export const aboutVisibleAtom = atom(false)

export const featuresVisibleAtom = atom(false)

export const activeSectionAtom = atom('hero')

export const landingStateAtom = atom((get) => ({
  isVideoLoaded: get(videoLoadedAtom),
  isHeroVisible: get(heroVisibleAtom),
  isAboutVisible: get(aboutVisibleAtom),
  isFeaturesVisible: get(featuresVisibleAtom),
  activeSection: get(activeSectionAtom)
}))

export const setVideoLoadedAtom = atom(
  null,
  (_get, set, loaded: boolean) => {
    set(videoLoadedAtom, loaded)
  }
)

export const setSectionVisibilityAtom = atom(
  null,
  (_get, set, { section, visible }: { section: string; visible: boolean }) => {
    switch (section) {
      case 'hero':
        set(heroVisibleAtom, visible)
        break
      case 'about':
        set(aboutVisibleAtom, visible)
        break
      case 'features':
        set(featuresVisibleAtom, visible)
        break
    }
    
    if (visible) {
      set(activeSectionAtom, section)
    }
  }
)