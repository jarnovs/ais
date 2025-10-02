import { create } from 'zustand'
import { Issue, issuesApi } from '@/lib/api/issues'

interface IssuesStore {
  issues: Issue[]
  loading: boolean
  error: string | null
  
  // Actions
  fetchIssues: () => Promise<void>
  addIssue: (issue: Issue) => void
  removeIssue: (issueId: number) => void
  updateIssue: (issueId: number, updatedIssue: Partial<Issue>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useIssuesStore = create<IssuesStore>((set, get) => ({
  issues: [],
  loading: false,
  error: null,

  fetchIssues: async () => {
    set({ loading: true, error: null })
    try {
      const issues = await issuesApi.getIssues()
      set({ issues, loading: false })
    } catch (error) {
      console.error('Error fetching issues:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Ошибка загрузки EAIP',
        loading: false 
      })
    }
  },

  addIssue: (issue: Issue) => {
    set((state) => ({
      issues: [...state.issues, issue]
    }))
  },

  removeIssue: (issueId: number) => {
    set((state) => ({
      issues: state.issues.filter(issue => issue.id !== issueId)
    }))
  },

  updateIssue: (issueId: number, updatedIssue: Partial<Issue>) => {
    set((state) => ({
      issues: state.issues.map(issue =>
        issue.id === issueId ? { ...issue, ...updatedIssue } : issue
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