export const formatTime = (date: Date | any) => {
  if (!date) return "";
  
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return date; // Return the original value if it's invalid

  return parsedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
};


export const formatDate = (date: string | Date, format: string = "YYYY MMMM DD") => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Invalid Date";

  const pad = (num: number) => num.toString().padStart(2, "0");

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const replacements: Record<string, string> = {
    YYYY: d.getFullYear().toString(),
    MMMM: monthNames[d.getMonth()], // Full month name
    MM: pad(d.getMonth() + 1), // Two-digit month
    DD: pad(d.getDate()), // Two-digit day
    HH: pad(d.getHours()), // Two-digit hours
    mm: pad(d.getMinutes()), // Two-digit minutes
    ss: pad(d.getSeconds()), // Two-digit seconds
  };

  return format.replace(/YYYY|MMMM|MM|DD|HH|mm|ss/g, (match) => replacements[match]);
};