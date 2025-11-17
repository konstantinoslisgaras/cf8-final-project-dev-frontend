import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToHash = () => {
    const { hash, key } = useLocation();

    useEffect(() => {
        if (!hash) return;

        const scroll = () => {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        };

        setTimeout(scroll, 100);
        setTimeout(scroll, 500);
        setTimeout(scroll, 1000);
    }, [hash, key]);

    return null;
};
