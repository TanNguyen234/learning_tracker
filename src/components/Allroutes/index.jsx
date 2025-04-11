import { useRoutes } from "react-router-dom";
import { routes } from "../../routers/index"

function AllRoutes() {
    const elements = useRoutes(routes);
    console.log(elements)
    
    return elements
}

export default AllRoutes;