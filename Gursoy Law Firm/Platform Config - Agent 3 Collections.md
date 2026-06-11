# Gursoy Law Firm — Agent 3 (Payment Callback) — Platform Configuration Notes

This agent is INBOUND payment callback. It does NOT transfer calls and does NOT negotiate, so the forwarding cascade and active-hours-for-forwarding logic from the main `Platform Config.md` do NOT apply here. Configure only the items below.

## Dashboard

- Login: https://dashboard.seeb.ai/login
- Account email: jasper@gursoylaw.com
- Test number for this agent: **[TO BE PROVISIONED]**

## Voice

- Female voice. Warm, professional, reassuring.

## Greeting

- The platform-level greeting (see `Greeting - Agent 3 Collections.md`) plays before Sophia.
- The prompt's first state is "GREETING" and asks only the language question — it must NOT repeat the greeting text.

## Payment Link (required — currently missing)

- The agent texts a payment link to callers via SMS (`sendSms`).
- **A payment link has not yet been provided.** Once received, wire it into both the prompt's `<PAYMENT_LINK>` and the `sendSms` templates. Until then the agent cannot complete a payment.

## SMS

- SMS sending must be enabled so `sendSms` can deliver the payment link to the caller.

## Caller ID

- Pass inbound caller ID to the agent so Sophia can confirm the number ("Is this the best number to reach you at...?") instead of asking the caller to recite it.

## EventNotifier Destination

- All EventNotifier alerts for this agent go to: **+1 (978) 494-7357** (same as the firm's main destination).
- Alerts fire on: payment link sent, caller reports already paid, and message taken for an office callback.

## Conversation Summaries

- Conversation summaries and recordings are delivered to the account; confirm the recipient email and add any additional recipients in the dashboard.

## Languages

- Enable English (default), Spanish, Russian, Turkish, Uzbek, and Haitian Creole on the voice side so Sophia can switch automatically.

## Not Applicable for This Agent

- No forwarding targets (Zara / Karina / Valida / Diana) — this agent never transfers.
- No forwarding cascade order.
- No active-hours-for-forwarding logic — there are no live transfers to gate.
- No calendar / MyCase scheduling.

## Open Items

- Provision a test number for this agent.
- Provide the payment link (Square or equivalent) to wire into the prompt and SMS templates.
- Confirm the public call-back number — 718-568-8310 (intake form) vs. 718-646-5783 (previously on file).
- Confirm how the office verifies an "already paid" claim (MyCase webhook, manual flag, etc.).
- Confirm whether the payment-link text should be provided in Spanish, Russian, Turkish, Uzbek, and Haitian Creole for callers with a known language preference.
