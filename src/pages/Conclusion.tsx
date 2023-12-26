export default function Conclusion() {
  const location = localStorage.getItem("location");
  const date = new Date(localStorage.getItem("date")!);

  function formatDate(date: Date) {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const suffix = getOrdinalSuffix(day);

    return day + suffix + " of " + month;
  }

  function getOrdinalSuffix(day: number) {
    if (day >= 11 && day <= 13) {
      return "th";
    } else {
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }
  }

  return (
    <main>
      <h1 className="text-center text-2xl font-black">Conclusion</h1>
      <p className="text-center">
        We will meet at {location} on the {formatDate(date)}
      </p>
    </main>
  );
}
