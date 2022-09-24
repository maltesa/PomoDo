import { useCallback, useRef } from "react";

export function useClickOutsideListenerRef<T extends HTMLElement>(
  onClose: () => void
) {
  const ref = useRef<T | null>(null);

  const escapeListener = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, []);

  const clickListener = useCallback((e: MouseEvent) => {
    const clickedWithin = ref.current!.contains(e.target as any);
    if (!clickedWithin) onClose();
  }, []);

  const setRefAndListeners = useCallback((value: T) => {
    if (value) {
      ref.current = value;
      document.addEventListener("mousedown", clickListener);
      document.addEventListener("keyup", escapeListener);
    } else {
      document.removeEventListener("mousedown", clickListener);
      document.removeEventListener("keyup", escapeListener);
      ref.current = null;
    }
  }, []);

  return setRefAndListeners;
}
