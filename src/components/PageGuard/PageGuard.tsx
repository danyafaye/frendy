import { FC, PropsWithChildren } from 'react';

import { useAuth } from '@src/providers/AuthProvider';

type Props = PropsWithChildren & {
  Navigate: React.ReactNode;
  type: 'auth' | 'main';
};

const PageGuard: FC<Props> = (props) => {
  const { isAuth } = useAuth();
  if ((isAuth && props.type === 'main') || (!isAuth && props.type === 'auth')) {
    return <>{props.children}</>;
  }
  return <>{props.Navigate}</>;
};

export { PageGuard };
