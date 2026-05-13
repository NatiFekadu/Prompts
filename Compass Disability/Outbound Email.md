Hi Benjamin,

Apologies for the back-and-forth earlier — we've now built out the outbound calling template for Amy that you originally asked about. The template handles the full outbound flow: confirming identity when a lead picks up, referencing the request they submitted, light qualification on their situation, and booking a free consultation with Kaylee directly onto her calendar with an SMS confirmation sent right after. It also handles voicemails, wrong-number pickups, and "not interested" responses, so leads who opt out are flagged and won't be re-dialed.

To trigger outbound calls, your system pushes leads into Amy by sending a POST request to the webhook endpoint we've set up for this group:

https://api.seeb.ai/api/v1/webhook/outbound/6a039568497104a2eeb9bf86

Each request needs the X-Seeb-Secret header for authentication. Once a valid request hits the endpoint, Amy will place the outbound call automatically using the data in the payload.

The fields Amy uses from each lead are:

- first_name and last_name — Amy addresses the lead by first name and confirms identity at the start of the call
- phone_number — the number Amy dials, in E.164 format (for example, +18015550123)
- email — referenced when relevant and passed along to Kaylee for the consult
- description — the most important field, because Amy uses it as the conversational context when she follows up. For example, "Submitted website form about appealing an SSDI denial" or "Asked about help starting an initial application." The more specific the description, the more natural and personalized the call sounds
- metadata — optional, useful if you want to pass through source or priority tags for your internal tracking
- scheduledTime — controls when Amy places the call. Set this to the date and time you want the outbound to fire

If you want to send a batch of leads at once, the data array can hold multiple entries in a single request.

Please let us know if you'd like to test this on a sample lead first, or if you have specific outbound use cases in mind — form follow-ups, missed-call callbacks, consultative exam reminders — so we can fine-tune the description templates and timing for each.

Best regards,
Seeb Support Team
