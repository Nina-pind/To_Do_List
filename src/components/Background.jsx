// Formes décoratives en fond de page.
// Aucune logique, aucun state : c'est du pur décor.
export default function Background() {
  return (
    <div
      aria-hidden="true" // les lecteurs d'écran l'ignorent
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Gros blob citron qui flotte */}
      <div className="absolute -top-24 -left-24 h-72 w-72 animate-float rounded-[60%_40%_55%_45%/50%_60%_40%_50%] bg-lemon/50" />

      {/* Cercle lavande */}
      <div className="absolute top-1/3 -right-16 h-56 w-56 animate-float-slow rounded-full bg-ube-300/50" />

      {/* Pilule matcha inclinée */}
      <div className="absolute bottom-10 -left-10 h-24 w-64 rotate-12 animate-float-slow rounded-full bg-matcha-300/60" />

      {/* Carré arrondi grenade qui tourne lentement */}
      <div className="absolute top-1/2 left-8 h-20 w-20 animate-spin-slow rounded-2xl bg-pomegranate/60" />

      {/* Anneau en pointillés qui tourne */}
      <div className="absolute top-20 right-1/4 h-40 w-40 animate-spin-slow rounded-full border-2 border-dashed border-oat" />

      {/* Étoile noire qui grossit et rétrécit */}
      <svg
        viewBox="0 0 24 24"
        className="absolute right-24 bottom-24 h-12 w-12 animate-grow text-black"
      >
        <path
          fill="currentColor"
          d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z"
        />
      </svg>

      {/* Petite étoile citron */}
      <svg
        viewBox="0 0 24 24"
        className="absolute bottom-1/3 left-1/4 h-8 w-8 animate-grow text-lemon [animation-delay:1s]"
      >
        <path
          fill="currentColor"
          d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z"
        />
      </svg>
    </div>
  );
}