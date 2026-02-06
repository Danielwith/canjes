
import { Eye, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ProductCard({ product, onAdd, onView }) {
    if (!product) return null;
    const { user } = useAuth();



    return (
        <div className="border border-gray-200 shadow-sm w-full  rounded-lg flex flex-col gap- bg-white text-gray-900 ">

            {
                product.quantity === 0 ? (
                    <div className="h-40 flex items-center justify-center relative">
                        <img src={product.image} alt={product.name} className="max-h-full h-auto max-w-full object-contain" />
                        <div className="bg-main absolute text-white font-[700] w-[250px] text-center uppercase  -rotate-[35deg] left-[5%] top-[40%] z-10" >
                            Agotado
                        </div>
                    </div>
                ) : (
                    <div className="h-40 flex items-center justify-center">
                        <img src={product.image} alt={product.name} className="max-h-full h-auto max-w-full object-contain" />
                    </div>
                )
            }
            <div className="flex flex-col gap-2 items-center justify-center bg-gray-100 p-2">
                <div className="text-primary font-bold uppercase">{product.name}</div>
                <div className="text-sm text-gray-500">{product.category}</div>
                <div className="text-lg font-bold color-red">{`$${product.price}`}</div>
                <div className="text-sm text-gray-800">{`Cantidad disponible: ${product.quantity}`}</div>
                <div className="flex  flex-col gap-2 w-full">
                    <button
                        disabled={product.quantity <= 0}
                        onClick={() => onAdd?.(product)}
                        className={`flex-1 flex items-center gap-2 justify-center py-2 rounded-md text-white 
    ${product.quantity <= 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-black cursor-pointer"}`}
                    >
                        <ShoppingCart />
                        {product.quantity <= 0 ? "Sin stock" : "Canjear"}
                    </button>

                    <button
                        onClick={() => onView?.(product)}
                        className="text-sm w-full flex justify-center items-center cursor-pointer"
                    >
                        <Eye />
                    </button>

                </div>
            </div>

        </div>
    );
}
