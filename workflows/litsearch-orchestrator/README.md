# litsearch-orchestrator (Adapter Workflow)

Purpose: minimal-risk Antfarm orchestration layer for the standalone `litsearch` compute engine.

## Boundary
- `litsearch` = computation engine (ranking/dedup/providers)
- Antfarm = sequencing/retries/status only
- No refactors of litsearch ranking logic in this workflow.

## Manual run (operator)
This repository does not execute the workflow automatically here.
Codex/operator runs the `litsearch` CLI locally and provides artifacts for audit.

## Expected outputs
- A run produces `out/litsearch-<UTC>.json` and `out/litsearch-<UTC>.md` (and optional `.bib`).
- The workflow validates transparency fields and emits a PASS/FAIL gate decision.
