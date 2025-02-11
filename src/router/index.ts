import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        title: 'Inicio',
      },
    },
    {
      path: '/task/:id',
      name: 'task-detail',
      component: () => import('../views/Task.vue'),
      meta: {
        title: 'Detalle de tarea',
      },
    },
    {
      path: '/order',
      name: 'orderTask',
      component: () => import('../views/Orderforurgent.vue'),
      meta: {
        title: 'Tareas Ordenadas',
      },
    }
  ],
})

  
router.beforeEach((to, from, next) => {
  const title = to.meta.title as string | undefined;

  if (title) {
    document.title = `${title} - Mi App`;
  } else {
    document.title = 'Mi App';
  }

  next();
});

export default router
