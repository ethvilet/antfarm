CREATE TABLE IF NOT EXISTS sync_jobs (
  id TEXT PRIMARY KEY,
  canary_name TEXT NOT NULL,
  status TEXT NOT NULL,
  payload TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sync_jobs_canary ON sync_jobs(canary_name);
CREATE INDEX IF NOT EXISTS idx_sync_jobs_status ON sync_jobs(status);
