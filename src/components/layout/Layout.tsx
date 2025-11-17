import { Outlet } from "react-router"
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

const Layout=() => {
    return (
        <>
            <Header/>
            <div className="container mx-auto pt-24 min-h-[92vh]">
                <Outlet />
            </div>
            <Footer/>
        </>
    )
}

export default Layout;