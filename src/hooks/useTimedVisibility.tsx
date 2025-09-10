import { useState, useEffect } from "react";

/**
 * Custom hook untuk mengelola visibilitas elemen berdasarkan durasi waktu.
 * Setelah ditutup, elemen akan kembali terlihat setelah waktu yang ditentukan.
 *
 * @param storageKey Kunci untuk menyimpan status di localStorage.
 * @param durationInMs Durasi dalam milidetik setelah elemen kembali terlihat.
 * @returns [isVisible, handleClose]
 */
export function useTimedVisibility(storageKey: string, durationInMs: number) {
    const [isVisible, setIsVisible] = useState<boolean | null>(null);

    useEffect(() => {
        const closedTimestamp = localStorage.getItem(storageKey);

        if (closedTimestamp) {
            const now = new Date().getTime();
            const storedTime = parseInt(closedTimestamp, 10);

            if (now - storedTime > durationInMs) {
                setIsVisible(true);
                localStorage.removeItem(storageKey);
            } else {
                setIsVisible(false);
            }
        } else {
            setIsVisible(true);
        }
    }, [storageKey, durationInMs]);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem(storageKey, new Date().getTime().toString());
    };

    return { isVisible, handleClose };
}