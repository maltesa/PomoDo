import { useEffect } from "react";
import { WeekHeadline } from "./components/WeekHeadline/WeekHeadline";
import { useWeekType } from "./utils/useWeekType";

function App() {
  const weekType = useWeekType();

  // Set darkmode depending on the type of week
  useEffect(() => {
    if (weekType === "marketing") return;

    const htmlElement = document.querySelector("html");
    htmlElement?.classList?.add("dark");
  }, [weekType]);

  return (
    <div className="h-screen flex flex-col gap-8 items-center justify-center dark:bg-black dark:text-white p-8">
      <WeekHeadline />
    </div>
  );
}

export default App;
