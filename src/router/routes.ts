import { AppLayoutsEnum } from '@/app/layouts/layouts.types';
import type { RouteRecordRaw } from 'vue-router';
import { AppPages } from './router.types';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/:catchAll(.*)*',
        redirect: { name: AppPages.home},
    },
    {
        name: AppPages.home,
        path: '/',
        component: () => import('@/pages/HomePage.vue'),
        meta: {
            layout: AppLayoutsEnum.default
        }
    },
]

export default routes;
