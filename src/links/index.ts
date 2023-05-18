export type LinkTypes = 'home' | 'aboutUs' | 'rules' | 'auth' | 'main';

export const LINKS: Record<LinkTypes, string> = {
  home: '/',
  aboutUs: '/about-us',
  rules: '/rules',
  auth: '/auth',
  main: '/main',
};
