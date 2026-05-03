"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type HairType = 'straight' | 'wavy' | 'curly' | 'coily'
export type HairCondition = 'dry' | 'oily' | 'normal' | 'damaged'
export type ScalpCondition = 'dandruff' | 'itchy' | 'healthy'
export type Concern = 'hairfall' | 'frizz' | 'thinning' | 'splitends'
export type SleepQuality = 'good' | 'poor'
export type StressLevel = 'low' | 'high'
export type WaterType = 'hard' | 'soft'

export interface UserProfile {
  name: string
  hairType: HairType | null
  hairCondition: HairCondition | null
  scalpCondition: ScalpCondition | null
  concerns: Concern[]
  sleep: SleepQuality | null
  stress: StressLevel | null
  location: string
  waterType: WaterType | null
}

export interface ProgressEntry {
  date: string
  hairfallLevel: number
  frizzLevel: number
}

export interface RoutineCheckItem {
  id: string
  day: string
  task: string
  completed: boolean
}

interface AppState {
  currentScreen: 'onboarding' | 'quiz' | 'dashboard' | 'routine' | 'products' | 'progress'
  hasCompletedOnboarding: boolean
  userProfile: UserProfile
  progressEntries: ProgressEntry[]
  weeklyRoutine: RoutineCheckItem[]
  remindersEnabled: boolean
  
  setScreen: (screen: AppState['currentScreen']) => void
  completeOnboarding: () => void
  updateProfile: (profile: Partial<UserProfile>) => void
  addProgressEntry: (entry: ProgressEntry) => void
  toggleRoutineItem: (id: string) => void
  toggleReminders: () => void
  generateRoutine: () => void
  resetApp: () => void
}

const defaultProfile: UserProfile = {
  name: '',
  hairType: null,
  hairCondition: null,
  scalpCondition: null,
  concerns: [],
  sleep: null,
  stress: null,
  location: '',
  waterType: null,
}

const generateWeeklyRoutine = (profile: UserProfile): RoutineCheckItem[] => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const routine: RoutineCheckItem[] = []
  
  days.forEach((day, index) => {
    // Oil days - 2-3 times a week based on hair condition
    if (profile.hairCondition === 'dry' || profile.hairCondition === 'damaged') {
      if (index === 0 || index === 3 || index === 5) {
        routine.push({ id: `oil-${day}`, day, task: 'Apply hair oil (30 min before wash)', completed: false })
      }
    } else {
      if (index === 1 || index === 4) {
        routine.push({ id: `oil-${day}`, day, task: 'Apply hair oil (30 min before wash)', completed: false })
      }
    }
    
    // Wash days
    if (profile.hairCondition === 'oily') {
      if (index !== 0 && index !== 6) {
        routine.push({ id: `wash-${day}`, day, task: 'Wash hair with sulfate-free shampoo', completed: false })
      }
    } else {
      if (index === 1 || index === 4 || index === 6) {
        routine.push({ id: `wash-${day}`, day, task: 'Wash hair with gentle shampoo', completed: false })
      }
    }
    
    // Hair mask days - once or twice a week
    if (index === 2 || (profile.hairCondition === 'damaged' && index === 5)) {
      routine.push({ id: `mask-${day}`, day, task: 'Deep conditioning hair mask', completed: false })
    }
    
    // Serum application on wash days
    if (profile.concerns.includes('frizz') && (index === 1 || index === 4 || index === 6)) {
      routine.push({ id: `serum-${day}`, day, task: 'Apply anti-frizz serum', completed: false })
    }
  })
  
  return routine
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentScreen: 'onboarding',
      hasCompletedOnboarding: false,
      userProfile: defaultProfile,
      progressEntries: [],
      weeklyRoutine: [],
      remindersEnabled: false,
      
      setScreen: (screen) => set({ currentScreen: screen }),
      
      completeOnboarding: () => set({ hasCompletedOnboarding: true, currentScreen: 'quiz' }),
      
      updateProfile: (profile) => set((state) => ({
        userProfile: { ...state.userProfile, ...profile }
      })),
      
      addProgressEntry: (entry) => set((state) => ({
        progressEntries: [...state.progressEntries, entry]
      })),
      
      toggleRoutineItem: (id) => set((state) => ({
        weeklyRoutine: state.weeklyRoutine.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      })),
      
      toggleReminders: () => set((state) => ({ remindersEnabled: !state.remindersEnabled })),
      
      generateRoutine: () => {
        const profile = get().userProfile
        const routine = generateWeeklyRoutine(profile)
        set({ weeklyRoutine: routine, currentScreen: 'dashboard' })
      },
      
      resetApp: () => set({
        currentScreen: 'onboarding',
        hasCompletedOnboarding: false,
        userProfile: defaultProfile,
        progressEntries: [],
        weeklyRoutine: [],
        remindersEnabled: false,
      }),
    }),
    {
      name: 'hairgenie-storage',
    }
  )
)
