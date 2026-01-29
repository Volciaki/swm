import { format } from "date-fns";

export const formatDateAsHumanReadable = (date: Date): string => format(date, "yyyy/MM/dd - HH:mm:ss");
