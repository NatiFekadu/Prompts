To: Kortnye Knight, Taryn Cadena
From: support@seeb.ai
Subject: Re: Test call follow-up — case status, routing accuracy, and the new client flow

Hi Kortnye and Taryn,

Thank you for the detailed write-ups. We have made the following changes to the agent based on your feedback:

- No case information will be spoken to the caller. The case-status lookup is now strictly internal, and the bridge line is delivered exactly as written, with no preamble or stage references. The "currently in mediation" disclosure on Test 3 cannot recur.
- Routing accuracy by case status. Each status now maps to exactly one CasePeer field — Litigation Initiated and Deposition Initiated both route only to case_assistant, never to case_manager or primary_contact. If the mapped field is empty, the call goes to the team queue rather than substituting a different role.
- New client flow from unknown numbers. When the caller's opening indicates a new client (accident, "I need a lawyer," etc.), the agent now routes through a dedicated intake chain: Lucas, then Noel, then the team queue, then the call center at 972-895-7552. If the opening is ambiguous, the agent asks once, "Are you calling because you are a potential new client, a current client, or for something else?"

Before retesting, please verify in CasePeer that the case_assistant field is populated with Stefany Fuentes on the Catherine Test Test case and with E. Duarte on the Danielle Test Test case, so the next test exercises the forwarding path rather than the fallback.

Once those assignments are confirmed, please feel free to re-run the same tests, plus one or two unknown-number new-client tests. If anything still misroutes, send us the call time and number and we will trace it from the logs.

Best regards,
Seeb Support Team
