CHANGE_CONTROL.md - Self-Improvement Change Control

Purpose: Controlled lifecycle for changes to assistant or workspace artifacts. Human-approved only.

Workflow summary: (-1) Backup → (0) Baseline+Fingerprint → Propose → Review → Approve (GO) → Canary → Decide (Adopt/Rollback)

(-1) Backup Snapshot (required)
Tier-1 backup (default; excludes secrets)
- Artifact: derived/backup/openclaw-backup-<UTC>.tar.gz
- Companion manifest: derived/backup/openclaw-backup-<UTC>.manifest.txt
- MUST exclude: ~/.openclaw/credentials/, tokens, and any *.env with secrets
- CREATE with restrictive perms (umask 0077; chmod 600). Manifest lists included paths + counts only.

(0) Baseline Snapshot (required)
- If backup_primary_artifact is missing, STOP and request GO to run Step (-1).
- Env fingerprint: derived/env/openclaw-fingerprint-<UTC>.txt
- Baseline eval: derived/eval/baseline-<UTC>.json
- Record baseline_primary_artifact + env_fingerprint_artifact in the entry BEFORE any canary.

Option B: LEDGER index & per-entry records
- LEDGER.md is an index-only markdown table with EXACT columns: | ID | date_utc | hypothesis | decision | entry_file | primary_artifact |
- decision ∈ {ADOPT, ROLLBACK, ITERATE}
- entry_file → docs/self_improvement/ledger/<ID>(-vN)?.md
- Per-entry files are immutable; revisions create <ID>-vN.md. LEDGER.md must point to latest; older versions referenced inside the entry file.

Machine-parseable block (required)
- Each entry file MUST include a block starting with the exact header:
  ## Entry fields (machine-parseable)
- The block ENDS at the next header beginning with "## " (exclusive).
- Inside the block: plain key: value lines only (no bullets/lists).
- Required single-occurrence keys in the block:
  schema_version: ledger-entry-v1
  backup_primary_artifact: <path>
  baseline_primary_artifact: <path>
  env_fingerprint_artifact: <path>
  preregistered_success_criteria: <expr>

Migration (safe)
- Migration is a separate operation requiring Step (-1) backup + a migration entry + human GO.
- Preserve the archived monolithic ledger at: docs/self_improvement/ledger_archive/LEDGER-pre-split-<UTC>.md

Upgrade Safety & Compatibility Contract
> - Treat OpenClaw upgrades as change-controlled: Step (-1) Backup → Step (0) Baseline + env fingerprint → Canary → Adopt/Rollback.
> - Compatibility contract source of truth is env_fingerprint_artifact (derived/env/openclaw-fingerprint-<UTC>.txt). Do not rely on undocumented flags/paths/formats.
> - Fail-closed: if compatibility tests (C01–C04) or fingerprint/CLI surface checks fail, STOP and do not adopt until updated + re-validated.
> - Restore guarantee: Tier-1 backup artifact + manifest must be sufficient to restore last-known-good without printing secrets.

Notes: All MUST/SHOULD rules above must be followed; this file is intentionally lean.
