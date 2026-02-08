export function parseISODate(input: string): Date | null {
  // Expecting YYYY-MM-DD
  const match = /^\d{4}-\d{2}-\d{2}$/.exec(input.trim());
  if (!match) return null;
  const [y, m, d] = input.split('-').map((v) => parseInt(v, 10));
  const date = new Date(y, m - 1, d);
  if (Number.isNaN(date.getTime())) return null;
  // Guard against invalid dates like 2025-02-31
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
    return null;
  }
  return date;
}

export function formatISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function daysBetween(a: Date, b: Date): number {
  const aUTC = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const bUTC = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((bUTC - aUTC) / 86400000);
}

export function getMonthMatrix(date: Date): Array<Array<Date | null>> {
  const start = startOfMonth(date);
  const month = date.getMonth();
  const matrix: Array<Array<Date | null>> = [];
  let current = new Date(start);

  const startWeekday = start.getDay(); // 0 Sunday
  current = addDays(current, -startWeekday);

  for (let week = 0; week < 6; week += 1) {
    const row: Array<Date | null> = [];
    for (let day = 0; day < 7; day += 1) {
      if (current.getMonth() === month) {
        row.push(new Date(current));
      } else {
        row.push(null);
      }
      current = addDays(current, 1);
    }
    matrix.push(row);
  }
  return matrix;
}
