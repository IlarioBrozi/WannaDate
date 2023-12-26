import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "@/components/calendar";
import { Button } from "@/components/button";

export default function DateDay() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <main>
      <h1 className="text-center text-2xl font-black">Choose a date</h1>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="my-6 rounded-md border shadow"
      />
      <Button asChild>
        <Link
          to="/WannaDate/choose-date-type"
          onClick={() => localStorage.setItem("date", `${date}`)}>
          Next
        </Link>
      </Button>
    </main>
  );
}
