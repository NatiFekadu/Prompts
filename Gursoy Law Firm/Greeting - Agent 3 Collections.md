# Agent 3 — Payment Callback Agent (Brooklyn) — Greeting

This greeting is configured in the platform's dedicated greeting field — NOT inside the prompt. The prompt's first state ("GREETING") begins with the language question only, so the agent does not say the greeting twice.

---

Platform greeting (English):

Thank you so much for calling Gursoy Law Firm... it's lovely to hear from you. I'd be glad to help you take care of your payment or get your question to the right person... I just need a little information to get you connected.

---

Platform greeting (Spanish):

Muchas gracias por llamar a Gursoy Law Firm... es un placer saludarle. Con mucho gusto le ayudo a realizar su pago o a hacer llegar su pregunta a la persona indicada... solo necesito un poco de información para conectarle.

---

First in-prompt line after the platform greeting (GREETING state):

Do you prefer English... or Spanish...?
