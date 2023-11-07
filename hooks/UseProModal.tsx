import {create} from 'zustand'

interface useProModalState {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const useProModal = create<useProModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

