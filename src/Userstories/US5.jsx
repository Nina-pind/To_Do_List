export default function US5({ task, onDelete }) {
  return (
    <button
      type="button"
      onClick={() => onDelete(task.id)} // fonction fléchée car on passe l'id
      aria-label={`Supprimer la tâche : ${task.text}`}
      className="shrink-0 rounded-xl border border-oat bg-white px-4 py-2 text-xs font-semibold transition duration-200 hover:-translate-y-0.5 hover:-rotate-3 hover:bg-pomegranate hover:shadow-hard motion-reduce:transition-none"
    >
      Supprimer
    </button>
  );
}