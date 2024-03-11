// hooks
import { useEffect, useState } from 'react'

// toggle scroll lock to stop user from scrolling
function useBodyLockScroll() {

    const [locked, setLocked] = useState(false)
    
    let bodyStyle
    if (typeof document !== "undefined"){
        bodyStyle = document.body.style
    }

    useEffect(() => {
        if (typeof document !== "undefined"){
            if (locked){
                bodyStyle.overflowY = "hidden"
            }
            else {
                bodyStyle.overflowY = "auto"
            }
        }
        
    }, [locked])

    function toggle(){
        setLocked(!locked)
    }

    return [toggle]
}

export default useBodyLockScroll