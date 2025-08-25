import { create, type StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi, type User } from '@/lib/api/api-client';

interface AuthActions {
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  logoutAll: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

interface AuthInitialState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthStore extends AuthInitialState, AuthActions {}

const initialState: AuthInitialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authStore: StateCreator<AuthStore, [['zustand/persist', unknown]]> = (
  set,
) => ({
  ...initialState,

  login: async (username: string, password: string) => {
    try {
      set({ isLoading: true, error: null });

      await authApi.login({ username, password });

      const user = await authApi.getAuth();

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: unknown) {
      let errorMessage = 'Произошла ошибка при входе';

      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as {
          response?: {
            data?: { detail?: string | Array<{ msg?: string }> };
          };
        };
        if (axiosError.response?.data?.detail) {
          if (Array.isArray(axiosError.response.data.detail)) {
            errorMessage =
              axiosError.response.data.detail[0]?.msg || errorMessage;
          } else {
            errorMessage = axiosError.response.data.detail;
          }
        }
      }

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      await authApi.logout();
    } catch (error) {
      console.warn('Logout error:', error);
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  logoutAll: async () => {
    try {
      set({ isLoading: true });
      await authApi.logoutAll();
    } catch (error) {
      console.warn('Logout all error:', error);
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const user = await authApi.getAuth();
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  clearError: () => set({ error: null }),

  setLoading: (loading: boolean) => set({ isLoading: loading }),
});

const useAuthStore = create<AuthStore>()(
  persist(authStore, {
    name: 'auth-storage',
    partialize: (state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
    }),
  }),
);

export const useAuth = useAuthStore;
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);

export const login = (username: string, password: string) =>
  useAuthStore.getState().login(username, password);
export const logout = () => useAuthStore.getState().logout();
export const logoutAll = () => useAuthStore.getState().logoutAll();
export const checkAuth = () => useAuthStore.getState().checkAuth();
export const clearError = () => useAuthStore.getState().clearError();

export const useLogin = () => useAuthStore((state) => state.login);
export const useLogout = () => useAuthStore((state) => state.logout);
export const useLogoutAll = () => useAuthStore((state) => state.logoutAll);
export const useCheckAuth = () => useAuthStore((state) => state.checkAuth);
export const useClearError = () => useAuthStore((state) => state.clearError);