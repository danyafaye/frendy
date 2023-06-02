import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { AnimatePresence } from 'framer-motion';

import { ROUTES } from '@src/routes';
import { useAuth } from '@src/providers/AuthProvider';

import { Header } from '@components/Header';

import * as ST from './styled';

const App: FC = () => {
  const routes = useRoutes(ROUTES);

  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <CircleLoader
        color="#82616C"
        size={150}
        cssOverride={{
          position: 'absolute',
          top: '40%',
          left: '45%',
        }}
      />
    );
  }

  return (
    <>
      <AnimatePresence>
        <ST.AppWrapper>
          <Header />
          <ST.App>{routes}</ST.App>
        </ST.AppWrapper>
        <ST.GlobalStyles />
      </AnimatePresence>
    </>
  );
};

export { App };
