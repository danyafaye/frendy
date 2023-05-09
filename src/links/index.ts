export type LinkTypes =
  | 'home'
  | 'aboutUs'
  | 'rules'

export const LINKS: Record<LinkTypes, string> = {
  home: '/',
  aboutUs: '/about-us',
  rules: '/rules',
};
