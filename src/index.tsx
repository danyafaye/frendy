import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { CircleLoader } from 'react-spinners';

import { store } from '@store/root';

import { AuthProvider } from '@src/providers/AuthProvider/AuthProvider';

import 'react-toastify/dist/ReactToastify.css';

import { App } from '@components/App';

const container = document.getElementById('root');

const root = createRoot(container!);

root.render(
  <Router>
    <Provider store={store}>
      <AuthProvider>
        <Suspense
          fallback={
            <CircleLoader
              color="#82616C"
              size={150}
              cssOverride={{
                position: 'absolute',
                top: '40%',
                left: '45%',
              }}
            />
          }
        >
          <App />
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Suspense>
      </AuthProvider>
    </Provider>
  </Router>,
);
