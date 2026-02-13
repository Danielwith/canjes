import { ButtonNavigate } from "../components/ui/buttons/ButtonNavigation";
import { postUserCartApi } from "../api/userApi";
import { getCatalog } from "../api/productsApi";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import ExchangeModal from "../components/ui/ExchangeModal";
import StatusModal from "../components/ui/StatusModal";

export default function CarritoPage() {


    const { userPoints, refreshSession, cartTotal, cart } = useAuth();
    // console.log('ver puntos', userPoints);

    const totalPoints = userPoints?.Response?.oResponse[0]?.total || 0;
    const effectivePoints = totalPoints - (cartTotal || 0);

    const [catalog, setCatalog] = useState([]);
    const [loadingCatalog, setLoadingCatalog] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusModal, setStatusModal] = useState({
        isOpen: false,
        type: 'success',
        title: '',
        message: ''
    });

    useEffect(() => {
        (async () => {
            try {
                const data = await getCatalog();
                setCatalog(data.Response.oResponse || []);
            } catch (error) {
                console.error("Error fetching catalog", error);
            } finally {
                setLoadingCatalog(false);
            }
        })();
    }, []);

    const enrichedCart = useMemo(() => {
        if (!cart || !catalog.length) return [];
        return cart.map(item => {
            const product = catalog.find(p => p.id === item.ProductId);
            return {
                ...item,
                title: product?.name || "Producto no disponible",
                image: product?.image || "",
                unitPrice: product?.price || 0,
                // If item.Total is available we can use it, or calculate
            };
        });
    }, [cart, catalog]);


    const handleUpdateQuantity = async (productId, delta, unitPrice, currentQuantity) => {
        console.log('=== handleUpdateQuantity ===');
        console.log('productId:', productId);
        console.log('delta:', delta);
        console.log('unitPrice:', unitPrice);
        console.log('currentQuantity:', currentQuantity);
        console.log('effectivePoints:', effectivePoints);

        if (delta > 0) {
            // Check if we have enough effective points for one more item
            if (effectivePoints < unitPrice) {
                setStatusModal({
                    isOpen: true,
                    type: 'error',
                    title: 'Puntos Insuficientes',
                    message: `No tienes suficientes puntos para agregar más. Tienes ${effectivePoints} disponibles y necesitas ${unitPrice}.`
                });
                return;
            }
            console.log('✅ Sufficient points, proceeding...');
        }

        const newQuantity = currentQuantity + delta;

        // Allow quantity to be 0 (which should delete the item from cart)
        if (newQuantity < 0) {
            // console.log('⚠️ Quantity would be < 0, skipping');
            return;
        }

        try {
            // console.log('Calling API with:', { product: productId, quantity: newQuantity });
            const response = await postUserCartApi({ product: productId, quantity: newQuantity });
            // console.log('API Response:', response);
            await refreshSession();
            // console.log('Session refreshed');

            if (newQuantity === 0) {
                toast.success("Producto eliminado del carrito");
            } else {
                toast.success("Carrito actualizado");
            }
        } catch (error) {
            const msg = error?.response?.data?.message || error?.response?.data?.response?.sRetorno || "Error al actualizar carrito";
            setStatusModal({
                isOpen: true,
                type: 'error',
                title: 'Error al actualizar',
                message: msg
            });
        }
    };


    console.log(cart);

    return (
        <section className="w-full py-4">
            <div className="container mx-auto px-3 bg-white  shadow-xl shadow-blue-200">
                <div className="w-full h-full bg-main flex flex-col gap-4">
                    <p className="text-white text-center text-xl py-4">
                        CARRITO
                    </p>

                </div>
                <div className="w-full h-full">
                    {
                        (effectivePoints !== undefined) ? (
                            <p className="text-black text-center text-xl py-4 font-bold">
                                PUNTOS: {effectivePoints}
                            </p>
                        ) : (
                            <p className="text-black text-center text-xl py-4 font-bold">
                                PUNTOS: ...
                            </p>
                        )
                    }
                </div>

                <div className="flex flex-col gap-4 p-4">
                    {enrichedCart.length === 0 ? (
                        <div className="flex flex-col gap-2 items-center py-3">
                            <p className="text-black text-center text-xl py-4">
                                No tienes articulos en el carrito
                            </p>
                            <ButtonNavigate linkPage="/catalogo" text="VOLVER" />
                        </div>
                    ) : (
                        <>
                            {/* Table Header */}
                            <div className="hidden md:flex justify-between border-b pb-2 font-bold text-gray-700">
                                <span className="w-1/2">PRODUCTO</span>
                                <span className="w-1/4 text-center">PUNTOS</span>
                                <span className="w-1/4 text-center">CANTIDAD</span>
                            </div>

                            {/* Cart Items */}
                            <div className="flex flex-col gap-4">
                                {enrichedCart.map((item) => (
                                    <div key={item.Id} className="flex flex-col md:flex-row items-center justify-between border-b py-4 gap-4">

                                        {/* Product Info */}
                                        <div className="flex items-center gap-4 w-full md:w-1/2">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-20 h-20 object-contain border rounded"
                                            />
                                            <span className="font-semibold uppercase">{item.title}</span>
                                        </div>

                                        {/* Points */}
                                        <div className="w-full md:w-1/4 text-center font-bold text-gray-700">
                                            {item.unitPrice}
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="w-full md:w-1/4 flex justify-center items-center gap-3">
                                            <button
                                                onClick={() => handleUpdateQuantity(item.ProductId, -1, item.unitPrice, item.Quantity)}
                                                className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold hover:bg-red-700 transition"
                                            >
                                                -
                                            </button>
                                            <span className="text-lg font-bold w-6 text-center">{item.Quantity}</span>
                                            <button
                                                onClick={() => handleUpdateQuantity(item.ProductId, 1, item.unitPrice, item.Quantity)}
                                                className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold hover:bg-red-700 transition"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Continue Button */}
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-red-600 text-white px-8 py-2 rounded font-bold uppercase hover:bg-red-700 transition"
                                >
                                    CONTINUAR
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <ExchangeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={async () => {
                    await refreshSession();
                }}
            />

            <StatusModal
                isOpen={statusModal.isOpen}
                type={statusModal.type}
                title={statusModal.title}
                message={statusModal.message}
                onClose={() => setStatusModal(prev => ({ ...prev, isOpen: false }))}
            />

        </section>
    );
}
