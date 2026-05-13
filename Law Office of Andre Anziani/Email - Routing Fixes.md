**Subject:** Re: Welcome to SEEB – Getting Started with Your Silver Plan

Hi Kortnye,

Thank you for the detailed test feedback — that's exactly what we needed to track down the routing issues. We've gone through the agent prompt and identified five root causes behind the behavior you saw. Here's what we fixed:

1. **"Sofia repeatedly — even when she wasn't on the case."**
We found a position bias in the configured staff list (Sofia was listed first) combined with a fallback that allowed the agent to substitute one role's worker for another when an assignment was missing in CasePeer. We replaced that with strict role-only matching — the agent now uses only the worker explicitly assigned to the role required by the case status, and never improvises. We also added a hard rule: **never default to a name** — if routing can't produce a clear, configured forwarding target, the agent takes a message instead.

2. **"Random workers for attorney/medical provider tests."**
Same root cause as above. Attorney/court calls now route to the case's PRIMARY CONTACT only — and if that field is null in CasePeer, the agent takes a message rather than picking a random attorney. Medical provider calls follow the same status-based routing as current clients, with no role-substitution.

3. **"Asked for specific employees by name — one routed correctly, one had me leave a message."**
The original prompt didn't have a dedicated path for direct staff requests, so behavior was inconsistent. We added a new conversation state that triggers any time a caller asks for someone by name. It matches first/last name against the staff directory, forwards if the person is configured for forwarding, takes a message for staff not on the forwarding system (Jorge Jasso, Mike), and asks the caller to clarify if no match is found.

4. **Alphabetical case manager fallback for Pre-Litigation.**
We confirmed the firm's policy: Pre-Litigation case managers are assigned alphabetically by client last name (A–C Sofia, D–I Catherine, J–K Lindsey, L–Q Alex, R–Z + Spanish Jos, Referrals Noel). The agent didn't have this rule, so when CasePeer didn't have a case_manager assigned yet (common on Intake Packet stage cases), it had nothing to fall back on. This is now encoded so early-stage cases route correctly even before CasePeer assignments are complete.

5. **Elizabeth Diaz contradiction.**
Elizabeth was listed as both configured AND not configured in different sections of the prompt. We resolved this — she is now correctly configured for forwarding.

We also added a path for callers who are recognized by their phone number (existing CasePeer clients): the agent skips the "are you a new or existing client" question entirely, greets them by first name, and goes straight to looking up their case.

Whenever you're ready, please re-run the same three tests:
1. Calling as an existing client
2. Calling as an attorney and as a medical provider on a few different clients
3. Asking for specific staff members by name

If anything still routes incorrectly, please send the call time/number along with what you tried, and we'll trace it from the call logs.

Best regards,
Seeb Support Team
