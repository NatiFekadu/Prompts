# Gursoy Law Firm PA (Miami) — Platform Configuration Notes

## Dashboard
- Login: https://dashboard.seeb.ai/login
- Account email: jbentglf@gmail.com (Jasper)
- Client ID: 24F6VKFZU2
- Plan: Essential
- Agent slots: 4
- Time zone: Eastern Time (Miami)

## Agent slots

| # | Agent | Channel | Purpose |
|---|---|---|---|
| 1 | Receptionist | Voice | Fallback for after-hours and when Zara doesn't answer Agent 3 |
| 2 | Website Chatbot | Chat (tuabogadomiami.com) | Lead capture, FAQs, calendar booking handoff |
| 3 | Zara Personal Line | Voice | First-touch routing — transfers to Zara; falls back to Agent 1 |
| 4 | Intake Specialist | Voice (triggered by Agent 1 or 2) | Full immigration intake questionnaire |

## Forwarding Targets

| Name | Mobile / text | Email | Notes |
|---|---|---|---|
| Zara | +1 (929) 888-3459 | zara@gursoylaw.com | Primary forward for all calls |
| Mike Gursoy | TBD | gursoy@gursoylaw.com | Escalation only — urgent court/judge/DHS when Zara unreachable |

Configure these in the Seeb dashboard with each first name + their text/mobile number. Sophia only passes the first name to ForwardCallTool — the platform owns the destination number.

## EventNotifier Destination
- Primary: **+1 (929) 888-3459** (Zara)
- Additional alert recipients (per intake form):
  - +1 (718) 483-2711 — owner TBD
  - +1 (347) 742-5320 — owner TBD

If the platform supports multi-destination broadcast, configure all three. Otherwise default to Zara's number.

## Office / Active Hours
- Mon–Fri: 9:00 AM – 5:00 PM Eastern Time
- Sat / Sun: closed
- Holidays closed (only these three): New Year's Day (Jan 1), Independence Day (July 4), Christmas Day (Dec 25)

Configure platform active-hours to match. Outside active hours, the platform returns `AGENT_NOT_IN_ACTIVE_HOURS` and Sophia falls back to message-taking + EventNotifier (only for the four approved categories — see Critical Knowledge `NOTIFICATION_POLICY`).

## Languages
Sophia handles English, Spanish, and Haitian Creole on the voice side. All three are supported on the chatbot as well.

## Greeting
The platform-level greeting (see `Greeting.md`) plays before Sophia. The prompt's first state is "Triage" and must NOT repeat the greeting.

## Integrations (pending activation)
- **MyCase** — Integrations tab. Required for current-client phone-number routing and automated case-creation from intakes.

## Email summary recipients (configured by Seeb at setup)
- zara@gursoylaw.com

## Intake-completion recipients (Agent 4)
- zara@gursoylaw.com
- valida@gursoylaw.com
- gursoy@gursoylaw.com
- billy@gursoylaw.com (TBD)

## Conflict check (Agent 4)
Defendant name must be checked against the client list before intake is finalized. Requires MyCase integration or manual list maintenance.
