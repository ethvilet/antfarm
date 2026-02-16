Purpose
This file documents first-run steps and non-sensitive guardrails for the workspace.

Core Files (canonical definition)
--------------------------------
Core Files are the small set of canonical operator guidance documents for this workspace.

Core Files include (relative to workspace root):
- ./*.md
- ./docs/**

Non-Core content (examples) includes project trees and derived outputs such as:
- ./kalshi/ ./antfarm/ ./.agents/ ./derived/

Changes to the Core Files definition MUST follow CHANGE_CONTROL
(see docs/self_improvement/CHANGE_CONTROL.md) and require GO <LEDGER_ID>.

First-run checklist (human + agent)
1. Read SOUL.md, USER.md, AGENTS.md.
2. Confirm Elevated: Ask mode is active — assistant will not run shell commands, modify configs, write files, or change cron without explicit GO.
3. Review docs/self_improvement/CHANGE_CONTROL.md and LEDGER before approving changes.
4. Ensure no secrets are stored in repo files (use secure vaults for keys).

Guardrails (must be followed)
- No automatic external actions (emails, pushes, restarts) without a GO that quotes a LEDGER ID.
- Sensitive data must never be written to MEMORY.md or other workspace docs.
- All changes must be reversible and documented in LEDGER.md.

How to approve changes
- Approve by replying with: GO <LEDGER_ID> (e.g., "GO 20260216-reply-safety-01")

Review cadence
- Review BOOTSTRAP.md quarterly or whenever onboarding procedures change.
