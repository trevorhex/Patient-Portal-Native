interface Routes {
  auth: string
  dashboard: string
  profile: {
    base: string
  }
}

export const ROUTES: Routes = {
  auth: '/auth',
  dashboard: '/dashboard',
  profile: {
    base: '/profile'
  }
}
