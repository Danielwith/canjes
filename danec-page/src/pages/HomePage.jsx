// src/pages/HomePage.jsx
import { useAuth } from "../context/AuthContext";
import { useBranding } from "../context/BrandingContext";
import { CircleArrowRight } from 'lucide-react';
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";


//Componentes UI
import TablePuntos  from "../components/ui/TablePuntos"



export default function HomePage() {

  const { user } = useAuth();
  console.log(user);

  const { branding } = useBranding();
  const banners = branding.banners;
  console.log('mirar', banners);
  return (

    <section className="w-full flex flex-col gap-3">
      {/* <div>
        <h1 className="text-2xl font-semibold">
          Bienvenido {user?.fullname}
        </h1>
        <p className="mt-2 text-gray-600">
          Has iniciado sesión correctamente.
        </p>
      </div> */}

      {/* Carrusel */}
      <div className="w-full h-full">
        <Splide
          hasTrack={false}
          aria-label="Carrusel de banners"
          options={{
            type: "loop",
            autoplay: true, // Enable autoplay
            interval: 3000,
            pauseOnHover: true,
            arrows: true,
            pagination: true,
            gap: "1rem",
          }}
        >
          <SplideTrack className="w-full h-full">
            {banners.map((banner) => (
              <SplideSlide key={banner.id}>
                <img
                  src={banner.src}
                  alt={banner.alt}
                  className="w-full  object-cover"
                />
              </SplideSlide>
            ))}
          </SplideTrack>

          {/* Flechas custom */}
          <div className="splide__arrows">
            <button className="splide__arrow splide__arrow--prev">
              <CircleArrowRight size={35} className="text-white" />

            </button>
            <button className="splide__arrow splide__arrow--next">
              <CircleArrowRight size={35} className="text-white" />

            </button>
          </div>
        </Splide>
      </div>

      <TablePuntos />
    </section>
    
  )
}
