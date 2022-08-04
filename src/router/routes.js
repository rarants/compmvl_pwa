
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'campos', component: () => import('pages/Campo/Campos.vue') },
      { path: 'campos/adicionar', component: () => import('pages/Campo/AdicionarCampo.vue') },
      { path: 'campos/:id/visualizar', component: () => import('pages/Campo/VerCampo.vue') },
      { path: 'campos/:id/editar', component: () => import('pages/Campo/EditarCampo.vue') },
      { path: 'animais', component: () => import('pages/Animal/Animais.vue') },
      { path: 'animais/adicionar', component: () => import('pages/Animal/AdicionarAnimal.vue') },
      { path: 'animais/:id/editar', component: () => import('pages/Animal/EditarAnimal.vue') },
      { path: 'lotes', component: () => import('pages/Lotes/Lotes.vue') },
      { path: 'lotes/adicionar', component: () => import('pages/Lotes/AdicionarLotes.vue') },
      { path: 'lotes/:id/editar', component: () => import('pages/Lotes/EditarLotes.vue') },
      { path: 'lotes/:id/visualizar', component: () => import('pages/Lotes/VerLotes.vue') },
      { path: 'historicos', component: () => import('pages/Historicos/Historicos.vue') },
      { path: 'historicos/adicionar', component: () => import('pages/Historicos/AdicionarHistoricos.vue') },
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
