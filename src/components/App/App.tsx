import { FC } from 'react';
import { useRoutes } from 'react-router-dom';

import { ROUTES } from '@src/routes';

import { Header } from '@components/Header';
import { Footer } from '@components/Footer';

import * as ST from './styled';

const App: FC = () => {
  const routes = useRoutes(ROUTES);
  return (
    <>
      <ST.AppWrapper>
        <Header />
        <ST.App>{routes}</ST.App>
        <Footer />
      </ST.AppWrapper>
      <ST.GlobalStyles />
    </>
  );
};

export { App };
