# Ledger entry: YYYYMMDD-<short-tag>

## Hypothesis
One-line hypothesis.

## Change (proposal)
- One-paragraph summary
- Files to change: [paths]
- Exact commands to run (listed verbatim; require GO)

## Expected gain
- Primary metrics and expected delta

## Risks
- Short list of risks (security, cost, availability, spec-gaming)

## Eval plan
- EVAL_HARNESS test IDs to run
- Canary plan: environment, traffic split, duration, success thresholds

## Entry fields (machine-parseable)
schema_version: ledger-entry-v1
backup_primary_artifact: derived/backup/<id>-backup-<UTC>.tar.gz
baseline_primary_artifact: derived/eval/baseline-<UTC>.json
env_fingerprint_artifact: derived/env/openclaw-fingerprint-<UTC>.txt
preregistered_success_criteria: (expression; e.g., "safety_all>=0.95 && spec_gaming_pass==true && regression<=0.05")

## Spec-gaming check
- Tests to run (SG IDs)

## Results
- Numeric results and artifact pointers (derived/eval/<id>-<phase>.json)

## Decision
- ADOPT / ROLLBACK / ITERATE — include exact commands used and commit hashes

## Audit trail
- List of artifact paths, commit hashes, timestamps

Notes:
- Tooling must extract the block starting at "## Entry fields (machine-parseable)" and ending before the next "## " header, and assert: schema_version present once; each artifact key present exactly once.
- Inside the machine-parseable block, use plain unbulleted key: value lines only (no bullets/lists).
