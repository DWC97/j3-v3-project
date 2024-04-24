import { RefObject, useEffect, useState } from "react";

type UseDetectSectionReturn = [boolean];

type RefType<T> = RefObject<T>;

// detect whether a given element is in view
export default function useDetectSection(ref: RefType<HTMLElement>): UseDetectSectionReturn {
    const [isInView, setIsInView] = useState(false)

    function checkInView() {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setIsInView(
                rect.top < window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2
            );
        }
    }

    useEffect(() => {
        document.addEventListener("scroll", checkInView);
        return () => {
            document.removeEventListener("scroll", checkInView);
        };
    }, []);

    return [isInView]
}