export type LinkTypes = 'home' | 'aboutUs' | 'rules' | 'auth';

export const LINKS: Record<LinkTypes, string> = {
  home: '/',
  aboutUs: '/about-us',
  rules: '/rules',
  auth: '/auth',
};
