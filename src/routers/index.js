import DefaultLayout from "../components/layouts/DefaultLayout";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import Error_404 from "../pages/errors/404";

import Dashboard from "../pages/Home";
import LogsPage from "../pages/logs";
import Skill from "../pages/skill";
import AddSkill from "../pages/skill/addSkill";
import SkillDetail from "../pages/skill/detail";

export const routes = [
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: 'skill',
                element: <Skill />
            },
            {
                path: 'skill/detail/:id',
                element: <SkillDetail />
            },
            {
                path: 'skill/add',
                element: <AddSkill />
            },
            {
                path: "logs",
                element: <LogsPage />
            }
        ],
    },{
        path: "*",
        // eslint-disable-next-line react/jsx-pascal-case
        element: <Error_404 />
    },{
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    }
]