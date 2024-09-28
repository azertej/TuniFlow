import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertTime = (created: Date): string => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - created.getTime()) / 1000);
  
  const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
  };
  
  let counter;
  for (const [unit, interval] of Object.entries(intervals)) {
      counter = Math.floor(seconds / interval);
      if (counter > 0) {
          return `${counter} ${unit}${counter > 1 ? 's' : ''} ago`;
      }
  }
  
  return 'just now';
};

export function formatMonthYear(date: any): string {
  const parsedDate = new Date(date);
  if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date input');
  }

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
  return parsedDate.toLocaleDateString('en-US', options);
}