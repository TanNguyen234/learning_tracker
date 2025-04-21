import DefaultLayout from "../components/layouts/DefaultLayout";
import Error_404 from "../pages/errors/404";

import Dashboard from "../pages/Home";
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
            }
        ]
    },{
        path: "*",
        element: <Error_404 />
    }
]