import { useEffect, useState } from "react";
import US1 from "./Userstories/US1";
import US2 from "./Userstories/US2";
import Background from "./components/Background";
import CursorFollower from "./components/CursorFollower";

// Clé sous laquelle on range les tâches dans le localStorage.
const STORAGE_KEY = "petit-pas-tasks";

// US7 : lit les tâches sauvegardées (ou renvoie un tableau vide)
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function App() {
  // US7 : initialisation paresseuse, loadTasks ne s'exécute qu'au 1er rendu
  const [tasks, setTasks] = useState(loadTasks);

  // US7 : à chaque changement de tasks, on sauvegarde
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // stockage plein ou bloqué : l'appli continue sans sauvegarde
    }
  }, [tasks]);

  // US1 : ajouter une tâche
  const addTask = (text) => {
    const newTask = { id: crypto.randomUUID(), text, done: false };
    setTasks((current) => [...current, newTask]);
  };

  // US3 : cocher / décocher une tâche
  const toggleTask = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  // US4 : modifier le texte d'une tâche
  const updateTask = (id, newText) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, text: newText } : task,
      ),
    );
  };

  // US5 : supprimer une tâche
  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  return (
    // isolate : crée un "plan" à part, pour que les formes en -z-10
    // restent visibles au-dessus du fond crème
    <div className="relative isolate min-h-screen bg-cream text-black">
      <Background />
      <CursorFollower />

      {/* En-tête : logo + nom */}
      <header className="border-b border-oat bg-cream/70 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-6 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black hover:animate-wiggle">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-lemon"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight">
            petit pas
          </span>
        </div>
      </header>

      {/* Contenu centré */}
      <main className="mx-auto max-w-2xl space-y-12 px-6 py-12">
        <US1 onAddTask={addTask} />
        <US2
          tasks={tasks}
          onToggleTask={toggleTask}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
        />
      </main>
    </div>
  );
}