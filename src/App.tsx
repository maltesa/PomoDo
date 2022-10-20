import { useContext, useEffect } from "react";

import { Priciniples } from "@/components/Pricinples";
import { Projects } from "@/components/Projects";
import { Timer } from "@/components/Timer";
import { TodoList } from "@/components/TodoList";
import { WeekHeadline } from "@/components/WeekHeadline/WeekHeadline";

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
    <div className="flex h-screen flex-col items-center overflow-auto bg-slate-200 px-4 pt-16 pb-8 dark:bg-black dark:text-white lg:px-8 lg:pt-28">
      <div className="space-y-8 text-center">
        <WeekHeadline />
        <Projects />
      </div>
      <div className="mt-20 grid w-full grid-cols-2 gap-8 lg:mt-36">
        <div className="col-span-2 lg:col-span-1">
          <TodoList />
        </div>
        <div className="col-span-2 flex flex-col gap-12 lg:col-span-1">
          <Timer activeProjectId={activeProject.id!} />
          <div>
            <Priciniples />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
