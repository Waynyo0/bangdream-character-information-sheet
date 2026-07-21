import { Router } from "express";
import { getDb, queryAll } from "../db.js";

const router = Router();

const COLS = "id, name, band, height, birthday_month AS month, birthday_day AS day, avatar";

function attachFullUrl(req, member) {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  return { ...member, avatar: `${baseUrl}${member.avatar}` };
}

router.get("/members", async (req, res) => {
  await getDb();
  const members = queryAll(`SELECT ${COLS} FROM members ORDER BY id`);
  res.json(members.map((m) => attachFullUrl(req, m)));
});

router.get("/members/birthdays/today", async (req, res) => {
  await getDb();
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const members = queryAll(
    `SELECT ${COLS} FROM members WHERE birthday_month = ? AND birthday_day = ?`,
    [month, day]
  );
  res.json(members.map((m) => attachFullUrl(req, m)));
});

router.get("/members/birthdays/next", async (req, res) => {
  await getDb();
  const all = queryAll(`SELECT ${COLS} FROM members ORDER BY id`);
  const today = new Date();
  const todayM = today.getMonth() + 1;
  const todayD = today.getDate();

  let closest = null;
  let minDays = Infinity;

  for (const m of all) {
    const from = new Date(today.getFullYear(), todayM - 1, todayD);
    let to = new Date(today.getFullYear(), m.month - 1, m.day);
    if (to < from) {
      to = new Date(today.getFullYear() + 1, m.month - 1, m.day);
    }
    const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24));
    if (days > 0 && days < minDays) {
      minDays = days;
      closest = m;
    }
  }

  if (!closest) return res.json(null);

  res.json({
    member: attachFullUrl(req, closest),
    days: minDays,
  });
});

export default router;
