import { create } from 'zustand'
import { AdminUser, usersApi } from '@/lib/api/users'

interface UsersStore {
  users: AdminUser[]
  loading: boolean
  error: string | null
  
  // Actions
  fetchUsers: () => Promise<void>
  addUser: (user: AdminUser) => void
  removeUser: (userId: number) => void
  updateUser: (userId: number, updatedUser: Partial<AdminUser>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useUsersStore = create<UsersStore>((set, get) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null })
    try {
      const users = await usersApi.getUsers()
      set({ users, loading: false })
    } catch (error) {
      console.error('Error fetching users:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Ошибка загрузки пользователей',
        loading: false 
      })
    }
  },

  addUser: (user: AdminUser) => {
    set((state) => ({
      users: [...state.users, user]
    }))
  },

  removeUser: (userId: number) => {
    set((state) => ({
      users: state.users.filter(user => user.id !== userId)
    }))
  },

  updateUser: (userId: number, updatedUser: Partial<AdminUser>) => {
    set((state) => ({
      users: state.users.map(user =>
        user.id === userId ? { ...user, ...updatedUser } : user
      )
    }))
  },

  setLoading: (loading: boolean) => {
    set({ loading })
  },

  setError: (error: string | null) => {
    set({ error })
  }
}))