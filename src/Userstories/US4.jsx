import { useState } from "react";

export default function US4({ task, onUpdate }) {
  // States LOCAUX : ils ne concernent que cette ligne
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.text); // brouillon

  const startEditing = () => {
    // useState(task.text) ne lit la valeur qu'au 1er rendu :
    // on resynchronise ici, sinon un ancien brouillon pourrait réapparaître
    setDraft(task.text);
    setIsEditing(true);
  };

  const cancel = () => setIsEditing(false); // on n'appelle pas onUpdate

  const handleSubmit = (e) => {
    e.preventDefault(); // la touche Entrée valide aussi
    const trimmed = draft.trim();
    if (!trimmed) return; // un brouillon vide n'est pas enregistré
    onUpdate(task.id, trimmed); // remontée de la valeur finale au parent
    setIsEditing(false);
  };

  // MODE ÉDITION
  if (isEditing) {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex min-w-0 flex-1 flex-wrap items-center gap-2"
      >
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          aria-label="Nouveau texte de la tâche"
          autoFocus
          className="min-w-0 flex-1 rounded-xl border border-black bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-lemon"
        />
        <button
          type="submit"
          className="rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:-rotate-3 hover:bg-matcha-300 hover:text-black hover:shadow-hard motion-reduce:transition-none"
        >
          Valider
        </button>
        <button
          type="button"
          onClick={cancel}
          className="rounded-xl border border-oat bg-white px-4 py-2 text-xs font-semibold transition duration-200 hover:-translate-y-0.5 hover:-rotate-3 hover:bg-oat-light hover:shadow-hard motion-reduce:transition-none"
        >
          Annuler
        </button>
      </form>
    );
  }

  // MODE LECTURE : on affiche task.text, pas draft
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2">
      <span
        className={`min-w-0 flex-1 wrap-break-word ${
          task.done ? "text-charcoal line-through" : "text-black"
        }`}
      >
        {task.text}
      </span>
      <button
        type="button"
        onClick={startEditing}
        className="shrink-0 rounded-xl border border-oat bg-white px-4 py-2 text-xs font-semibold transition duration-200 hover:-translate-y-0.5 hover:-rotate-3 hover:bg-ube-300 hover:shadow-hard motion-reduce:transition-none"
      >
        Modifier
      </button>
    </div>
  );
}