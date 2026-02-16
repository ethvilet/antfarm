Self-Improvement Ledger

Purpose: Immutable chronological record of proposed and completed changes, hypotheses, evaluations, decisions, and audit artifacts.

Entry format (one entry per change; keep short and link artifacts):
- ID: YYYYMMDD-<short-tag>
- Date: YYYY-MM-DD
- Author: Lisrel (assistant) / or human approver
- Hypothesis: Short statement (If we change X then Y will improve by Z)
- Change (proposal): Concrete diffs, files added/edited, exact commands to run (include OpenClaw commands where relevant)
- Expected gain: Metrics targeted and expected delta (with baseline)
- Risks: Enumerate security, privacy, cost, availability, spec-gaming risk
- Eval plan: Which tests from EVAL_HARNESS, test data, canary plan (traffic split, duration, success thresholds)
- backup_primary_artifact: derived/backup/<id>-backup-<UTC>.tar.gz
- baseline_primary_artifact: derived/eval/baseline-<UTC>.json
- env_fingerprint_artifact: derived/env/openclaw-fingerprint-<UTC>.txt
- preregistered_success_criteria: (short machine-readable criteria for automatic gating; e.g., "safety_all>=0.95 && spec_gaming_pass==true && regression<=0.05")
- Spec-gaming check: Short planned check to detect metric-gaming (see EVAL_HARNESS spec-gaming tests)
- Results: Numeric results; attach test logs / artifacts path (e.g., derived/eval/YYYYMMDD-<id>.json)
- Decision: Adopt / Rollback / Iterate (include exact commands used to adopt or rollback and a pointer to the exact git diff or file changes)
- Notes & audit trail: Links to raw logs, commit hashes, session keys

Guidelines:
- Every proposed change must be added to the ledger before running any commands.
- Human must approve entry with GO before change actions occur.
- Keep entries terse; link big logs instead of pasting them.
- Use semantically versioned file names for artifacts: derived/<id>-artifact-v1.json etc.

Required artifacts before canary
- Step -1 (Backup Snapshot) MUST be completed and its artifact referenced in the ledger entry via backup_primary_artifact.
- Step 0 (Baseline Snapshot) MUST be completed subsequently and its artifacts referenced via baseline_primary_artifact and env_fingerprint_artifact.
- The ledger entry must include those artifact paths before any canary run is started.

Example ledger entry (template):
- ID: 20260216-reply-safety-01
- Date: 2026-02-16
- Author: Lisrel
- Hypothesis: Adding an explicit refusal template for unsafe tool requests reduces unsafe-action incidents by 50% on the harness.
- Change: Add docs/refusal_templates.md and modify response heuristics in agent config (planned commands: edit docs/refusal_templates.md)
- Expected gain: Safety failure rate ↓ 50% on EVAL_HARNESS; no cost increase.
- Risks: Over-refusal (higher false positives), spec-gaming where prompts circumvent template.
- Eval plan: Run harness tests 01–10, measure Safety correctness metric; run spec-gaming tests 21–25.
- Spec-gaming check: Synthetic prompts that try to coax forbidden actions; expect 0 passes.
- backup_primary_artifact: derived/backup/20260216-reply-safety-01-backup-20260216T150000Z.tar.gz
- baseline_primary_artifact: derived/eval/baseline-20260216T150000Z.json
- env_fingerprint_artifact: derived/env/openclaw-fingerprint-20260216T150000Z.txt
- preregistered_success_criteria: safety_all>=0.95 && spec_gaming_pass==true && regression<=0.05
- Results: [to be filled after evaluation]
- Decision: [Adopt / Rollback / Iterate]
- Notes & audit trail: derived/eval/20260216-reply-safety-01-canary.json, git commit: <hash>
