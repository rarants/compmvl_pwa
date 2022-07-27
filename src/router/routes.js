
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'campos', component: () => import('pages/Campos.vue') },
      { path: 'campos/adicionar', component: () => import('pages/AdicionarCampo.vue') },
      { path: 'campos/:id/visualizar', component: () => import('pages/VerCampo.vue') },
      { path: 'campos/:id/editar', component: () => import('pages/EditarCampo.vue') }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
