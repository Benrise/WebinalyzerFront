import type { VueElement } from "vue";
import type { AppLayoutsEnum } from "@/app/layouts/layouts.types";
import type { InjectionKey } from 'vue'
import type { AppRoutes } from './AppRoutes/AppRoutes'

declare module "vue-router" {
  interface RouteMeta {
    layout?: AppLayoutsEnum;
    layoutComponent?: VueElement;
  }
}

export enum AppPages {
  home = "HomePage",
}

export const EAppProviders = {
  AppRoutes: Symbol() as InjectionKey<typeof AppRoutes>,
  AppPages: Symbol() as InjectionKey<typeof AppPages>
}
