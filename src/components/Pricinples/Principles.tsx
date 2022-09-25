import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useLiveQuery } from "dexie-react-hooks";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";

import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { PopoverColorPicker } from "@/components/common/PopoverColorPicker";
import { db, DBPrinciple } from "@/src/db";
import { useForm } from "@/utils/useForm";

export function Priciniples() {
  return (
    <div>
      <h2 className="mb-4 text-center text-lg font-medium text-slate-400 dark:text-slate-300">
        Things you want to be reminded of.
      </h2>
      <CreatePrinciple />
      <PricipleList />
    </div>
  );
}

function CreatePrinciple() {
  const [hasFocus, setHasFocus] = useState(false);
  const [priciple, setPriciple] = useState("");
  const [color, setColor] = useState("#047857");
  const form = useForm("principle", "href");

  const handleSubmit = form(async ({ principle, href }, formElement) => {
    try {
      await db.principles.add({ principle, href, color });
      formElement.reset();
      setPriciple("");
    } catch {
      alert("Failed to add priciple. Try again.");
    }
  });

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
      <div className="flex items-center gap-2">
        <Input
          required
          type="text"
          name="principle"
          placeholder="Priciple"
          className="flex-grow"
          onChange={(e) => setPriciple(e.currentTarget.value)}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
        />
        <PopoverColorPicker color={color} onChange={setColor} />
      </div>
      <AnimatePresence>
        {(priciple.length > 0 || hasFocus) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2 pt-2">
              <Input
                type="text"
                name="href"
                placeholder="URL (optional)"
                className="flex-grow"
              />
              <Button icon={PlusIcon} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function PricipleList() {
  const principles = useLiveQuery(() => db.principles.toArray());

  return (
    <LayoutGroup>
      <ul className="mt-6 flex flex-wrap px-8">
        <AnimatePresence>
          {(principles || []).map((priciple) => (
            <motion.li
              layout
              key={priciple.id}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Priciple {...priciple} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </LayoutGroup>
  );
}

function Priciple({ id, principle, href, color }: DBPrinciple) {
  const handleDelete = () => {
    db.principles.delete(id!);
  };

  return (
    <div
      className="m-1.5 inline-flex items-center gap-2 whitespace-nowrap rounded py-1 px-3 text-sm text-white"
      style={{ background: color }}
    >
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferer"
          className="hover:text-slate-700 dark:hover:text-slate-300"
        >
          {principle}
        </a>
      ) : (
        principle
      )}
      <button onClick={handleDelete} className="hover:text-red-500">
        <TrashIcon />
      </button>
    </div>
  );
}
