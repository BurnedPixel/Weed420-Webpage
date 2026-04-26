export interface TourEntry {
  date: string;
  venue: string;
  city: string;
  link: string;
}

const CURRENT_YEAR = new Date().getFullYear();

const months: Record<string, number> = {
  JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
  JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11,
};

function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const dashIdx = dateStr.indexOf('-');
  if (dashIdx > -1) {
    dateStr = dateStr.slice(0, dashIdx).trim() + dateStr.slice(dateStr.lastIndexOf(' '));
  }
  const parts = dateStr.toUpperCase().trim().split(/[\s,]+/);
  if (parts.length >= 3) {
    const month = months[parts[0]] ?? 0;
    const day = parseInt(parts[1]) || 1;
    const year = parseInt(parts[parts.length - 1]) || CURRENT_YEAR;
    return new Date(year, month, day);
  }
  return null;
}

function isPast(dateStr: string): boolean {
  const d = parseDate(dateStr);
  return d ? d.getFullYear() < CURRENT_YEAR : false;
}

function sanitize(str: string | null | undefined): string {
  if (!str) return '';
  return String(str).replace(/[<>"'&]/g, '').slice(0, 200);
}

export async function fetchTourDates(baseUrl: string): Promise<TourEntry[]> {
  const url = `${baseUrl}/gviz/tq?tqx=out:json&sheet=tourdates`;
  const res = await fetch(url);
  const text = await res.text();
  const json = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
  const rows: Array<{ c?: Array<{ f?: string; v?: string }> }> = json.table?.rows || [];

  let prevDate: string | null = null;
  return rows
    .slice(1)
    .filter(row => {
      const hidden = row.c?.[4]?.v;
      return !hidden || String(hidden).toLowerCase() !== 'yes';
    })
    .map(row => {
      const dateVal = row.c?.[0]?.f || row.c?.[0]?.v || prevDate;
      if (dateVal) prevDate = dateVal;
      return {
        date: sanitize(dateVal),
        venue: sanitize(row.c?.[1]?.v),
        city: sanitize(row.c?.[2]?.v),
        link: sanitize(row.c?.[3]?.v),
      };
    })
    .filter(d => d.date || d.venue)
    .filter(d => !isPast(d.date));
}
