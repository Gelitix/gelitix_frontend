import { format, parseISO } from "date-fns";

export const formatTime = (
  dateString: string,
  use24HourFormat: boolean = false
): string => {
  try {
    const date = parseISO(dateString);
    return format(date, use24HourFormat ? "HH:mm" : "h:mm a");
  } catch (error) {
    console.error("Invalid date:", dateString);
    return "Invalid Time";
  }
};

export const formatDate = (
  dateString: string,
  formatString: string = "MMMM dd, yyyy"
): string => {
  try {
    const date = parseISO(dateString);
    return format(date, formatString);
  } catch (error) {
    console.error("Invalid date:", dateString);
    return "Invalid Date";
  }
};
