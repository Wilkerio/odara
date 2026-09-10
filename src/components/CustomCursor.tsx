import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    const handleMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    };

    function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring!.style.left = rx + "px";
      ring!.style.top = ry + "px";
      requestAnimationFrame(animRing);
    }

    document.addEventListener("mousemove", handleMove);
    animRing();

    // Hover targets
    const targets = document.querySelectorAll("a, button, .service-card, .insight-card, .metric-box");
    const enter = () => {
      dot.style.transform = "translate(-50%,-50%) scale(2.5)";
      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.opacity = "0.3";
    };
    const leave = () => {
      dot.style.transform = "translate(-50%,-50%) scale(1)";
      ring.style.width = "32px";
      ring.style.height = "32px";
      ring.style.opacity = "0.6";
    };
    targets.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMove);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  );
};

export default CustomCursor;
