import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { verifyTokenServer, refreshToken, logout } from "./Service";

interface AuthGuardProps {
    children: ReactNode;
}

export function Guard({ children }: AuthGuardProps) {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        async function init() {
            const valid = await verifyTokenServer();
            if (valid) return setReady(true);

            try {
                await refreshToken();
                setReady(true);
            } catch {
                logout();
            }
        }
        init();
    }, []);
    if (!ready) return <div>Loading...</div>;
    return children;
}
