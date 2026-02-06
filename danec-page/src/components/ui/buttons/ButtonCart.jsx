import { useNavigate } from "react-router-dom";
import { ShoppingCart } from 'lucide-react';


export const ButtonNavigateCart = ({
    linkPage = "/",
    text = null,

}) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(linkPage)}
            className="px-4 py-2 text-black flex items-center gap-1 bg-transparent rounded-2xl w-fit text-xl font-[700] cursor-pointer"
        >

            <ShoppingCart className="text-black" size={25} />
            {text}
        </button>
    );
};
