// lib/utils.ts
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getCountryFlag(countryCode: string): string {
    const baseOffset = 127397; // This is the Unicode offset for regional indicator symbols

    // Convert the country code to uppercase and split it into an array of characters
    const chars = countryCode.toUpperCase().split('');

    // Convert each character to its corresponding regional indicator symbol
    const flagEmoji = chars.map(char =>
        String.fromCodePoint(char.charCodeAt(0) + baseOffset)
    ).join('');

    return flagEmoji;
}