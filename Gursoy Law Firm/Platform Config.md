# Gursoy Law Firm — Platform Configuration Notes

Forwarding targets must be wired in the voice platform with each staff member's configured first name + their text/mobile number below. The Brooklyn office extensions route through a PBX, so the platform should dial the staff member's mobile number for live transfers, or use the extension if the platform is bridged to the PBX. Sofia only passes the FIRST NAME to ForwardCallTool — the platform owns the destination number.

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

Configure platform active-hours to match. Outside active hours, the platform will return `AGENT_NOT_IN_ACTIVE_HOURS` and Sofia falls back to message-taking + EventNotifier.

## Languages

Sofia handles English, Spanish, Russian, Turkish, and Uzbek on the voice side. Confirm which forwarding targets can continue a transferred call in each language so routing can be prioritized if needed.

## Greeting

The platform-level greeting (see `Greeting.md`) plays before Sofia. The prompt's first state is "Triage" — it must NOT repeat the greeting.
