/** Format a date-only value in pt-BR without timezone shift (uses UTC date parts). */
export function formatDatePtBR(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
