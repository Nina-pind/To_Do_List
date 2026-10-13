export default function US1({ onAddTask }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = new FormData(e.currentTarget).get("task");

    if (typeof text === "string" && text.trim()) {
      onAddTask(text.trim());
    }

    e.currentTarget.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-oat bg-white p-8"
    >
      {/* Pastilles colorées qui "respirent" l'une après l'autre */}
      <div className="mb-5 flex gap-1.5" aria-hidden="true">
        <span className="h-2 w-15 animate-grow rounded-full bg-matcha-300" />
        <span className="h-2 w-15 animate-grow rounded-full bg-lemon [animation-delay:300ms]" />
        <span className="h-2 w-15 animate-grow rounded-full bg-ube-300 [animation-delay:600ms]" />
        <span className="h-2 w-15 animate-grow rounded-full bg-pomegranate [animation-delay:900ms]" />
      </div>

      <h1 className="mb-2 text-4xl font-semibold tracking-tight">
        Une nouvelle tâche ?
      </h1>
      <p className="mb-8 text-sm text-charcoal">
        Notez ce que vous avez en tête.
      </p>

      <label htmlFor="task" className="mb-2 block text-sm font-medium">
        Ma tâche
      </label>
      <input
        id="task"
        name="task"
        type="text"
        placeholder="Acheter du pain"
        required
        className="mb-6 w-full rounded-xl border border-oat bg-cream px-4 py-3 text-sm outline-none transition placeholder:text-charcoal/60 focus:border-black focus:bg-white focus:ring-2 focus:ring-lemon"
      />

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:-rotate-3 hover:bg-lemon hover:text-black hover:shadow-hard motion-reduce:transition-none"
      >
        Ajouter une tâche
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}