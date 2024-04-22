import { useState, useEffect } from 'react';

// Custom hook to check for mobile viewport width
function useMobileView(): boolean {
    const [mobileView, setMobileView] = useState<boolean>(false); // State to keep track of mobile view

    useEffect(() => {
        function updateSize() {
            setMobileView(window.innerWidth < 500);
        }

        updateSize(); // Set initial state
        window.addEventListener('resize', updateSize); // Add resize listener

        return () => {
            window.removeEventListener('resize', updateSize); // Clean up listener on component unmount
        };
    }, []);

    return mobileView; // Return the current state of mobileView
}

export default useMobileView;