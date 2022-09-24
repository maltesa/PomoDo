import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useLiveQuery } from "dexie-react-hooks";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { PopoverColorPicker } from "@/components/common/PopoverColorPicker";
import { db, DBPrinciple } from "@/src/db";
import { useForm } from "@/utils/useForm";

export function Priciniples() {
  const principles = useLiveQuery(() => db.principles.toArray());

  return (
    <div>
      <h2 className="mb-4 text-center text-lg font-medium text-slate-300">
        Things you want to be reminded of.
      </h2>
      <CreatePrinciple />
      <AnimatePresence>
        <ul className="mt-6 flex flex-wrap justify-center gap-4 px-8">
          {(principles || []).map((priciple) => (
            <motion.li
              key={priciple.id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
            >
              <Priciple {...priciple} />
            </motion.li>
          ))}
        </ul>
      </AnimatePresence>
    </div>
  );
}

function CreatePrinciple() {
  const [priciple, setPriciple] = useState("");
  const [color, setColor] = useState("#047857");
  const form = useForm("principle", "href");

  const handleSubmit = form(async ({ principle, href }, formElement) => {
    try {
      await db.principles.add({ principle, href, color });
      formElement.reset();
    } catch {
      alert("Failed to add priciple. Try again.");
    }
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-lg flex-col gap-2"
    >
      <div className="flex items-center gap-2">
        <Input
          required
          type="text"
          name="principle"
          placeholder="Priciple"
          className="flex-grow"
          onChange={(e) => setPriciple(e.currentTarget.value)}
        />
        <PopoverColorPicker color={color} onChange={setColor} />
      </div>
      {priciple.length > 0 && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          className="flex items-center gap-2"
        >
          <Input
            type="text"
            name="href"
            placeholder="URL (optional)"
            className="flex-grow"
          />
          <Button icon={PlusIcon} />
        </motion.div>
      )}
    </form>
  );
}

function Priciple({ id, principle, href, color }: DBPrinciple) {
  const handleDelete = () => {
    db.principles.delete(id!);
  };

  return (
    <div
      className="flex items-center gap-2 rounded py-1 px-3 text-sm text-white"
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
