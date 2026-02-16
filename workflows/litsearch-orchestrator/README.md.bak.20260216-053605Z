# litsearch-orchestrator (Adapter Workflow)

Purpose: minimal-risk Antfarm orchestration layer for the standalone `litsearch` compute engine.

## Boundary (DO NOT VIOLATE)
- `litsearch` = **computation engine** (providers, ranking, dedup, scoring)
- Antfarm = **orchestration only** (sequencing, retries, status, validation, summary)
- No refactors of litsearch ranking logic in this workflow.

## Runbook status (docs-only)
- B1 PASS
- B2 PASS
- B3 PASS
- B4 NOT AUTHORIZED / NOT RUN
- commit refs: `e79b3b1`, `27e0b56`

## Manual Run (operator) — syntax proven in this repo

### Preflight (3 commands max)
```bash
pwd
./bin/antfarm workflow list
test -d "<LITSEARCH_REPO>" && echo OK || echo MISSING
```

### Commands

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

### Smoke-run example (copy/paste)
```bash
cd /home/ubuntu/.openclaw/workspace/antfarm
./bin/antfarm workflow run litsearch-orchestrator "LITSEARCH_REPO=~/Desktop/Lisrel/Research\ Compiler/litsearch QUERY='weather prediction markets' PROFILE=prediction-markets TOP=10 FLAGS=''"
```

Expected PASS/FAIL-style cues:
- `workflow run` prints a run id; use `workflow status` to follow progress.
- Final step output must contain:
  - `GATE_DECISION: PASS` (or `GATE_DECISION: FAIL`)
  - `SUMMARY:` and `REASON:` fields

## Failure triage (compact)

- `PATH_MISMATCH`
  - Symptom: scope guard rejects repo path.
  - Check: `printf '%q\n' "<LITSEARCH_REPO>"`
  - Fix: use canonical path; remove trailing spaces.

- `LITSEARCH_REPO_MISSING`
  - Symptom: preflight prints `MISSING`.
  - Check: `test -d "<LITSEARCH_REPO>" && echo OK || echo MISSING`
  - Fix: clone/open litsearch repo at canonical path.

- `VENV_OR_DEPS_MISSING`
  - Symptom: litsearch CLI fails (import/module not found).
  - Check: `ls -la "<LITSEARCH_REPO>/.venv"`
  - Fix: create venv + `pip install -e ".[dev]"`.

- `WORKFLOW_NOT_LISTED`
  - Symptom: `litsearch-orchestrator` not in workflow list.
  - Check: `./bin/antfarm workflow list`
  - Fix: update/pull Antfarm repo; ensure workflow present.

## Operator reliability micro-additions

### No-op success format (for reports)
Return:
- `NO_CODE_CHANGE`
- reason: <1 line>
- reason: <1 line>
- evidence: <command output or file path>

## Cost-safe reporting defaults
- Default report: **<= 10 bullets**
- Max: **one fix-pass** per failed gate
- Stop + blocker triage after **second failure**

## Troubleshooting (max 3)
- **Canonical path mismatch**: ensure repo path is exactly `~/Desktop/Lisrel/Research Compiler/litsearch` (no trailing space/case drift).
- **Missing litsearch repo**: verify the directory exists locally and is accessible.
- **Missing Python deps/.venv**: activate venv and install deps per litsearch README.

## Expected outputs
- A litsearch run produces `out/litsearch-<UTC>.json` and `out/litsearch-<UTC>.md` (and optional `.bib`).
- This workflow validates transparency fields and emits a PASS/FAIL gate decision.
