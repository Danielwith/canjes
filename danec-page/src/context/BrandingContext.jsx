import { createContext, useContext, useEffect, useState } from "react";
import { getBranding } from "../api/brandingApi";

const BrandingContext = createContext(null);

// Branding provided by the backend service. Local default removed to force service usage.

const CACHE_KEY = "branding_cache";
const CACHE_TTL = 1000 * 60 * 60; // 1 hora

export function BrandingProvider({ children }) {
    const [branding, setBranding] = useState(null);
    const [loading, setLoading] = useState(true);

    // No siteId required for branding endpoint currently.

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
            // Load branding directly from service (no siteId required)
            try {
                const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
                if (cached && Date.now() - cached.ts < CACHE_TTL) {
                    setBranding(cached.branding);
                    applyCssVars(cached.branding);
                    setLoading(false);
                    return;
                }

                const data = await getBranding().catch(() => null);
                const finalBranding = data || {};
                setBranding(finalBranding);
                applyCssVars(finalBranding);
                localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), branding: finalBranding }));
            } catch (err) {
                console.error("Error loading branding", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const refreshBranding = async () => {
        setLoading(true);
        try {
            const data = await getBranding();
            const finalBranding = data || {};
            setBranding(finalBranding);
            applyCssVars(finalBranding);
            localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), branding: finalBranding }));
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
