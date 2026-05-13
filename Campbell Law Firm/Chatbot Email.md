**Subject:** Campbell Law Firm Chatbot Is Ready — Plus a Few Updates on Alex

---

Hi Jason,

Quick update — we've built out the chatbot for Campbell Law Firm, and there are a few other items on the voice agent and SMS side we wanted to walk you through.

## 1. Chatbot Preview

You can take a look at the chatbot here:
https://campbell-chatbot.vercel.app/

Test it the same way a website visitor would — ask a few questions, walk through an intake, and let us know if anything feels off in the tone or flow.

## 2. Embedding the Chatbot on Your Website

Once you're happy with how it's behaving, you can drop the chatbot live on campbelllawms.com by adding the following script tag inside the `<head>` (or just before the closing `</body>`) of your website:

```html
<script theme='{"primary":"#2563EB","background":"#FFFFFF"}' src="https://chatbot.seeb.ai/embed.js"
    access-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjBkYWMwYjBkZTNmODU0YmZiM2Y4ZiIsInJvbGUiOiJQVUJMSUMiLCJlbWFpbCI6Imphc29uQGNhbXBiZWxsbGF3bXMubmV0IiwiZnVsbE5hbWUiOiJDYW1wYmVsbCBMYXcgRmlybSIsImlhdCI6MTc3NzQ3OTQzMCwiZXhwIjoyMDkzMDU1NDMwfQ.8DPPFAK2Bp3XtlRGMqzlO3fRVhgk0ArvwV62FJY6mD0" chat-id="bcc6c0dc-d7c8-42f7-95a3-c85e05eee258"></script>
```

If your web person handles the site, just forward them this snippet — it's a one-line install. The widget will appear in the corner of every page where the script loads.

## 3. What the Chatbot Does (and Doesn't Do)

A few important notes on scope so the chatbot and the voice agents stay in their lanes:

- **The chatbot does NOT book consultations and does NOT have calendar access.** Only the inbound and outbound voice agents (Alex) can book directly into your calendar.
- The chatbot's job is to greet visitors, collect their name, phone, email, and a brief description of their matter, and then promise a callback from your team within one business day.
- After every chat, conversation summaries will be sent automatically to:
  - angie@campbelllawms.net
  - jason@campbelllawms.net
- All chat transcripts are also viewable inside your Seeb dashboard under the "Conversations" tab.

## 4. Voice Agent (Alex) — Angie Added to Call Summaries

We've also added **angie@campbelllawms.net** to the call summary distribution for the inbound voice agent, so both you and Angie now receive a written summary of every call right after it ends.

## 5. SMS Automations Now Available

Inside the "Automations" tab of your dashboard, you can enable two client-facing SMS automations:

**Client Registration — Welcome SMS**
Automatically sends a personalized welcome text to clients when they're registered in MyCase.

**Court Date / Event — SMS Notification**
Sends a notification text to clients whenever a date or event is created under their case (hearings, deadlines, court appearances, etc.).

Both are turned off by default — flip them on whenever you'd like them active.

## 6. Invoice Reminder Agent (New)

We've also set up an **invoice reminder agent** that integrates with MyCase. It will:

- Reach out to clients with unpaid invoices automatically via SMS, voice call, or both — your choice.
- Reference the invoice number and amount directly from MyCase.
- Include the payment link so clients can pay in one tap.
- Stop reminding once the invoice is marked paid in MyCase.

This is a hands-off way to keep AR moving without Angie having to chase invoices manually. Let us know which channel you'd like to use (SMS only, calls only, or both) and we'll activate it.

---

Let us know how the chatbot feels once you've played with it, and whether you'd like us to push it live on the website. Happy to adjust the tone, flow, or anything else once you've had a chance to test.

Best regards,
Seeb Support Team
