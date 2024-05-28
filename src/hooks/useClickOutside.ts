import { useEffect, useRef, RefObject } from 'react';

type EventHandler = (event: MouseEvent) => void;

// Generic version of useClickOutside to handle various element types
export function useClickOutside<T extends HTMLElement>(
    handler: EventHandler
): RefObject<T> {
    const domNode: RefObject<T> = useRef<T>(null);

    useEffect(() => {
        function maybeHandler(e: MouseEvent) {
            if (
                domNode.current &&
                !domNode.current.contains(e.target as Node)
            ) {
                handler(e);
            }
        }

        document.addEventListener('mousedown', maybeHandler);

        return () => {
            document.removeEventListener('mousedown', maybeHandler);
        };
    }, [handler]);

    return domNode;
}
