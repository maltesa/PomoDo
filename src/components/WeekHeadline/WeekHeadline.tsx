import { ActiveProjectContext } from "@/src/ActiveProjectContextProvider";
import { useContext } from "react";

export function WeekHeadline() {
  const activeProject = useContext(ActiveProjectContext);

  return (
    <h1 className="mg:text-7xl text-center text-6xl font-bold lg:text-8xl">
      It's {activeProject.name} Week
    </h1>
  );
}
