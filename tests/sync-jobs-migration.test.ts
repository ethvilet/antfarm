import { getDb } from "../dist/db.js";

async function runTest() {
  console.log("Test: sync_jobs migration exists and has expected columns...");
  try {
    const db = getDb();
    const rows = db.prepare("PRAGMA table_info(sync_jobs)").all() as Array<{ name: string }>;
    const colNames = new Set(rows.map((r) => r.name));

    const expected = ["id", "canary_name", "status", "payload", "created_at", "updated_at"];
    for (const col of expected) {
      if (!colNames.has(col)) {
        throw new Error(`Missing column in sync_jobs: ${col}`);
      }
    }

    // test insert and select of JSON payload
    const sample = { foo: "bar", count: 3 };
    const id = 'test-sync-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
    db.prepare("INSERT INTO sync_jobs(id, canary_name, status, payload, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?)")
      .run(id, 'safe-sync-nonplan', 'pending', JSON.stringify(sample), new Date().toISOString(), new Date().toISOString());

    const r = db.prepare("SELECT payload FROM sync_jobs WHERE id = ?").get(id);
    const payload = JSON.parse(r.payload);
    if (payload.foo !== 'bar' || payload.count !== 3) throw new Error('Payload did not match');

    console.log('  ✓ sync_jobs table created and payload stored');
    console.log('PASS: sync_jobs migration test\n');
    process.exit(0);
  } catch (err) {
    console.error('FAIL:', err);
    process.exit(1);
  }
}

runTest();
