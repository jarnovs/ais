 import { create } from 'zustand'
import { notamApi } from '@/lib/api/notam'

interface NotamStore {
  notams: any[]
  loading: boolean
  error: string | null
  
  fetchNotams: () => Promise<void>
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useNotamStore = create<NotamStore>((set, get) => ({
  notams: [],
  loading: false,
  error: null,

  fetchNotams: async () => {
    set({ loading: true, error: null })
    try {
      const notams = await notamApi.getNotams()
      set({ notams, loading: false })
    } catch (error) {
      console.error('Error fetching notams:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Ошибка загрузки NOTAMs',
        loading: false 
      })
    }
  },

  setLoading: (loading: boolean) => {
    set({ loading })
  },

  setError: (error: string | null) => {
    set({ error })
  }
})) 