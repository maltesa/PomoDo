import { useEffect } from "react";

import { Timer } from "@/components/Timer";
import { TodoList } from "@/components/TodoList";
import { WeekHeadline } from "@/components/WeekHeadline/WeekHeadline";
import { useWeekType } from "@/utils/useWeekType";
import { Priciniples } from "./components/Pricinples";

function App() {
  const weekType = useWeekType();

  // Set darkmode depending on the type of week
  useEffect(() => {
    if (weekType === "marketing") return;

    const htmlElement = document.querySelector("html");
    htmlElement?.classList?.add("dark");
  }, [weekType]);

  return (
    <div className="flex h-screen flex-col items-center overflow-auto bg-slate-200 px-8 pt-28 pb-8 dark:bg-black dark:text-white">
      <WeekHeadline />
      <div className="mt-36 grid w-full grid-cols-2">
        <TodoList />
        <div className="flex flex-col gap-12">
          <Timer />
          <div>
            <Priciniples />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
