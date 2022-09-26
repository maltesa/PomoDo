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
    <div className="flex h-screen flex-col items-center overflow-auto bg-slate-200 px-4 pt-16 pb-8 dark:bg-black dark:text-white lg:px-8 lg:pt-28">
      <WeekHeadline />
      <div className="mt-20 grid w-full grid-cols-2 gap-8 lg:mt-36">
        <div className="col-span-2 lg:col-span-1">
          <TodoList />
        </div>
        <div className="col-span-2 flex flex-col gap-12 lg:col-span-1">
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
