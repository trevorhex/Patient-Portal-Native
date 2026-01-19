
interface Routes {
  auth: string
  dashboard: string
  profile: {
    base: string
    wizard: string
  }
  issues: {
    base: string
    new: string
    view: (id: string) => string
  }
}

export const ROUTES: Routes = {
  auth: '/auth',
  dashboard: '/',
  profile: {
    base: '/profile',
    wizard: '/profileWizard'
  },
  issues: {
    base: '/issues',
    new: '/newIssue',
    view: (id: string) => `/(issues)/${id}`
  }
}

interface APIRoutes {
  auth: string
  issues: string
}

export const API_ROUTES: APIRoutes = {
  auth: '/auth',
  issues: '/issues'
}
