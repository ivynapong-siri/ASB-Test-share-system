import { cn } from "@/lib/utils";
import React, { useEffect, useId, useState } from "react";
import { Checkbox } from "../ui/checkbox";

interface CheckboxGroupProps {
  options: { label: string; value: string; disabled?: boolean }[];
  onChange: (selectedValues: string[]) => void;
  layout?: "row" | "column";
  value?: string[];
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, onChange, layout, value }) => {
  const id = useId();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    if (value) {
      setSelectedValues(value);
    }
  }, [value]);

  const handleCheckboxChange = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  return (
    <div className={cn("flex gap-2", layout === "row" ? "flex-row items-center" : "flex-col")}>
      {options.map((option) => (
        <Checkbox
          id={`${id}-${option.value}`}
          key={option.value}
          value={option.value}
          checked={selectedValues.includes(option.value)}
          disabled={option.disabled}
          onClick={(e) => handleCheckboxChange(e.currentTarget.value)}
          label={option.label}
          defaultChecked={selectedValues.includes(option.value)}
        />
      ))}
    </div>
  );
};

export default CheckboxGroup;
