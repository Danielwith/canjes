import { ButtonNavigate } from "../components/ui/buttons/ButtonNavigation";

export default function CarritoPage() {

    return (
        <section className="w-full py-4">
            <div className="container mx-auto px-3 bg-white  shadow-xl shadow-blue-200">
                <div className="w-full h-full bg-main flex flex-col gap-4">
                    <p className="text-white text-center text-xl py-4">
                        CARRITO
                    </p>

                </div>
                <div className="w-full h-full">
                    <p className="text-black text-center text-xl py-4">
                        Puntos: 0
                    </p>
                </div>
                <div className="flex flex-col gap-2 items-center py-3">
                    <p className="text-black text-center text-xl py-4">
                        No tienes articulos en el carrito
                    </p>

                    <ButtonNavigate linkPage="/catalogo" text="VOLVER" />


                </div>
            </div>

        </section>
    );
}
