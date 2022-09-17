import { useWeekType } from "../../utils/useWeekType";

export function WeekHeadline() {
  const [letter, ...rest] = useWeekType();

  return (
    <h1 className="font-bold text-8xl text-center">
      It's {letter.toUpperCase()}
      {rest} Week
    </h1>
  );
}
