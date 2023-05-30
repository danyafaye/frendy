import { FC, PropsWithChildren } from 'react';

import { AUTH_TOKEN } from '@src/constants/common';

type Props = PropsWithChildren & {
  Navigate: React.ReactNode;
  type: 'auth' | 'main';
};

const PageGuard: FC<Props> = (props) => {
  const isAuth = Boolean(localStorage.getItem(AUTH_TOKEN));
  if ((isAuth && props.type === 'main') || (!isAuth && props.type === 'auth')) {
    return <>{props.children}</>;
  }
  return <>{props.Navigate}</>;
};

export { PageGuard };
