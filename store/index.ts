import { UserStore } from '@/constants/types'
import { Timestamp } from 'firebase/firestore'
import { create } from 'zustand'

interface StoreType {
    user: UserStore
    setUser: (user: UserStore) => void
}

const useAppStore = create<StoreType>()((set) => ({
    user: {
        uid: "",
        createdAt: Timestamp.fromDate(new Date()),
        email: "",
        name: "",
        updatedAt: Timestamp.fromDate(new Date()),
    },
    setUser: (user) => set(() => ({ user: user })),
}))

export default useAppStore;