# Gursoy Law Firm — Platform Configuration Notes

## Dashboard

- Login: https://dashboard.seeb.ai/login
- Account email: jasper@gursoylaw.com
- Test number for the agent: **+1 (786) 886-1077**
- EventNotifier destination: +1 (978) 494-7357
- MyCase integration: not yet connected (activate from "Integrations" tab)


Forwarding targets must be wired in the voice platform with each staff member's configured first name + their text/mobile number below. The Brooklyn office extensions route through a PBX, so the platform should dial the staff member's mobile number for live transfers, or use the extension if the platform is bridged to the PBX. Sophia only passes the FIRST NAME to ForwardCallTool — the platform owns the destination number.

## Forwarding Targets

| Name   | Mobile / Text Number   | Office Extension |
|--------|------------------------|------------------|
| Zara   | +1 (929) 888-3459      | 18               |
| Karina | +1 (347) 525-3489      | 43               |
| Valida | +1 (347) 909-1323      | 15               |
| Diana  | (929) 302-9018         | 21               |

## EventNotifier Destination

All EventNotifier alerts go to: **+1 (978) 494-7357**

## Forwarding Cascade Order

1. Zara
2. Karina
3. Valida
4. Diana

Mike Gursoy is escalation-only and should NOT be configured as a forwarding target.

## Office / Active Hours

- Monday – Friday: 9:00 AM – 6:00 PM Eastern Time
- Saturday: 9:00 AM – 12:00 PM Eastern Time
- Sunday: Closed
- Holidays closed (only these three): New Year's Day (Jan 1), Independence Day (July 4), Christmas Day (Dec 25)

Configure platform active-hours to match. Outside active hours, the platform will return `AGENT_NOT_IN_ACTIVE_HOURS` and Sophia falls back to message-taking + EventNotifier (only for the four approved categories — see Critical Knowledge `NOTIFICATION_POLICY`). Per Jasper, after hours Sophia does NOT keep trying to reach a person; NEW clients are offered a texted self-serve consultation link, all other caller types take a message.

## SMS (sendSms)

- **SMS sending must be enabled** for this agent so `sendSms` can text the self-serve booking link to new clients on the after-hours / transfer-failure path.
- Booking links texted (same links as the website chatbot):
  - In-person (Brooklyn office): https://calendar.app.google/FxuSyxjYb5UhBiABA
  - Google Meet (video): https://calendar.app.google/WovXHk98WU9UQE1W6

## Languages

Sophia handles English, Spanish, Russian, Turkish, and Uzbek on the voice side. Confirmed staff language coverage:

- **Spanish** — Karina (primary), Diana (backup)
- **Russian, Turkish** — Valida
- **Other** — Zara handles intake and reroutes or schedules a callback from the correct language-speaking staff member

## Greeting

The platform-level greeting (see `Greeting.md`) plays before Sophia. The prompt's first state is "Triage" — it must NOT repeat the greeting.
