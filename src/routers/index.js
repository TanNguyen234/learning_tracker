import DefaultLayout from "../components/layouts/DefaultLayout";

import Home from "../pages/Home";

export const routes = [
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    }
]