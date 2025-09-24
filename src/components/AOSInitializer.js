"use client"; // Only this file is marked as a client component

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInitializer() {
    useEffect(() => {
        AOS.init();
    }, []);

    return null; // This component doesn't render anything
}
