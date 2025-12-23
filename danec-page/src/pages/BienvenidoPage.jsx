
import { useAuth } from "../context/AuthContext";
import { useBranding } from "../context/BrandingContext";

import { useNavigate } from "react-router-dom";


export default function BienvenidoPage() {
  const { user } = useAuth();
  const { branding } = useBranding();
  const navigate = useNavigate();

  const bgWelcome = branding.bannerWelcome;

  return (
    <section
      className="h-[calc(100vh-96px)]  relative"
    >

      <span className="absolute w-full h-full  bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: bgWelcome ? `url(${bgWelcome})` : "none",
        }}
      >

      </span>
      {/* Contenido encima */}
      <div className="h-full container mx-auto flex  items-center justify-end relative z-[2]">
        <div className="w-1/2 flex  flex-col justify-center items-center">
          <p class="text-7xl uppercase font-[700] py-8 mt-16">¡Hola!</p>

          {user?.fullname ? (
            <p className="text-4xl text-center uppercase pt-5 pb-2">
              {user.fullname}
            </p>
          ) : (
            <p className="text-4xl text-center uppercase pt-5 pb-2">
              Usuario Danec
            </p>
          )}

          <p class="text-xl uppercase font-bold py-2">"Danec"</p>

          <button
            onClick={() => navigate("/mi-cuenta")}
            className="px-4 py-2 bg-main rounded-2xl text-white w-fit text-xl font-[700]"
          >
            CONTINUAR
          </button>

        </div>


      </div>
    </section>
  );
}

