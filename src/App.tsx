import { useContext, useEffect } from "react";

import { Priciniples } from "@/components/Pricinples";
import { Projects } from "@/components/Projects";
import { Timer } from "@/components/Timer";
import { TodoList } from "@/components/TodoList";

import { Label } from "@/components/common/Label";
import { ActiveProjectContext } from "./ActiveProjectContextProvider";

function App() {
  const activeProject = useContext(ActiveProjectContext);

  // Set darkmode depending on the type of week
  useEffect(() => {
    const htmlElement = document.querySelector("html");

    if (activeProject.isDark) htmlElement?.classList?.add("dark");
    else htmlElement?.classList?.remove("dark");
  }, [activeProject]);

  return (
    <div className="grid h-screen w-full grid-cols-12 overflow-auto bg-gray-200 dark:bg-gray-800 dark:text-white">
      <div className="col-span-2 space-y-4 overflow-y-auto p-4">
        <Label>My Projects</Label>
        <Projects />
      </div>
      <div className="col-span-12 space-y-4 overflow-y-auto p-4 lg:col-span-5">
        <Label>My ToDos</Label>
        <TodoList />
      </div>
      <div className="col-span-12 flex flex-col justify-between gap-12 overflow-y-auto px-4 pt-24 pb-16 lg:col-span-5">
        <Timer activeProjectId={activeProject.id!} />
        <Priciniples />
      </div>
    </div>
  );
}

export default App;
