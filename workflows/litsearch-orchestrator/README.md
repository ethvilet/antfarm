# litsearch-orchestrator (Adapter Workflow)

Purpose: minimal-risk Antfarm orchestration layer for the standalone `litsearch` compute engine.

## Boundary (DO NOT VIOLATE)
- `litsearch` = **computation engine** (providers, ranking, dedup, scoring)
- Antfarm = **orchestration only** (sequencing, retries, status, validation, summary)
- No refactors of litsearch ranking logic in this workflow.

## Manual Run (operator) — syntax proven in this repo

1) List workflows (optional):
```bash
cd /home/ubuntu/.openclaw/workspace/antfarm
./bin/antfarm workflow list
```

2) Run this workflow:
```bash
cd /home/ubuntu/.openclaw/workspace/antfarm
./bin/antfarm workflow run litsearch-orchestrator "LITSEARCH_REPO=/ABS/PATH/TO/litsearch QUERY='weather prediction markets' PROFILE=prediction-markets TOP=10 FLAGS=''"
```

3) Check status:
```bash
cd /home/ubuntu/.openclaw/workspace/antfarm
./bin/antfarm workflow runs
./bin/antfarm workflow status litsearch-orchestrator
```

## Smoke-run example (copy/paste)

```bash
cd /home/ubuntu/.openclaw/workspace/antfarm
./bin/antfarm workflow run litsearch-orchestrator "LITSEARCH_REPO=~/Desktop/Lisrel/Research\ Compiler/litsearch QUERY='weather prediction markets' PROFILE=prediction-markets TOP=10 FLAGS=''"
```

Expected PASS/FAIL-style cues:
- `workflow run` prints a run id; use `workflow status` to follow progress.
- The final step output must contain:
  - `GATE_DECISION: PASS` (or `GATE_DECISION: FAIL`)
  - `SUMMARY:` and `REASON:` fields

## Troubleshooting (max 3)
- **Canonical path mismatch**: ensure repo path is exactly `~/Desktop/Lisrel/Research Compiler/litsearch` (no trailing space/case drift).
- **Missing litsearch repo**: verify the directory exists locally and is accessible from where you run litsearch.
- **Missing Python deps/.venv**: activate litsearch venv and run `pip install -e ".[dev]"` per litsearch README.

## Expected outputs
- A litsearch run produces `out/litsearch-<UTC>.json` and `out/litsearch-<UTC>.md` (and optional `.bib`).
- This workflow validates transparency fields and emits a PASS/FAIL gate decision.
