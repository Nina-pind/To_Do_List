// Constante hors du composant : elle ne change jamais
const FILTERS = [
  { key: "all", label: "Toutes" },
  { key: "todo", label: "À faire" },
  { key: "done", label: "Terminées" },
];

export default function US6({ filter, onFilterChange, counts }) {
  return (
    <div className="mb-5 flex flex-wrap gap-2">
      {FILTERS.map(({ key, label }) => {
        const isActive = filter === key; // donnée dérivée

        return (
          <button
            key={key}
            type="button"
            onClick={() => onFilterChange(key)} // fonction fléchée car on passe un argument
            aria-pressed={isActive} // indique l'état aux lecteurs d'écran
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition duration-200 hover:-translate-y-0.5 hover:-rotate-3 hover:shadow-hard motion-reduce:transition-none ${
              isActive
                ? "border-black bg-black text-white hover:bg-black"
                : "border-oat bg-white text-black hover:bg-lemon"
            }`}
          >
            {label} ({counts[key]})
          </button>
        );
      })}
    </div>
  );
}