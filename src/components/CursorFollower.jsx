import { useEffect, useRef } from "react";

export default function CursorFollower() {
  // useRef donne accès aux éléments du DOM SANS déclencher de nouveau rendu.
  // Avec useState, React se redessinerait ~60 fois par seconde : trop lourd.
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Pas d'effet sur écran tactile, ni si les animations sont réduites
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!canHover || reduceMotion) return;

    // Variables ordinaires (pas des states) : elles changent en continu
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let scale = 1;
    let hovering = false;
    let pressed = false;
    let visible = false;
    let frameId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Au premier mouvement : on place l'anneau sous la souris et on l'affiche
      if (!visible) {
        visible = true;
        ringX = mouseX;
        ringY = mouseY;
        dotRef.current.style.opacity = "1";
        ringRef.current.style.opacity = "1";
      }

      // La souris est-elle sur un élément cliquable ?
      const target = e.target instanceof Element ? e.target : null;
      hovering = Boolean(target?.closest("button, a, input, label"));
    };

    const onDown = () => (pressed = true);
    const onUp = () => (pressed = false);

    // Boucle d'animation : s'exécute avant chaque image affichée par le navigateur
    const animate = () => {
      // Interpolation : l'anneau rattrape la souris de 15 % à chaque image,
      // d'où l'effet de retard élastique
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      const targetScale = pressed ? 0.7 : hovering ? 1.8 : 1;
      scale += (targetScale - scale) * 0.2;

      dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${scale})`;

      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    frameId = requestAnimationFrame(animate);

    // Nettoyage : quand le composant disparaît, on arrête tout
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(frameId);
    };
  }, []); // [] : on installe tout une seule fois

  return (
    <>
      {/* Anneau jaune qui suit avec du retard */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 h-10 w-10 rounded-full border-2 border-black bg-lemon/40 opacity-0"
      />
      {/* Point noir qui colle à la souris */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 h-2 w-2 rounded-full bg-black opacity-0"
      />
    </>
  );
}