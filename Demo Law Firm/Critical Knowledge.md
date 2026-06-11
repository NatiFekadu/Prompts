# Critical Knowledge — Demo Law Firm

This is a demo agent. The following firm-specific details must be filled in before a live
deployment; the prompt is built to work generically until then.

## Firm Info
- Firm name: (TBD)
- Address: (TBD)
- Phone / email: (TBD)
- Hours of operation: (TBD)

## Attorneys & Staff
- Attorney names and roles: (TBD)

## Practice Areas
- Practice areas / services offered: (TBD)
- Practice areas NOT handled: (TBD)

## Consultation
- Consultation fee (if any): (TBD)
- Phone vs. in-person availability: (TBD)

## Transfer
- WarmTransferInitiate destination (which team member/number) is configured in the platform,
  not in the prompt. Wire the transfer target in platform config.

## Hard Rules
- The agent must collect the caller's full name AND their reason for calling before any
  WarmTransferInitiate call. This gate is enforced in Prompt.md.
- No legal advice. No exposing AI nature or tool names.
