import { useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";

const locations = [
  {
    value: "a park",
    label: "Park"
  },
  {
    value: "a starbucks",
    label: "Starbucks"
  },
  {
    value: "a restaurant",
    label: "Restaurant"
  },
  {
    value: "an art gallery",
    label: "Art gallery"
  },
  {
    value: "my place (😉)",
    label: "My place 😉"
  }
];

export default function DateType() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <main>
      <h1 className="text-center text-2xl font-black">Choose a place</h1>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="my-6 w-full justify-between sm:w-96">
            {value
              ? locations.find(location => location.value === value)?.label
              : "Choose date location..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search location..." className="h-9" />
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              {locations.map(location => (
                <CommandItem
                  key={location.value}
                  value={location.value}
                  onSelect={currentValue => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}>
                  {location.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === location.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <Button asChild>
        <Link
          to="/WannaDate/conclusion"
          onClick={() => localStorage.setItem("location", `${value}`)}>
          Next
        </Link>
      </Button>
    </main>
  );
}
