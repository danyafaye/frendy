import {Navigate, RouteObject} from "react-router-dom";
import {lazy} from "react";

import {LINKS} from "@src/links";

const WelcomePage = lazy(()=>import('@src/pages/WelcomePage'))

const ROUTES: RouteObject[] = [
  {
    path: LINKS.home,
    element: (<WelcomePage/>)
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]

export {ROUTES}
