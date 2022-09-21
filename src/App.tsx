import { useEffect } from "react";

import { Timer } from "@/components/Timer";
import { TodoList } from "@/components/TodoList";
import { WeekHeadline } from "@/components/WeekHeadline/WeekHeadline";
import { useWeekType } from "@/utils/useWeekType";

function App() {
  const weekType = useWeekType();

  // Set darkmode depending on the type of week
  useEffect(() => {
    if (weekType === "marketing") return;

    const htmlElement = document.querySelector("html");
    htmlElement?.classList?.add("dark");
  }, [weekType]);

  return (
    <div className="bg-slate-200 h-screen flex flex-col items-center dark:bg-black dark:text-white px-8 pt-28 pb-8 overflow-auto">
      <WeekHeadline />
      <div className="grid grid-cols-2 w-full mt-36">
        <TodoList />
        <Timer />
      </div>
    </div>
  );
}

export default App;
