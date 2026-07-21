export function sortByHeight(members, asc = false) {
  return [...members].sort((a, b) => asc ? a.height - b.height : b.height - a.height);
}

export function sortByBirthday(members, asc = true) {
  return [...members].sort((a, b) => {
    if (a.month !== b.month) return asc ? a.month - b.month : b.month - a.month;
    return asc ? a.day - b.day : b.day - a.day;
  });
}

export function getMembersByDate(members, month, day) {
  return members.filter((m) => m.month === month && m.day === day);
}

export function formatBirthday(month, day) {
  return `${month}月${day}日`;
}

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export function daysUntil(fromMonth, fromDay, toMonth, toDay) {
  const today = new Date();
  const from = new Date(today.getFullYear(), fromMonth - 1, fromDay);
  let to = new Date(today.getFullYear(), toMonth - 1, toDay);
  if (to < from) {
    to = new Date(today.getFullYear() + 1, toMonth - 1, toDay);
  }
  return Math.ceil((to - from) / (1000 * 60 * 60 * 24));
}

export function getTodayMembers(members) {
  const today = new Date();
  return getMembersByDate(members, today.getMonth() + 1, today.getDate());
}

export function getNextBirthday(members) {
  const today = new Date();
  const m = today.getMonth() + 1;
  const d = today.getDate();

  let closest = null;
  let minDays = Infinity;

  for (const member of members) {
    const days = daysUntil(m, d, member.month, member.day);
    if (days > 0 && days < minDays) {
      minDays = days;
      closest = member;
    }
  }

  return closest ? { member: closest, days: minDays } : null;
}

export const MONTH_NAMES = [
  "1月", "2月", "3月", "4月", "5月", "6月",
  "7月", "8月", "9月", "10月", "11月", "12月",
];
