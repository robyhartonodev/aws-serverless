import { create } from "zustand";

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    token: null, // Initial state for token
    isAuthenticated: false, // Authentication status

    // Action to log in and store token
    login: (token) => set(() => ({
        token,
        isAuthenticated: true,
    })),

    // Action to log out and clear token
    logout: () => set(() => ({
        token: null,
        isAuthenticated: false,
    })),
}));

export default useAuthStore;