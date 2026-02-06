import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useAuth } from "../context/AuthContext";
import { useBranding } from "../context/BrandingContext";
import { CircleArrowRight } from 'lucide-react';

export default function HomePage() {

    const { branding } = useBranding();
    const banners = branding.caruselSteps;



    return (
        <section className="w-full py-4 bg-[#1c1818] h-full min-h-[calc(100vh-96px)] flex items-center">

            <Splide
                hasTrack={false}
                aria-label="Carrusel de banners"
                options={{
                    // type: "loop",
                    // autoplay: true,
                    // interval: 3000,
                    pauseOnHover: true,
                    arrows: true,
                    pagination: true,
                    gap: "1rem",

                    perPage: 2,          // ✅ Desktop: 2 imágenes por “página”
                    perMove: 1,          // se mueve 1 por vez (puedes poner 2 si quieres pasar “por páginas”)
                    breakpoints: {
                        640: {
                            perPage: 1,      // ✅ Mobile: 1 imagen por pantalla
                            gap: "0.75rem",
                        },
                    },
                }}
            >
                <SplideTrack className="w-full">
                    {banners.map((banner) => (
                        <SplideSlide key={banner.Id}>
                            <div className="flex justify-center items-center h-[80vh]">
                                <img
                                    src={banner.Src}
                                    alt={banner.Alt}
                                    className="w-auto h-full object-contain rounded-lg m-auto"
                                />
                            </div>

                        </SplideSlide>
                    ))}
                </SplideTrack>

                <div className="splide__arrows">
                    <button className="splide__arrow splide__arrow--prev"><CircleArrowRight /></button>
                    <button className="splide__arrow splide__arrow--next"><CircleArrowRight /></button>
                </div>
            </Splide>
        </section>

    )
}