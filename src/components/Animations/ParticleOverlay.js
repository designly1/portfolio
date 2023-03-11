import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { loadPolygonPath } from "tsparticles-path-polygon";
import { loadLightInteraction } from "tsparticles-interaction-light";
import { motion } from "framer-motion";

export default function ParticleOverlay({ config, usePolygon, useLight }) {
    const particlesInit = useCallback(async engine => {
        if (usePolygon) loadPolygonPath(engine);
        if (useLight) loadLightInteraction(engine);
        await loadFull(engine);
    }, [usePolygon, useLight]);

    const particlesLoaded = useCallback(async container => {
        console.log("Particles loaded!");
    }, []);

    const [showParticles, setShowParticles] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowParticles(true);
        }, 1000);
    })

    return (
        <>
            {
                showParticles
                    ?
                    <motion.div
                        className="fixed top-0 right-0 bottom-0 left-0"
                        style={{ zIndex: -2 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Particles
                            id="particle-overlay"
                            init={particlesInit}
                            loaded={particlesLoaded}
                            options={config}
                        />
                    </motion.div>
                    :
                    <></>
            }
        </>
    );
};