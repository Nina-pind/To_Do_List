import { useState } from "react";
import US3 from "./US3";
import US4 from "./US4";
import US5 from "./US5";
import US6 from "./US6";

export default function US2({
  tasks,
  onToggleTask,
  onUpdateTask,
  onDeleteTask,
}) {
  // US6 : le filtre choisi ("all" | "todo" | "done")
  const [filter, setFilter] = useState("all");

  // Données dérivées : recalculées à chaque rendu, pas de useState
  const doneCount = tasks.filter((task) => task.done).length;
  const todoCount = tasks.length - doneCount;

  let visibleTasks = tasks; // par défaut, "all"
  if (filter === "done") {
    visibleTasks = tasks.filter((task) => task.done);
  } else if (filter === "todo") {
    visibleTasks = tasks.filter((task) => !task.done);
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-3xl font-semibold tracking-tight">Mes tâches</h2>
        {/* key qui change = React recrée l'élément = l'animation "pop" rejoue */}
        <span
          key={`${doneCount}-${tasks.length}`}
          className="animate-pop rounded-full bg-matcha-300 px-3 py-1 text-xs font-semibold text-black"
        >
          {doneCount} / {tasks.length} terminée{doneCount > 1 ? "s" : ""}
        </span>
      </div>

      {/* US6 : les boutons de filtre */}
      <US6
        filter={filter}
        onFilterChange={setFilter}
        counts={{ all: tasks.length, todo: todoCount, done: doneCount }}
      />

      {visibleTasks.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-oat bg-white/60 px-4 py-10 text-center text-sm text-charcoal">
          <span className="mb-2 inline-block animate-float text-3xl">🌱</span>
          <p>
            {tasks.length === 0
              ? "Aucune tâche pour le moment."
              : "Aucune tâche ne correspond à ce filtre."}
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {visibleTasks.map((task) => (
            <li
              key={task.id}
              className={`flex animate-pop flex-wrap items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                task.done
                  ? "border-matcha-600/40 bg-matcha-300/25"
                  : "border-oat bg-white"
              }`}
            >
              {/* US3 : la case à cocher */}
              <US3 task={task} onToggle={onToggleTask} />
              {/* US4 : le texte, modifiable */}
              <US4 task={task} onUpdate={onUpdateTask} />
              {/* US5 : le bouton supprimer */}
              <US5 task={task} onDelete={onDeleteTask} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}