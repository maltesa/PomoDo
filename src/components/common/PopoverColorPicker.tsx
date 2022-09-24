import { useClickOutsideListenerRef } from "@/utils/useClickOutsideListenerRef";
import { ComponentProps, useCallback, useState } from "react";
import { HexColorPicker } from "react-colorful";

type Props = ComponentProps<typeof HexColorPicker>;

export const PopoverColorPicker = ({ color, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);
  const popover = useClickOutsideListenerRef<HTMLDivElement>(close);

  return (
    <div className="relative">
      <div
        className="h-11 w-11 cursor-pointer rounded border dark:border-slate-800"
        style={{ backgroundColor: color }}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div
          className="absolute top-12 right-0 rounded shadow-lg"
          ref={popover}
        >
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
