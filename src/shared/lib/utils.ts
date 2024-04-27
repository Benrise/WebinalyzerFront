import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Updater } from '@tanstack/vue-table'
import type { Ref } from 'vue'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value
    = typeof updaterOrValue === 'function'
      ? updaterOrValue(ref.value)
      : updaterOrValue
}

export function deepEqual<T>(obj1: T, obj2: T): boolean{
  return JSON.stringify(obj1)===JSON.stringify(obj2);
}

export const isEmptyObject = (obj: any) => {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
};