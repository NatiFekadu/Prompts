export const meta = {
  name: 'trim-prompt',
  description: 'Find safe, behavior-preserving trims in any Seeb voice/chat agent prompt. Returns vetted proposals; the main agent applies them.',
  whenToUse: 'Run when asked to trim, tighten, or shorten a client prompt without changing behavior. Pass the target file in args.file.',
  phases: [
    { title: 'Discover', detail: 'one agent splits the prompt into logical sections' },
    { title: 'Scan', detail: 'parallel scanners propose condensations per section' },
    { title: 'Verify', detail: 'adversarial reviewer confirms each cut drops no rule' },
  ],
}

// ---- Inputs (args) -------------------------------------------------------
// args.file          (required) absolute path to the prompt .md to trim
// args.aggressiveness (optional) 'light' (default) | 'medium'
// args.protect       (optional) free text: extra client-specific things to never touch
// -------------------------------------------------------------------------

// Coerce args into an object. Depending on how it's passed, `args` may arrive
// as the object itself, a JSON string, or a bare file-path string.
let A = args
if (typeof A === 'string') {
  const s = A.trim()
  if (s.startsWith('{')) { try { A = JSON.parse(s) } catch (e) { A = {} } }
  else { A = { file: s } }   // a bare path was passed
}
A = A || {}

if (!A.file) {
  throw new Error("trim-prompt requires a file. Pass args as { file: '/abs/path/to/Prompt.md' } (object), a JSON string, or just the absolute path string.")
}
const FILE = A.file
const AGGRESSIVENESS = A.aggressiveness || 'light'
const EXTRA_PROTECT = A.protect ? `\n\nCLIENT-SPECIFIC — NEVER touch these either:\n${A.protect}` : ''

// Strictness of the adversarial verifier, by aggressiveness level.
const STRICTNESS = AGGRESSIVENESS === 'medium'
  ? `Approve (safe=true) if ALL hold:
1. The replacement loses ZERO behavioral instruction, rule, example, qualifying question, number, or template content.
2. It does not weaken or make ambiguous any protected item.
3. The exactQuote is plausibly verbatim and unique in the file.
4. It saves meaningful length. Consolidating a rule that is genuinely RESTATED elsewhere is allowed even if it restructures a sentence, as long as every fact survives in at least one place.`
  : `Your DEFAULT is to REJECT unless you are confident it is fully safe. Approve (safe=true) ONLY if ALL hold:
1. The replacement loses ZERO behavioral instruction, rule, example, qualifying question, number, or template content.
2. It does not weaken or make ambiguous any protected item.
3. The exactQuote is plausibly verbatim and unique in the file.
4. It genuinely saves length and is NOT a rewrite for its own sake (a swap of equal-length synonyms, or any change that adds characters, must be REJECTED).`

const GROUND_RULES = `
This is a PRODUCTION voice/chat agent prompt for a Seeb client. The user wants to TRIM it — reduce wordiness and remove redundancy WITHOUT changing any behavior. Aggressiveness: "${AGGRESSIVENESS}".

ABSOLUTELY DO NOT propose removing or weakening any of these (most exist because of real test-call bugs):
- Any numbered rule, qualifying question, eligibility branch, or routing decision.
- Date/time-handling logic, "caller's day-of-month is source of truth", never-book-past/Sunday, and any booking BOOKABILITY / valid-start-time constraints.
- Any ✓/✗ contrastive example or worked example that disambiguates behavior.
- Verbatim caller-facing scripts and full SMS / email template bodies, signatures, location/changes lines — these are sent word-for-word.
- Tool call formats and field layouts (EventNotifierTool message fields, ForwardCallTool name rules, calendar tool params), and any notification phone number.
- Business facts: hours, fees, address, phone, staff directory entries, practice areas.
- The Ultravox pronunciation block (numbers/dates/times/years/currency) — required by policy.
- Voice-context preamble, scope-lock/jailbreak paragraph, no-markdown rule, and the politeness rules (Listen-Before-You-Act, Acknowledge-First, Never-Sound-Transactional, Active Listening).
- Any block marked TEMPORARY or OVERRIDE (e.g. a <TRANSFER_ROUTING> reception-routing override) — leave intact.${EXTRA_PROTECT}

WHAT IS FAIR GAME (propose only high-confidence, meaning-preserving condensations):
- Wordy prose that can be said in fewer words with identical meaning.
- A sentence that repeats a rule already stated verbatim elsewhere (cite both locations; condense the restatement, never delete the only copy).
- Redundant restatements — a scenario re-explaining logic already fully defined elsewhere can point back to it instead of repeating.
- Filler phrases, double hedges, over-explanation, and self-evident parentheticals.

For each proposal, exactQuote MUST be copied VERBATIM from the current file (exact characters, including XML tags and punctuation) and be UNIQUE in the file, so it can be applied as a literal string replacement. The replacement must preserve every instruction in the quote.
`

const SECTIONS_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['sections'],
  properties: {
    sections: {
      type: 'array',
      description: '5 to 9 contiguous, non-overlapping logical sections covering the whole file',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['key', 'desc'],
        properties: {
          key: { type: 'string', description: 'short kebab-case slug, e.g. core-constraints' },
          desc: { type: 'string', description: 'which named blocks/states it covers + approx line range + any protected sub-blocks to be careful around' },
        },
      },
    },
  },
}

const PROPOSAL_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['proposals'],
  properties: {
    proposals: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'section', 'exactQuote', 'replacement', 'charsSaved', 'rationale', 'risk'],
        properties: {
          id: { type: 'string', description: 'unique short id, e.g. core-1' },
          section: { type: 'string' },
          exactQuote: { type: 'string', description: 'verbatim text from the file, unique, to be replaced' },
          replacement: { type: 'string', description: 'condensed text preserving all instructions' },
          charsSaved: { type: 'number' },
          rationale: { type: 'string' },
          risk: { type: 'string', enum: ['low', 'med', 'high'] },
        },
      },
    },
  },
}

const VERDICT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['id', 'safe', 'preservesAllRules', 'reason'],
  properties: {
    id: { type: 'string' },
    safe: { type: 'boolean', description: 'true ONLY if the replacement loses zero behavioral instruction and the quote is plausibly verbatim+unique' },
    preservesAllRules: { type: 'boolean' },
    reason: { type: 'string' },
  },
}

// Phase 1 — discover the prompt's structure so this works on any client/format.
phase('Discover')
const discovery = await agent(
  `Read the file at "${FILE}". It is a voice or chat agent prompt — usually XML tags like <STATE>, <RULE>, <STEP>, or markdown ### headers. Split the ENTIRE file into 5 to 9 contiguous, non-overlapping logical sections suitable for parallel review (group related states/blocks together). For each section give a short key and a desc that names the blocks/states it covers, its approximate line range, and flags any protected sub-blocks a reviewer should be careful around (date logic, SMS/email bodies, pronunciation block, tool formats, qualifying questions).`,
  { label: 'discover-structure', phase: 'Discover', schema: SECTIONS_SCHEMA }
)
const SECTIONS = (discovery && discovery.sections && discovery.sections.length) ? discovery.sections : [{ key: 'whole-file', desc: 'the entire prompt' }]
log(`Discovered ${SECTIONS.length} sections to scan`)

// Phase 2 — scan each section in parallel for trim candidates.
phase('Scan')
const scanResults = await parallel(SECTIONS.map(s => () =>
  agent(
    `${GROUND_RULES}\n\nRead the file at "${FILE}". Focus ONLY on this part: ${s.desc}\n\nPropose conservative, behavior-preserving trims for THIS section only. Quality over quantity — a handful of strong, safe condensations beats many marginal ones. Return verbatim, unique exactQuote strings.\n\nCRITICAL OUTPUT RULE: You MUST call the StructuredOutput tool exactly once as your final action, even if you found nothing to trim. If this section is already tight and you have no proposals, call it with {"proposals": []}. NEVER end your turn with prose like "nothing to trim here" instead of calling the tool — a section that returns prose is silently dropped.`,
    { label: `scan:${s.key}`, phase: 'Scan', schema: PROPOSAL_SCHEMA }
  ).then(r => (r?.proposals || []).map(p => ({ ...p, section: p.section || s.key })))
))
const allProposals = scanResults.filter(Boolean).flat()
log(`Collected ${allProposals.length} trim proposals across ${SECTIONS.length} sections`)

// Phase 3 — adversarially verify each proposal; verifier defaults to reject.
phase('Verify')
const verdicts = await parallel(allProposals.map(p => () =>
  agent(
    `${GROUND_RULES}\n\nYou are an adversarial reviewer. Read the file at "${FILE}". A proposed trim is below.\n\n${STRICTNESS}\n\nSECTION: ${p.section}\nRATIONALE GIVEN: ${p.rationale}\nSELF-REPORTED RISK: ${p.risk}\n\n=== exactQuote (to be removed) ===\n${p.exactQuote}\n\n=== replacement (to be inserted) ===\n${p.replacement}\n\nReturn your verdict for id="${p.id}".`,
    { label: `verify:${p.id}`, phase: 'Verify', schema: VERDICT_SCHEMA }
  ).then(v => ({ ...p, verdict: v }))
))

const safe = verdicts.filter(Boolean).filter(x => x.verdict?.safe && x.verdict?.preservesAllRules)
const rejected = verdicts.filter(Boolean).filter(x => !(x.verdict?.safe && x.verdict?.preservesAllRules))
const totalSaved = safe.reduce((n, x) => n + (x.charsSaved || 0), 0)
log(`Verified: ${safe.length} safe, ${rejected.length} rejected. ~${totalSaved} chars saved if all applied.`)

return {
  file: FILE,
  aggressiveness: AGGRESSIVENESS,
  safe: safe.map(x => ({ id: x.id, section: x.section, charsSaved: x.charsSaved, risk: x.risk, exactQuote: x.exactQuote, replacement: x.replacement, reason: x.verdict?.reason })),
  rejected: rejected.map(x => ({ id: x.id, section: x.section, reason: x.verdict?.reason, rationale: x.rationale })),
  totalSaved,
}
