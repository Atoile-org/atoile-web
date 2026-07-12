import {Link, Outlet} from "react-router-dom";

export default function Root() {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
            <Outlet />
            <div>
                <p>Footer !</p>
            </div>
        </div>
    )
}