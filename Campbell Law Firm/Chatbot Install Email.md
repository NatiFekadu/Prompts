**Subject:** Re: Chatbot Install — Step-by-Step Guide for Your Web Team

---

Hi,

Thanks for the quick reply, and good morning to you as well.

Totally understood on the IT side — we'll keep the install instructions plain so whoever maintains the website can drop it in without any chatbot-specific knowledge. Below is a clean, copy-pasteable guide your web person can follow.

## What the Script Does

The script tag is a single line of code. When loaded on a webpage, it adds a small chat bubble in the bottom-right corner of the site. Visitors click it, and the chatbot opens. Nothing else changes about the site's design or layout.

## The Script

Here is the exact code to install:

```html
<script theme='{"primary":"#2563EB","background":"#FFFFFF"}' src="https://chatbot.seeb.ai/embed.js"
    access-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjBkYWMwYjBkZTNmODU0YmZiM2Y4ZiIsInJvbGUiOiJQVUJMSUMiLCJlbWFpbCI6Imphc29uQGNhbXBiZWxsbGF3bXMubmV0IiwiZnVsbE5hbWUiOiJDYW1wYmVsbCBMYXcgRmlybSIsImlhdCI6MTc3NzQ3OTQzMCwiZXhwIjoyMDkzMDU1NDMwfQ.8DPPFAK2Bp3XtlRGMqzlO3fRVhgk0ArvwV62FJY6mD0" chat-id="bcc6c0dc-d7c8-42f7-95a3-c85e05eee258"></script>
```

It only needs to be added once — it does not need to be repeated on every page.

## How to Install (for Your Web Team)

The exact steps depend on the platform campbelllawms.com is built on. The most common cases:

**If the website is WordPress:**
1. Log into the WordPress admin dashboard.
2. The easiest path is to install a free plugin called **"Insert Headers and Footers"** (by WPBeginner) or **"Header Footer Code Manager"**.
3. After installing and activating, go to **Settings → Insert Headers and Footers**.
4. Paste the script above into the **"Scripts in Footer"** box.
5. Click **Save**.
6. Refresh campbelllawms.com — the chat bubble should appear in the bottom-right corner.

**If the website is Squarespace:**
1. Log in and go to **Settings → Advanced → Code Injection**.
2. Paste the script into the **Footer** box.
3. Save.

**If the website is Wix:**
1. Go to **Settings → Custom Code** in the Wix dashboard.
2. Click **+ Add Custom Code**.
3. Paste the script, set "Add Code to Pages" to **All pages**, and set "Place Code in" to **Body - end**.
4. Apply.

**If the website is custom-built (raw HTML or a custom CMS):**
Paste the script just before the closing `</body>` tag in the site's main template. If your developer maintains the codebase, forward them this email — that line will tell them everything they need to know.

## Once It's Live

After install, please reply to this email and we'll do a live test from our end to confirm:
- The chat widget loads correctly on every page.
- The chatbot greeting appears as expected.
- Test conversations are being captured and summaries are reaching jason@campbelllawms.net and angie@campbelllawms.net.

If anything looks off, we'll work directly with whoever installed the script to sort it out.

## Regarding the Jason Campbell Videos

Thanks for letting us know about the recorded videos for PI, DUI, and other categories — those will be very helpful for the website experience. The simplest way to send them over is one of the following:

1. **Google Drive / Dropbox / OneDrive folder** — share a link with view access to support@seeb.ai.
2. **WeTransfer** — upload the files at wetransfer.com and send the link to support@seeb.ai. No account needed and free up to 2 GB.

Once we have the videos, we'll let you know how we can incorporate them — whether that's embedding them into the chatbot flow (so a relevant Jason video plays when a visitor mentions PI, DUI, etc.) or hosting them as a resource library on the site. Happy to walk through options once we've seen what's there.

---

Let us know if anything above is unclear, and we're glad to jump on a quick call if it's easier to walk your web team through the install live.

Best regards,
Seeb Support Team
