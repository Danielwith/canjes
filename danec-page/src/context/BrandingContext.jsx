import { createContext, useContext, useEffect, useState } from "react";
import { getBranding } from "../api/brandingApi";

const BrandingContext = createContext(null);

const DEFAULT_BRANDING = {
    siteId: "default",
    name: "Mi Sitio",
    logo: "/logo-red.png",
    colors: {
        primary: "#fff",
        secondary: "#6b7280",
        accent: "#3b82f6",
        background: "#ffffff",
        text: "#111827",
    },
    fonts: {
        base: "Inter, sans-serif",
    },

    bannerWelcome: "https://storage.googleapis.com/static-content-seed/danec/hola.png",

    banners: [
        {
            id: 1,
            src: "https://storage.googleapis.com/static-content-seed/danec/banners/banner2.jpg",
            alt: "Banner 1",
        },
        {
            id: 2,
            src: "https://storage.googleapis.com/static-content-seed/danec/banners/banner1.png",
            alt: "Banner 2",
        },

    ],
    caruselSteps: [
        {
            id: 1,
            src: "https://storage.googleapis.com/static-content-seed/danec/guia/1.webp",
            alt: "como funciona",
        },
        {
            id: 2,
            src: "https://storage.googleapis.com/static-content-seed/danec/guia/2.webp",
            alt: "como funciona",
        },
          {
            id: 3,
            src: "https://storage.googleapis.com/static-content-seed/danec/guia/3.webp",
            alt: "como funciona",
        },
         {
            id: 4,
            src: "https://storage.googleapis.com/static-content-seed/danec/guia/4.webp",
            alt: "como funciona",
        },
         {
            id: 5,
            src: "https://storage.googleapis.com/static-content-seed/danec/guia/5.webp",
            alt: "como funciona",
        },
         {
            id: 6,
            src: "https://storage.googleapis.com/static-content-seed/danec/guia/6.webp",
            alt: "como funciona",
        },
    ]
};

const CACHE_KEY = "branding_cache";
const CACHE_TTL = 1000 * 60 * 60; // 1 hora

export function BrandingProvider({ children }) {
    const [branding, setBranding] = useState(DEFAULT_BRANDING);
    const [loading, setLoading] = useState(true);

    const detectSiteId = () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const q = urlParams.get("siteId") || localStorage.getItem("siteId");
            if (q) return q;
            const host = window.location.hostname;
            const parts = host.split(".");
            if (parts.length > 2) return parts[0];
        } catch (e) {
            // ignore
        }
        return "default";
    };

    const applyCssVars = (b) => {
        const root = document.documentElement;
        if (!b?.colors) return;
        Object.entries(b.colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });
        if (b.fonts?.base) {
            root.style.setProperty("--font-base", b.fonts.base);
            document.body.style.fontFamily = b.fonts.base;
        }
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            const siteId = detectSiteId();
            try {
                const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
                if (cached && cached.siteId === siteId && Date.now() - cached.ts < CACHE_TTL) {
                    setBranding(cached.branding);
                    applyCssVars(cached.branding);
                    setLoading(false);
                    return;
                }

                const data = await getBranding(siteId).catch(() => null);
                const finalBranding = data || { ...DEFAULT_BRANDING, siteId };
                setBranding(finalBranding);
                applyCssVars(finalBranding);
                localStorage.setItem(CACHE_KEY, JSON.stringify({ siteId, ts: Date.now(), branding: finalBranding }));
            } catch (err) {
                console.error("Error loading branding", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const refreshBranding = async () => {
        setLoading(true);
        const siteId = detectSiteId();
        try {
            const data = await getBranding(siteId);
            const finalBranding = data || { ...DEFAULT_BRANDING, siteId };
            setBranding(finalBranding);
            applyCssVars(finalBranding);
            localStorage.setItem(CACHE_KEY, JSON.stringify({ siteId, ts: Date.now(), branding: finalBranding }));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <BrandingContext.Provider value={{ branding, loading, refreshBranding }}>
            {children}
        </BrandingContext.Provider>
    );
}

export function useBranding() {
    const ctx = useContext(BrandingContext);
    if (!ctx) {
        throw new Error("useBranding debe usarse dentro de BrandingProvider");
    }
    return ctx;
}

export default BrandingContext;
