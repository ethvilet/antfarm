# Ledger entry: 20260216-example-entry

## Hypothesis
Example skeleton entry for Option B ledger structure.

## Change (proposal)
- Split monolithic LEDGER.md into an index-only LEDGER.md plus per-entry immutable files.
- Create ENTRY_TEMPLATE.md and this example entry.

## Expected gain
- Reduced merge conflicts and faster scans by keeping LEDGER.md <= ~200 lines.

## Risks
- Migration mistakes could drop history if archival step is skipped.

## Eval plan
- Verification: run the Option B post-flight verification artifact (derived/verify-option-b-ledger-<UTC>.txt).

## Entry fields (machine-parseable)
schema_version: ledger-entry-v1
backup_primary_artifact: derived/backup/openclaw-backup-20260216-143208Z.tar.gz
baseline_primary_artifact: derived/eval/baseline-<UTC>.json
env_fingerprint_artifact: derived/env/openclaw-fingerprint-<UTC>.txt
preregistered_success_criteria: index_table_ok && parse_block_ok && archive_ok && upgrade_contract_ok

## Spec-gaming check
- N/A (structure-only change).

## Results
- (to be filled by execution artifacts)

## Decision
- ITERATE

## Audit trail
- docs/self_improvement/ledger_archive/LEDGER-pre-split-20260216-143208Z.md
- derived/backup/openclaw-backup-20260216-143208Z.manifest.txt

Notes:
- Older versions of this entry (if any) must be referenced here or in the Audit trail (not via index columns).
- Inside the machine-parseable block, use plain unbulleted key: value lines only (no bullets/lists).
