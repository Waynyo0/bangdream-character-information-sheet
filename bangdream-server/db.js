import initSqlJs from "sql.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "bangdream.db");

let db = null;

export async function getDb() {
  if (db) return db;

  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      band TEXT NOT NULL,
      height INTEGER NOT NULL,
      birthday_month INTEGER NOT NULL,
      birthday_day INTEGER NOT NULL,
      avatar TEXT NOT NULL
    )
  `);

  const count = db.exec("SELECT COUNT(*) AS c FROM members");
  if (!count.length || count[0].values[0][0] === 0) {
    await seedDatabase(db);
  }

  return db;
}

function saveDb() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  }
}

async function seedDatabase(database) {
  const dataPath = path.join(__dirname, "data", "BanG_Dream_角色信息表.txt");
  const content = fs.readFileSync(dataPath, "utf-8");
  const lines = content.split("\n");

  let currentBand = "";
  const stmts = [];

  for (const line of lines) {
    const bandMatch = line.match(/^【(.+?)】$/);
    if (bandMatch) {
      currentBand = bandMatch[1];
      continue;
    }

    const dataMatch = line.match(/^(.+?)\s+(\d+)cm\s+(\d+)月(\d+)日/);
    if (!dataMatch) continue;

    const rawName = dataMatch[1];
    const cleanName = rawName.replace(/\(.+?\)$/, "");
    const height = parseInt(dataMatch[2]);
    const month = parseInt(dataMatch[3]);
    const day = parseInt(dataMatch[4]);
    const avatar = `/bangdream/${cleanName}.png`;

    stmts.push([cleanName, currentBand, height, month, day, avatar]);
  }

  const insert = database.prepare(
    "INSERT INTO members (name, band, height, birthday_month, birthday_day, avatar) VALUES (?, ?, ?, ?, ?, ?)"
  );

  for (const row of stmts) {
    insert.run(row);
  }
  insert.free();
  saveDb();

  const result = database.exec("SELECT COUNT(*) AS c FROM members");
  console.log(`Seeded ${result[0].values[0][0]} members`);
}

function queryAll(sql, params = []) {
  const results = [];
  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

export { queryAll };
