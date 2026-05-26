# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

Prompt management repository for AI voice agent and chatbot prompts, organized per client. Clients are primarily law firms, dental practices, insurance agencies, and other service businesses. The repo is managed as an Obsidian vault with git integration (`obsidian-git` plugin).

## New Agent Creation Workflow

When the user says "create new agent" and provides client email + website content:

1. **Create folder** — `mkdir` a new folder named after the client/business under the repo root
2. **Create `Prompt.md`** — write the full XML agent prompt inside the new folder
3. **Build automatically** — don't ask clarifying questions; extract everything from the provided email + website, build the agent, and flag gaps at the end
4. **Reference format** — use existing agents (e.g., `Jerry Tidwell/Prompt.md`) as structural reference for the XML `<AGENT_CONFIGURATION>` format
5. **Include** — identity, voice/audio guide, critical rules, knowledge base (from website), tool definitions (from email), conversation flow (from email caller handling), FAQ responses (from website FAQ), and `PREVIOUS_CONVERSATION_SUMMARY` placeholder

## Structure

- **One folder per client/organization** — folder names are client names (e.g., `Anthony/`, `Oklahoma Health Options/`, `siebert/`)
- Each folder contains `.md` prompt files, often with versioned iterations
- No code files — purely Markdown-based prompt authoring
- `Hume Guide/` is documentation for Hume AI's EVI platform, not a client prompt
- `Obsedian/` is a meta/scratch folder, not a client

## Version Naming Convention

- `Prompt.md` → active/current version
- `Prompt gold.md` / `Prompt old but gold.md` → best-performing historical version
- `Prompt old.md` / numbered variants (`Prompt 2.md`, `core 3.md`) → archived iterations
- `Critical Knowledge.md` / `Core.md` → supplementary system context loaded alongside the prompt
- `Greeting.md` → initial greeting text (separate from main prompt)

When editing, clarify with the user which version to modify before making changes.

## Prompt Architecture

Prompts follow a consistent structure across clients:

1. **Persona** — Named character with personality, tone, and language abilities (e.g., Elena for Robles Family Law, Sally for Pointer & Buelna). Female personas are most common.
2. **Language handling** — Spanish is the near-universal secondary language. Some agents support 5-7+ languages (Farsi, Armenian, Portuguese, Vietnamese, etc.). Agents auto-detect and switch language.
3. **Call type routing** — Triage logic for different scenarios: new caller, returning client, existing client, vendor, court, emergency.
4. **Intake workflow** — Structured flow: greeting → triage → mandatory contact collection (name, phone, email) → qualification → scheduling or message-taking → confirmation & closing.
5. **Tool invocations** — Backend integrations referenced by exact tool name (see below).
6. **Compliance rules** — No-legal-advice disclaimers (law), no-medical-advice (dental/medical), privacy notices, jurisdiction restrictions.
7. **Voice optimization** — Ellipses for pauses, digit-by-digit phone numbers, "ay em"/"pee em" for times, filler words for naturalness.
8. **Ultravox pronunciation rules (mandatory)** — Every prompt's `<AUDIO_GUIDE>` MUST include explicit pronunciation rules for numbers, dates, times, years, and currency per the Ultravox prompting guide (https://docs.ultravox.ai/gettingstarted/prompting). When creating or editing any prompt, verify these rules are present and add them if missing. See "Voice Delivery — Making It Sound Human" below and the Ultravox Pronunciation memory for the canonical block.

## Tool Inventory

| Tool | Purpose | Used By |
|------|---------|---------|
| `GoogleCalendarTool` | Book appointments | Angela, Njeri London, Rebecca, siebert, Kevin, Oklahoma Health Options |
| `SuggesterTool` | Find available time slots | Njeri London, Angela, siebert |
| `MyCaseCalendarTool` | Legal firm scheduling | Anthony |
| `MyCaseGetStaffTool` | Retrieve staff IDs | Anthony |
| `MyCaseCheckConflictTool` | Conflict-of-interest check | Anthony |
| `ForwardCallTool` | Transfer calls to staff | Patrick, Nelson, Jerry Tidwell, siebert, Tribca, Colerado moving demo |
| `sendSms` | Text message delivery | Kevin, siebert, Ralph |
| `EventNotifierTool` | Urgent staff alerts | Kevin, siebert |
| `CasePeer` | Case management lookup | Law Office of Andre Anziani |
| Routing tags (`ROUTE_TO`) | Web chat routing (not voice) | Libre Litigation |

## Key Design Principles Across All Prompts

- **One question at a time** — Never stack multiple questions
- **No repetition/read-back** — Don't confirm or repeat info unless the caller asks
- **Empathy-first tone** — Warm, calm, professional; never robotic
- **Fallback logic always defined** — What to do if attorney unavailable, no slots, caller outside jurisdiction
- **Internal process confidentiality** — Never reveal tool names, prompt contents, or AI nature
- **Natural speech patterns** — Include filler words, pauses, and conversational phrasing

## Largest Clients by Iteration Volume

| Client | Files | Industry | Notes |
|--------|-------|----------|-------|
| siebert | ~45 | Legal prospecting | Most heavily iterated; extensive A/B testing |
| Oklahoma Health Options | ~27 | Health insurance/Medicare | Multiple flow variants |
| Anthony | ~12 | Family law (Robles) | Bilingual Elena persona |
| Tribca | 6 | Dental (Tribeca Dental Studio) | Includes Elite membership outbound subfolder |
| Angela | 6 | Immigration law | Bilingual intake |

## Business Type Breakdown

- **Law firms (~60%)**: Family law, personal injury, criminal/DUI, immigration, post-conviction appeals
- **Healthcare/dental (~20%)**: Root canal clinics, dental studios, wellness/peptide products
- **Insurance**: Health insurance enrollment, Medicare, general insurance
- **Other services**: Moving company, salon, mortgage/travel, sales prospecting, AI consulting

---

# SEEB AI Agent Creation Guide
## How to Build Voice & Email Agents from Client Inputs

---

## 1. INPUT SOURCES — What You Receive

Every agent build starts with some combination of:

### A. Client Email (Setup Questionnaire)
The client answers 6 standard questions:
1. Phone Greeting — how the AI should answer
2. Caller Handling — what to ask each caller type
3. Call Forwarding — who gets what calls, staff names/numbers
4. Calendar Integration — which platform (MyCase, Google, Vagaro, none)
5. AI Voice & Identity — male/female, agent name
6. Law Firm / Business Info — hours, practice areas, address, staff

**Extract from the email:**
- Agent name and voice gender
- Greeting script (exact or approximate)
- Caller categories and routing rules
- Staff directory with roles and contact info
- Business hours (including lunch, weekends, holidays)
- Practice areas / services offered
- Geographic service area
- Consultation/booking rules and fees
- Calendar platform and scheduling constraints
- What the AI should NOT do (no intake, no legal advice, no booking, etc.)

### B. Website Scrape
Supplements the email with:
- Full service/practice area descriptions
- Pricing and fee structures
- Office addresses and location details
- Attorney bios and specialties
- FAQs and policies
- Testimonials (useful for tone matching)
- Contact info verification

**Use website to:**
- Fill gaps the client didn't answer
- Verify facts (addresses, phone numbers, hours)
- Build the Knowledge Base section
- Extract FAQ responses

### C. Tool Definitions
The platform provides tools the agent can use:
- `ForwardCallTool` — transfer calls
- `EventNotifierTool` — send internal notifications
- `sendSms` — text the caller
- `hangUp` — end the call
- `SaveCallerName` — save caller to phonebook
- `UnansweredQuestionTool` — log questions AI can't answer
- Calendar tools (varies by client): `MyCaseCalendarTool`, `MyCaseCheckConflictTool`, `MyCaseGetStaffTool`, `GoogleCalendarTool`, `SuggesterTool`, `BookingReminderTool`
- CRM tools: `CasepeerGetCasesTool`, etc.

### D. Critical Knowledge
Separate document with firm-specific rules that override general behavior (evaluator hours, scheduling constraints, terminology rules, etc.)

### E. Test Call Transcripts
After initial deployment, clients test and report issues. Use transcripts to identify bugs and improve the prompt iteratively.

---

## 2. AGENT STRUCTURE — The Template

Every voice agent follows this structure:

```
SYSTEM_CONFIGURATION
├── Identity (name, role, persona, voice)
├── Language Handling (default + switch triggers)
├── Voice Delivery Rules (pacing, pauses, one-question-at-a-time)
├── Pronunciation Guide (names, times, numbers, addresses)
└── Core Constraints (no legal advice, no internal leaks, etc.)

CONVERSATION_FLOW
├── §1. Greeting / Post-Greeting Triage (see note below)
├── §2-7. Primary caller flows (varies by business)
├── Call Transfer Rules
├── Fallback / Message-Taking
└── End Call

TOOL_RULES
├── ForwardCallTool usage
├── Calendar tool usage (if applicable)
├── EventNotifierTool usage
└── Tool discipline (no duplicate calls, error handling)

KNOWLEDGE_BASE
├── Business info (address, phone, email)
├── Hours of operation
├── Services / Practice areas
├── Staff directory
├── Policies (cancellation, payment, etc.)
├── FAQ responses
└── Promotions (if applicable)

FINAL_INSTRUCTIONS
└── Previous conversation summary template
```

### Important: Platform Greeting is Separate
The voice platform has a **dedicated greeting field** configured outside the prompt. The prompt's GREETING state should NOT contain the greeting text — it should start with the first conversational action (caller triage question). If the prompt repeats the greeting, the agent will either say it twice or pause awkwardly after the platform greeting plays, confusing callers.

- **In the prompt:** GREETING state `<SCRIPT>` = triage question only (e.g., "Are you a new client... a current client... or something else?")
- **In platform config:** greeting text (e.g., "Thank you for calling [Firm Name]... I just need a little information to help get you connected.")
- **In the prompt:** add a `<NOTE>` in the GREETING state reminding that the greeting is configured separately

---

## 3. CALLER CATEGORIES — Identify First, Then Route

Every business has different caller types. Common patterns:

### Law Firms
| Category | Trigger Phrases | Action |
|----------|----------------|--------|
| New/Potential Client | "need a lawyer", "consultation", "just served" | Intake or transfer to intake team |
| Existing Client | "calling about my case", "case update" | Look up case, route to assigned staff |
| Returning Client | "ready to hire", "sign contract", "pay retainer" | Celebratory tone, onboarding |
| Court/Attorney | "judge's office", "opposing counsel" | Transfer immediately |
| Vendor/Sales | sales pitch, marketing | Take message, do NOT transfer |
| Other | everything else | Take message |

### Service Businesses (Nail Salons, etc.)
| Category | Trigger Phrases | Action |
|----------|----------------|--------|
| Booking | "appointment", "availability", "schedule" | Check calendar or direct to booking |
| Pricing | "how much", "cost", "price" | Answer from menu |
| Service Question | "do you do X?" | Answer yes/no with price |
| Location/Hours | "where", "when open" | Provide details |
| Custom Quote | "how much for this design?" | Escalate to owner |

---

## 4. TOOL USAGE — Best Practices

### Tool Definitions Are Read By the LLM
The model sees every tool's name, description, and parameter docs and uses them to decide WHEN and HOW to call the tool. Vague definitions cause wrong-tool calls and bad parameter values.
- `<DESCRIPTION>` must say WHEN to use the tool (the trigger condition), not just what it does.
- Each parameter must document its exact format with an example value.
- For tools the model gets wrong (especially `ForwardCallTool`), include ✓/✗ contrastive examples in the prompt.

### ForwardCallTool
```
ALWAYS pass a real staff name: ForwardCallTool(name='Mary')
NEVER pass caller's words: ForwardCallTool(name='a real person') ✗
NEVER pass role titles: ForwardCallTool(name='Office Manager') ✗ (unless configured as a name)

Include ✓/✗ examples in the prompt — LLMs learn from contrastive examples.

Handle ALL failure responses:
- NOT_FOUND → wrong name, fall back to message
- NOT_ENABLED → unavailable, take message
- AGENT_NOT_IN_ACTIVE_HOURS → after hours, take message
- NOT_CONFIGURED → system issue, take message
- INCORRECT_MEDIUM → wrong channel, take message
```

**Office hours are platform-controlled, not prompt-controlled.** Do NOT write `DURING OFFICE HOURS` / `OUTSIDE OFFICE HOURS` branches in the conversation flow. The platform has a separate config for when the agent can forward calls. Always attempt the transfer; let the `AGENT_NOT_IN_ACTIVE_HOURS` failure trigger the message-taking fallback via the `ON FAILURE:` chain. Fallback copy should be natural ("It looks like our team isn't available to take your call right now...") — never expose the failure code. Keep business hours in the KNOWLEDGE_BASE for FAQ answers only, not for routing logic.

### Calendar Tools (MyCase, Google, Vagaro)
```
ALWAYS check conflicts BEFORE booking.
ALWAYS get explicit confirmation from caller before booking.
ALWAYS use correct timezone offset in ISO 8601.
NEVER book in the past — check currentTime first.
NEVER offer times outside staff working hours, even if tool says "free."

For MyCase specifically:
- Check each specialist SEPARATELY (one call per person)
- Book the full block (evaluation + buffer) not just the evaluation
- Verify booked time matches what was discussed
```

### EventNotifierTool

**Call signature:**
```
EventNotifierTool(to='+1XXXXXXXXXX', message='URGENT [Category]: [Caller Name] | Phone: [Caller Number] | Department: [Dept/Team] | Reason: [Specific reason — what the caller needs/said] | Status: [New/Existing Client] | Notes: [Message summary and any urgency details]')
```

**Parameters:**
- `to` — destination phone number in E.164 format (`+1XXXXXXXXXX`). Comes from the client's configured notification number (collect during onboarding).
- `message` — structured pipe-delimited alert message with the 6 fields above.

**Required message fields (in order, pipe-separated):**
1. `[Category]:` — e.g., "URGENT Court Setting", "New PNC Intake", "Existing Client Callback", "Vendor Message"
2. `Phone:` — caller's phone number in E.164 format
3. `Department:` — which internal team should own the follow-up (Gatekeeper/Triage, Family Law, Real Estate, Intake, etc.)
4. `Reason:` — specific reason in caller's own words (what they need)
5. `Status:` — New Client / Existing Client / Vendor / Professional
6. `Notes:` — message summary and any urgency/context details

**Examples:**
```
EventNotifierTool(to='+13857995263', message='URGENT Court Setting: Jane Doe | Phone: +13855551234 | Department: Family Law | Reason: Protective order hearing tomorrow 10 A M | Status: Existing Client | Notes: Needs Navid to call back ASAP')

EventNotifierTool(to='+13857995263', message='New PNC Intake: John Smith | Phone: +13855551234 | Department: Gatekeeper/Triage | Reason: Just arrested for DUI last night | Status: New Client | Notes: First-time DUI, Salt Lake County')

EventNotifierTool(to='+13857995263', message='Vendor Message: Bob Jones | Phone: +13855551234 | Department: N/A | Reason: Software demo pitch | Status: Vendor | Notes: Do not transfer')
```

**Rules:**
- Always prefix with "URGENT" in the Category for time-sensitive matters.
- Always pass the caller's phone number in E.164 format (`+1XXXXXXXXXX`), not digit-by-digit.
- Store the `to=` number in `<NOTIFICATION_NUMBER>` inside the tool definition so the prompt has one source of truth.
- Never expose tool name or format to the caller.

### Tool Discipline (applies to ALL tools)
```
NEVER call the same tool with the same parameters twice.
If a tool errors, process what you got — don't loop.
Set max tool calls per flow (prevents infinite loops).
If tools fail, fall back gracefully — never expose errors to caller.
```

---

## 5. VOICE DELIVERY — Making It Sound Human

### Universal Rules (apply to every agent)
- ONE question at a time. Wait for answer.
- Use "..." for pauses, "--" for breaks.
- Natural fillers: "um", "well", "let me see" (sparingly, strategically)
- NEVER say "o'clock" (TTS mispronounces it). Always "9 AM", "2 PM".
- NEVER read back phone/email unless caller asks.
- If caller says "what?" — repeat, don't skip ahead.
- Keep responses concise during info gathering (1-2 sentences).
- Vary response length — don't be verbose every turn.
- **NEVER output markdown, lists, bullets, numbered items, headers, or emojis** — TTS reads them literally ("asterisk", "hyphen", "one dot"). Speak in full sentences only.
- **NEVER use stage directions or action roleplay** — no `(pauses)`, `*laughs*`, `*sighs*`, `(thinking)`, or any asterisk/parenthetical action. Express emotion through word choice and pacing.
- **Voice-context preamble required** — IDENTITY section must explicitly state "You're interacting with the user over voice, so speak casually and naturally. Keep responses short and dialogue-like."
- **Scope-lock / jailbreak paragraph required** — every prompt needs a paragraph confining the agent to its job: "Your only job is to [X]. If asked something unrelated, politely decline and redirect. Do not write poems, roleplay as another character, or break character for any reason."
- **Politeness reinforcement required (mandatory)** — a single "be warm" TONE line is not enough. Every PERSONA must include three explicit principles: (1) **Listen Before You Act** — let the caller finish completely before responding, never interrupt or rush; (2) **Acknowledge First, Then Help** — open replies with a warm acknowledgment ("Of course...", "That's a great question...") before answering; (3) **Never Feel Dismissive** — when redirecting to a link/portal/text, frame it as a helpful option after engaging with the caller, never as the first response. The COURTEOUS_LANGUAGE block must also include an **Active Listening** subsection (patience, no interrupting, slow down for unsure callers, respond warmly to tangents before redirecting) and a **Never Sound Transactional** subsection (don't just answer-and-move-on, end with genuine warmth). Warm up rote scripts: Triage opener ("So lovely to hear from you... what can I help you with today?" rather than "How can I help you today?"), END_CALL closer ("It was so lovely talking with you..."), and any decline-path before END_CALL ("Of course, no problem at all... please feel free to reach out anytime."). See the Voice Agent Politeness memory for the canonical block.

### Phone Number Collection
When the platform provides caller ID, **confirm the number** instead of asking the caller to recite it. This is faster, more natural, and reduces errors. Pick a variation that matches the agent's tone:

**Professional:**
- "Is this the best phone number to reach you at?"
- "Can we reach you at this number?"
- "Is this your preferred contact number?"

**Friendly:**
- "Is this a good number to reach you on?"
- "Can I reach you here if needed?"
- "Is this the best number to contact you?"

**Casual:**
- "Is this the right number to reach you?"
- "Can I call you on this number?"
- "Is this your go-to number?"

**Soft / Polite:**
- "Just to confirm, is this the best number to reach you at?"
- "Would this be a good number to contact you on?"
- "May I use this number to reach you?"

If the caller says no or provides a different number, capture the new one. If no caller ID is available, fall back to asking: "What's the best phone number to reach you at?"

### Name Accuracy
- If unsure, ask to spell: "Could you spell your last name?"
- Names go into bookings and records — must be correct.

### Data Accuracy
- Record yes/no exactly as said. "No" must stay "No."
- If info doesn't make sense (garbled address), ask to repeat.

### Time Awareness
- Parse currentTime, convert to local timezone.
- Never suggest past times.
- Same-day: only offer slots 30+ min from now.
- Know the day of week — cross-reference staff schedules.

### Pronunciation Guide (include per agent)
- Staff names with non-obvious pronunciation
- Firm name if unusual
- Local place names
- Phone numbers: digit by digit with pauses
- Addresses: expand abbreviations ("Rd" → "Road")
- Currency: verbalize naturally ("$65" → "sixty-five dollars")

### Ultravox Pronunciation Rules (MANDATORY in every `<AUDIO_GUIDE>`)
Source: https://docs.ultravox.ai/gettingstarted/prompting

Every voice prompt MUST embed an explicit pronunciation block covering numbers, dates, times, years, and currency so the Ultravox TTS reads them naturally. When creating or editing a prompt, verify this block is present; if not, add it.

```
Numbers / phone numbers / account numbers / codes:
- Output as individual digits separated by hyphens.
- Example: 1234 → "1-2-3-4"
- Example: phone "8015551234" → "8-0-1... 5-5-5... 1-2-3-4"

Decimals:
- Say "point" then each digit individually.
- Example: 3.14 → "three point one four"

Dates:
- Speak as components, never as slashes or digits.
- Example: 12/25/2022 → "December twenty-fifth, twenty twenty-two"
- Example: 03/05/2026 → "March fifth, twenty twenty-six"

Times:
- Drop ":00" for top-of-hour times.
- Example: "10:00 AM" → "10 AM"
- Example: "2:30 PM" → "two thirty PM"
- Never say "o'clock" (TTS mispronounces it).
- Say "AM" / "PM" as "ay em" / "pee em" if clarity needed.

Years:
- Read naturally as two pairs.
- Example: 2024 → "twenty twenty-four"
- Example: 1999 → "nineteen ninety-nine"

Currency:
- Verbalize naturally.
- Example: $65 → "sixty-five dollars"
- Example: $1,250 → "one thousand two hundred fifty dollars"

Addresses:
- Expand abbreviations ("Rd" → "Road", "Ave" → "Avenue", "St" → "Street").
```

---

## 6. PROMPT FORMAT — XML vs Markdown

### When to use XML (<AGENT_CONFIGURATION>)
- Complex routing logic with multiple states
- Agents with calendar tools and multi-step scheduling
- CRM integrations (CasePeer, MyCase)
- Agents that need strict state machine behavior

### When to use Markdown (### sections)
- Simpler agents (intake + transfer only)
- Agents without calendar integration
- Email/Yelp reply agents
- When the client's platform works better with markdown

### Format Rules
- Use consistent structure across all agents for maintainability
- Comments (<!-- -->) in XML to mark sections
- Never nest too deeply — keeps the model on-rails
- Put Knowledge Base at the end as reference, not inline

---

## 7. KNOWLEDGE BASE — Single Source of Truth

### Structure
```
Business Info (name, address, phone, email, landmarks)
Hours (regular, lunch, weekends, holidays, appointment-only days)
Staff Directory (name, role, routing, contact)
Services / Practice Areas (with pricing if applicable)
Policies (cancellation, payment, late arrival, guarantees)
Promotions (if applicable)
FAQ Responses (preformatted Q&A)
Escalation Rules (what the AI should NOT answer)
```

### Rules
- ALL data lives here — conversation flow references it, never hardcodes it.
- If a price or policy changes, update ONE place.
- Never duplicate data between flow and knowledge base.
- Include "we do NOT handle" alongside "we handle."

---

## 8. ITERATIVE IMPROVEMENT — Learning from Test Calls

### When a client sends a test call transcript:

1. **Read the full transcript** including tool calls and responses.
2. **Check each action against the prompt** — did the agent follow the rules?
3. **Categorize issues:**
   - ROUTING: forwarded to wrong person or at wrong time
   - SCHEDULING: wrong time, outside hours, booked over conflict
   - DATA: wrong name, flipped yes/no, incomplete info
   - TONE: too scripted, too robotic, repeated itself
   - TOOL: wrong parameters, infinite loop, wrong staff ID
   - LOGIC: skipped steps, wrong order, missed qualification

4. **Fix with surgical updates** — use `update` for small changes, `rewrite` for structural changes.
5. **Add explicit rules for each bug** — if the agent did X wrong, add a rule that says "NEVER do X."
6. **Include contrastive examples** — show WRONG vs RIGHT so the model can't misinterpret.
7. **Test the fix** — ask client to re-test the specific scenario.

### Common Bug Patterns & Fixes
| Bug | Root Cause | Fix |
|-----|-----------|-----|
| Agent offers past times | Not parsing currentTime | Add TIME AWARENESS rule with conversion logic |
| Agent books outside hours | Tool says "free" but staff isn't working | Add hard-boundary EVALUATOR HOURS with enforcement checklist |
| Agent loops on same tool call | Tool returns unexpected result | Add TOOL DISCIPLINE: never same params twice, max call limits |
| Agent passes caller words to ForwardCallTool | No parameter constraints | Add ✓/✗ examples, lock parameter to specific names |
| Agent skips qualification | Caller said "book me" | Add "EVEN IF caller is eager, qualify first" rule |
| Agent sounds scripted | Too many example phrases | Use beat sheets (emotional goals) not scripts |
| Agent repeats itself | No anti-repetition rule | Add "apologize ONCE, vary language" rule |
| Agent flips data (No→Yes) | No data accuracy rule | Add "record EXACTLY as caller said" rule |
| Agent misreads timestamps | ISO 8601 confusion | Add TIMESTAMP READING rule with worked examples |
| Agent suggests case types | Disrupts natural conversation | Add "DO NOT SUGGEST — let caller describe" rule |

---

## 9. EMAIL / YELP AGENTS — Different Structure

Email agents don't have conversation flow — they have:
```
CATEGORIZE → RESPOND based on category
```

### Categories for email agents:
- Positive review → thank warmly, invite back
- Negative review → empathize, redirect to phone, FLAG for owner
- Booking request → direct to booking method
- Price question → answer from menu
- Service question → answer or redirect
- Custom quote → escalate to owner
- Location/hours → provide info
- Cancel/reschedule → redirect to phone/text
- Spam/advertising → polite decline
- Unknown → flag for owner

### Email Agent Rules:
- Reply AS the business owner (sign with their name)
- Keep replies SHORT (2-4 sentences for reviews, 3-6 for inquiries)
- Vary every response — never send identical replies
- Reference something specific from the message
- Always offer to book after answering a question
- Never reveal AI nature

---

## 10. CLIENT COMMUNICATION — Handling Feedback

### When client is happy:
- Note what's working so you don't break it in future updates.

### When client is unhappy about tone/personality:
- They own the voice. Restore their beat sheets. Only add technical fixes underneath.
- Never override the client's persona decisions.

### When client reports a bug:
- Analyze the transcript data (tool calls, timestamps, parameters).
- Identify root cause before fixing — don't guess.
- Reply with: what happened, why, what you fixed, and what needs engineering (if applicable).

### When client sends new requirements:
- Map them to the existing structure.
- Add new states/rules, don't rebuild from scratch.
- Confirm understanding before implementing.

---

## 11. CHECKLIST — Before Delivering Any Agent

- [ ] Agent has a name and persona defined
- [ ] Greeting script matches client's request
- [ ] All caller categories from client email are covered
- [ ] Routing logic matches staff directory exactly
- [ ] ForwardCallTool uses ONLY configured names
- [ ] ForwardCallTool failure handling covers all response codes
- [ ] Calendar integration matches client's platform (or explicitly states no calendar)
- [ ] Timezone is correct
- [ ] Office hours are accurate (including lunch, weekends, holidays)
- [ ] Practice areas / services match website
- [ ] Pricing matches website (no contradictions)
- [ ] Policies are complete (cancellation, payment, etc.)
- [ ] Knowledge Base is the single source of truth (no duplicated data)
- [ ] No legal advice / no internal leaks rules are present
- [ ] Voice delivery rules are present (one question, no o'clock, pauses)
- [ ] Voice-context preamble present in IDENTITY ("you're interacting over voice")
- [ ] No-markdown / no-lists / no-emojis rule present
- [ ] No-stage-directions / no-asterisk-roleplay rule present
- [ ] Scope-lock / jailbreak paragraph present
- [ ] Ultravox pronunciation block present (numbers, dates, times, years, currency)
- [ ] PERSONA contains the three politeness principles: Listen Before You Act, Acknowledge First Then Help, Never Feel Dismissive
- [ ] COURTEOUS_LANGUAGE / audio-guide tone block contains an Active Listening subsection (no interrupting, slow down for unsure callers, respond warmly to tangents)
- [ ] COURTEOUS_LANGUAGE block contains a Never Sound Transactional subsection
- [ ] Triage opener is warm (not "How can I help you today?" — use "So lovely to hear from you..." or equivalent)
- [ ] END_CALL closer is warm and human ("It was so lovely talking with you..." rather than "Thank you for calling, have a wonderful day.")
- [ ] Any redirect script (link/text/portal handoff) is framed as a helpful option after engaging with the caller, never as the first response
- [ ] Every tool `<DESCRIPTION>` says WHEN to use it, not just what it does
- [ ] Name accuracy rule is present
- [ ] Time awareness rule is present (if calendar agent)
- [ ] Tool discipline rule is present
- [ ] FAQ responses cover common questions
- [ ] EventNotifierTool uses structured message format
- [ ] SMS templates are correct (if applicable)
- [ ] Prompt has PREVIOUS_CONVERSATION_SUMMARY placeholder
- [ ] Prompt is in the right format (XML or Markdown) for the platform
- [ ] No orphaned states (every state is reachable)
- [ ] No contradictions between sections
