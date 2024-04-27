import { defineStore } from 'pinia'
import { StoreNamespacesEnum } from '@/store/store.types'

export const useAppStore = defineStore(StoreNamespacesEnum.APP, () => {})