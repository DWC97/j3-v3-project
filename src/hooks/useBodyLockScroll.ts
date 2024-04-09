// hooks
import { useEffect, useState } from 'react'

type ToggleFunction = () => void;

// toggle scroll lock to stop user from scrolling
function useBodyLockScroll(): [ToggleFunction] {

    const [locked, setLocked] = useState(false)
    
    useEffect(() => {
        let bodyStyle: CSSStyleDeclaration | undefined;
        if (typeof document !== "undefined") {
            bodyStyle = document.body.style;
            if (bodyStyle) {
                if (locked) {
                    bodyStyle.overflowY = "hidden";
                } else {
                    bodyStyle.overflowY = "auto";
                }
            }
        }
    }, [locked]);

    function toggle(){
        setLocked(!locked)
    }

    return [toggle]
}

export default useBodyLockScroll