import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ActionResult<T> = 
  | { success: true; data: T; id?: string }
  | { success: false; message: string; id?: string };