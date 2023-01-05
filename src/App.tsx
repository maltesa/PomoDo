import { useContext, useEffect } from "react";

import { Priciniples } from "@/components/Pricinples";
import { Projects } from "@/components/Projects";
import { Timer } from "@/components/Timer";
import { TodoList } from "@/components/TodoList";

import { ActiveProjectContext } from "./ActiveProjectContextProvider";

function App() {
  const activeProject = useContext(ActiveProjectContext);

  // Set darkmode depending on type of project
  useEffect(() => {
    const htmlElement = document.querySelector("html");

    if (activeProject.isDark) htmlElement?.classList?.add("dark");
    else htmlElement?.classList?.remove("dark");
  }, [activeProject]);

  return (
    <div className="grid h-screen w-full grid-cols-12 overflow-auto bg-gray-200 dark:bg-gray-800 dark:text-white">
      <div className="lg:scroll-container col-span-12 lg:col-span-2">
        <Projects />
      </div>
      <div className="lg:scroll-container col-span-12 lg:col-span-5">
        <TodoList />
      </div>
      <div className="lg:scroll-container col-span-12 flex flex-col justify-between gap-12 px-4 pt-24 pb-16 lg:col-span-5">
        <Timer activeProjectId={activeProject.id!} />
        <Priciniples />
      </div>
    </div>
  );
}

export default App;
