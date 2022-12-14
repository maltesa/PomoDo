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
  return (
    <div className="space-y-4">
      <h2 className="text-center text-lg font-medium text-gray-700 dark:text-gray-300">
        Things you want to be reminded of.
      </h2>
      <PricipleList />
      <CreatePrinciple />
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
          placeholder="Add a new Priciple"
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
    <ul className="flex flex-wrap justify-center overflow-hidden px-8">
      <AnimatePresence>
        {(principles || []).map((priciple) => (
          <motion.li
            key={priciple.id}
            layout="position"
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
          className="hover:underline"
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
