import { Link } from "react-router-dom";
import "./style.scss";

function CardComponent(props) {
    const {title, state} = props;
    return (<>
        <div className="CardComponent">
            <div className="CardComponent__head">
                <h2 className="CardComponent__title">{title}</h2>
                <div className={"CardComponent__state " + state}>{state}</div>
            </div>
            <div className="CardComponent__action">
                <Link to="/detail/1">
                    <button className="CardComponent__btn--default">Xem</button>
                </Link>
                <Link to="/edit/1">
                    <button className="CardComponent__btn--warning">Sửa</button>
                </Link>
                <Link to="/delete/1">
                    <button className="CardComponent__btn--danger">Xóa</button>
                </Link>
            </div>
        </div>
    </>)
}

export default CardComponent;