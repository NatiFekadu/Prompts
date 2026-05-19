# J. Haskins Law — Chatbot Greeting

## Platform Welcome Message (configured outside the prompt)

This is the first message the visitor sees when the chat widget opens, sent by the chat platform before Aya takes over the conversation.

---

**Primary version (recommended):**

> Hi, I'm Aya — J. Haskins Law's chat assistant. We're a boutique firm focused on defamation, privacy, and reputation law across Florida, Georgia, South Carolina, and North Carolina.
>
> How can I help today — are you reaching out about a new matter, an existing case, or just looking for information?

---

**Shorter alternate (if the platform limits character count):**

> Hi, I'm Aya — J. Haskins Law's chat assistant. Are you reaching out about a new matter, an existing case, or just looking for information?

---

**Warmer alternate (if the firm wants a softer opener):**

> Hi there — I'm Aya, the chat assistant for J. Haskins Law. We help people protect their reputation and privacy through defamation and related areas of law.
>
> What brings you in today?

---

## Notes for deployment

- The greeting lives in the **chat platform's welcome-message field**, NOT inside the prompt. The prompt's `Triage` state assumes the visitor has already been greeted by the platform and opens with the triage question only.
- If the platform does NOT support a separate welcome message, copy the primary version into the `Triage` state's `OPENING_SCRIPT` in [Chatbot.md](Chatbot.md) so Aya delivers it as her first turn.
- Keep the greeting under three sentences — long welcome messages get dismissed.
- Do not include scheduling links, pricing, or attorney names in the greeting. Those belong in the conversation flow once intent is established.
