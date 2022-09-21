import { PauseIcon, PlayIcon, TrackNextIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useState } from "react";
import useSound from "use-sound";

import { db } from "@/src/db";
import { serializeTimeStr } from "@/src/utils/timeStrings";
import { useTimer } from "@/utils/useTimer";
import { getWeekType } from "@/utils/useWeekType";

import { Button } from "@/components/common/Button";
import sessionAudio from "@/src/static/audio/readytoflow.ogg";
import breakAudio from "@/src/static/audio/takeabreak.ogg";

export const sessionDurationMs = 1000 * 60 * 25;
export const breakDurationMs = 1000 * 60 * 5;
// export const sessionDurationMs = 10000;
// export const breakDurationMs = 5000;

export function Timer() {
  const [playBreak] = useSound(breakAudio);
  const [playSession] = useSound(sessionAudio);
  const [isBreak, setIsBreak] = useState(false);

  const nextTimer = useCallback(() => {
    setIsBreak((isBreak) => !isBreak);
  }, []);

  const { start, stop, status, remainingMs } = useTimer(
    isBreak ? breakDurationMs : sessionDurationMs,
    {
      onTick: async (msSinceUpdate) =>
        !isBreak && updateActiveTodo(msSinceUpdate),
      onCompletion: () => {
        nextTimer();
        return true;
      },
    }
  );

  // Play session sounds
  useEffect(() => {
    if (status !== "running") return;

    isBreak ? playBreak() : playSession();
  }, [isBreak, status]);

  return (
    <div className="space-y-8">
      <div className="text-7xl font-light text-center">
        {serializeTimeStr(remainingMs)}
      </div>
      <div className="flex justify-center gap-4 mx-auto">
        <Button
          onClick={status === "running" ? stop : start}
          icon={status === "running" ? PauseIcon : PlayIcon}
        />
        <Button onClick={nextTimer} icon={TrackNextIcon}>
          {isBreak ? "Session" : "Break"}
        </Button>
      </div>
    </div>
  );
}

async function updateActiveTodo(timePassed: number) {
  const weekType = getWeekType();

  // FIXME: Find better way to find active ToDo
  const todos = await db.todos
    .where({ category: weekType, completed: 0 })
    .sortBy("pos");
  if (!todos[0]) return;

  // Update active Todo
  const { id, remainingMs } = todos[0];
  const updatedRemainingMs = Math.max(0, remainingMs - timePassed);
  await db.todos.update(id, { remainingMs: updatedRemainingMs });

  return todos[0];
}
