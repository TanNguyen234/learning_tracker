import DefaultLayout from "../components/layouts/DefaultLayout";

import Dashboard from "../pages/Home";
import Skill from "../pages/skill";
import AddSkill from "../pages/skill/addSkill";

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
                path: 'skill/add',
                element: <AddSkill />
            }
        ]
    }
]