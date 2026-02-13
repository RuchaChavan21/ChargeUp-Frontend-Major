import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/LoginView.vue'),
    meta: { requiresAuth: false, guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth/RegisterView.vue'),
    meta: { requiresAuth: false, guestOnly: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true, userOnly: true }
  },
  {
    path: '/stations',
    name: 'Stations',
    component: () => import('../views/stations/StationsView.vue'),
    meta: { requiresAuth: true, userOnly: true }
  },
  {
    path: '/stations/new',
    name: 'NewStation',
    component: () => import('../views/stations/StationFormView.vue'),
    meta: { requiresAuth: true, userOnly: true }
  },
  {
    path: '/stations/:id/edit',
    name: 'EditStation',
    component: () => import('../views/stations/StationFormView.vue'),
    meta: { requiresAuth: true, userOnly: true }
  },
  {
    path: '/map/:stationId?',
    name: 'Map',
    component: () => import('../views/MapView.vue'),
    meta: { requiresAuth: true, userOnly: true }
  },
  {
    path: '/admin',
    component: () => import('../components/layout/AdminLayout.vue'),
    meta: { requiresAuth: true, adminOnly: true },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('../views/admin/AdminDashboardView.vue'),
      },
      {
        path: 'stations',
        name: 'AdminStations',
        component: () => import('../views/admin/stations/StationListView.vue')
      },
      {
        path: 'ports',
        name: 'AdminPorts',
        component: () => import('../views/admin/stations/PortListView.vue')
      },
      {
        path: 'reservations',
        name: 'AdminReservations',
        component: () => import('../views/admin/reservations/ReservationListView.vue')
      },
      {
        path: 'revenue',
        name: 'AdminRevenue',
        component: () => import('../views/admin/revenue/RevenueView.vue')
      },
      {
        path: 'analytics',
        name: 'AdminAnalytics',
        component: () => import('../views/admin/analytics/AnalyticsDashboard.vue')
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('../views/admin/users/UsersView.vue')
      },
      {
        path: 'settings',
        name: 'AdminSettings',
        component: () => import('../views/admin/settings/SettingsView.vue')
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

// Navigation guard
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  // Routes that require authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } });
  }
  // Routes for guests only (like login)
  else if (to.meta.guestOnly && isAuthenticated) {
    if (authStore.isAdmin) {
      next({ name: 'AdminDashboard' });
    } else {
      next({ name: 'Map' });
    }
  }
  // Admin only routes
  else if (to.meta.adminOnly && !authStore.isAdmin) {
    next({ name: 'Map' }); // Redirect users to their main page
  }
  // User only routes
  else if (to.meta.userOnly && authStore.isAdmin) {
    next({ name: 'AdminDashboard' }); // Redirect admins to their main page
  }
  // All other routes
  else {
    next();
  }
});

export default router;