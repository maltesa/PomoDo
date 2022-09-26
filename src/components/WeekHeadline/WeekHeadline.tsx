import { useWeekType } from "@/utils/useWeekType";

export function WeekHeadline() {
  const [letter, ...rest] = useWeekType();

  return (
    <h1 className="mg:text-7xl text-center text-6xl font-bold lg:text-8xl">
      It's {letter.toUpperCase()}
      {rest} Week
    </h1>
  );
}
