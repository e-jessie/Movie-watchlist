import { useState, useEffect } from "react";
import { Scrollbutton } from "../../public/icons/scrolltotop";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkScrollPosition = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  
  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);
  return (
    isVisible && (
      <div
        onClick={scrollToTop}
        className="fixed bottom-4 right-[50%] h-10 w-10 p-3 bg-gray-400 text-white rounded-full cursor-pointer hover:bg-gray-900 transition duration-300 ease-in-out"
      >
        <Scrollbutton />
      </div>
    )
  );
}

export default ScrollToTop;