export type LinkTypes =
  | 'home'
  | 'aboutUs'
  | 'rules'
  | 'auth'
  | 'main'
  | 'dialogs'
  | 'settings'
  | 'profile';

export const LINKS: Record<LinkTypes, string> = {
  home: '/',
  aboutUs: '/about-us',
  rules: '/rules',
  auth: '/auth',
  main: '/main',
  profile: '/main/profile',
  dialogs: '/main/dialogs',
  settings: '/main/settings',
};
