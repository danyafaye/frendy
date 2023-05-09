import {Suspense} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {createRoot} from "react-dom/client";

import {App} from "@components/App";

const container = document.getElementById('root')

const root = createRoot(container!);

root.render( <Router>
  <Suspense>
    <App/>
  </Suspense>
</Router>)
