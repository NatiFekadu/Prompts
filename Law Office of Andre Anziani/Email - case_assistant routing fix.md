To: Kortnye Knight, Taryn Cadena
From: support@seeb.ai
Subject: Routing fix — Litigation cases now strictly route to Case Assistant

Dear Kortnye,

Thank you for the detailed write-up on both test calls. That level of specificity allowed us to diagnose the issue quickly.

Your findings are correct on both counts. Please find below a summary of what we identified and the changes we have implemented.

The routing rule in the agent's configuration was already correct. Every Litigation status, including Pending Litigation through Trial Prep and Litigation Discovery, is mapped to the Case Assistant role. However, on both of your test calls, the agent was treating the Primary Contact field as an acceptable substitute whenever the Case Assistant role was unavailable, not populated, or when its forward attempt failed. That substitution was not permitted by the rules, and the same pattern was present in both tests.

We have since hardened the agent's routing logic so that this cannot occur again. The changes we made are as follows:

- Added an explicit routing decision table at the exact point the agent makes the routing choice, specifying the precise CasePeer relationship field to read for each status group.
- Added clear examples for the Litigation Discovery scenario you tested, including the case in which the forward fails. In every such case, the only correct behavior is for the agent to take a message, never to substitute Primary Contact.
- Reinforced the no-fallback rule for Litigation and Settlement statuses, so that Case Assistant is the sole routing target with no exceptions.

To confirm your action list, routing is now locked to Case Assistant for the following statuses:

- Pending Litigation
- Litigation Initiated
- Service
- Pending Response
- Litigation Discovery
- Mediation Initiated
- Mediation
- Deposition Initiated
- Deposition
- Trial Prep

Pursuing UIM, UIM Demanded, and the Settlement statuses also route to Case Assistant under the existing configuration.

Before retesting, we would ask you to verify in CasePeer that the Case Assistant field is populated on the test case you used. Under the new rules, if Case Assistant is empty, the agent will correctly take a message rather than forward to another team member. We want to ensure the next test exercises the forwarding path rather than the message path.

Once that has been confirmed, please feel free to retest from the same number, and we will review the resulting call.

Best regards,
Seeb Support Team
