export default function US3({ task, onToggle }) {
  return (
    <input
      type="checkbox"
      checked={task.done} // le state alimente la case
      onChange={() => onToggle(task.id)} // fonction fléchée car on passe l'id
      aria-label={`Terminer la tâche : ${task.text}`}
      className="h-6 w-6 shrink-0 cursor-pointer accent-matcha-600 transition hover:scale-110"
    />
  );
}