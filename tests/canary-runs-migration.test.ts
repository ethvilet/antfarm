import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { DatabaseSync } from "node:sqlite";
import { getDbPath, getDb } from "../dist/db.js";

// This test verifies that the canary_runs table is created by migrate()
async function runTest() {
  console.log("Test: canary_runs migration exists and has expected columns...");

  try {
    // Trigger migration by calling getDb(), which ensures the DB and migrations run
    const db = getDb();

    const rows = db.prepare("PRAGMA table_info(canary_runs)").all() as Array<{ name: string }>;
    const colNames = new Set(rows.map((r) => r.name));

    const expected = [
      "id",
      "canary_name",
      "started_at",
      "finished_at",
      "status",
      "meta",
      "created_at",
      "updated_at",
    ];

    for (const col of expected) {
      if (!colNames.has(col)) {
        throw new Error(`Missing column in canary_runs: ${col}`);
      }
    }

    console.log("  ✓ canary_runs table has expected columns");
    console.log("PASS: canary_runs migration test\n");
    process.exit(0);
  } catch (err) {
    console.error("FAIL:", err);
    process.exit(1);
  }
}

runTest();
