import { inject } from 'vue'
import { EAppProviders } from '@/router/router.types'

function useAppPages() {
  const appPages = inject(EAppProviders.AppPages)

  if (!appPages) {
    console.error('AppPages')
  }

  return appPages
}

export default useAppPages