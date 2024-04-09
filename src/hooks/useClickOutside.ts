// hooks
import { useEffect, useRef, RefObject } from "react";

type EventHandler = (event: MouseEvent) => void;

// listens for when a user clicks outside of a given area
export function useClickOutside(handler: EventHandler): RefObject<HTMLDivElement>{

    const domNode: RefObject<HTMLDivElement> = useRef(null)
    
    useEffect(() => {
        function maybeHandler(e: MouseEvent) {
            if (domNode.current && !domNode.current.contains(e.target as Node)) {
                handler(e);
            }
        }

        document.addEventListener("mousedown", maybeHandler);

        return () => {
            document.removeEventListener("mousedown", maybeHandler);
        };
    }, [handler]);

    return domNode
}