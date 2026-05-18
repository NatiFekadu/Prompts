Hi Kregg,

Thanks for flagging both of these.

On the video link issue — you're right, the agent was offering "video consultations" and promising to send a video link, but we don't have a video link generation step wired up, so nothing was actually being sent. We've updated the prompt to remove video as an option entirely. The agent will now offer phone or in-person only, default to phone when the caller doesn't have a strong preference, and if anyone asks specifically about video the agent will steer them back to phone. The "do I need to download an app" follow-up is also handled now — the agent will simply confirm the attorney will call them directly at the number on file.

On the calendar sync — this is on our side to look into rather than something we can fix from the prompt. The agent is reading availability from MyCase via our integration, so if MyCase isn't reflecting your personal calendar's blocks, the agent will see those windows as open and book over them. A few things would help us track this down:

- Which calendar are you trying to sync into MyCase (Google, Outlook, Apple)?
- When you say you've tried to sync multiple times, are you syncing through MyCase's calendar settings, or through your calendar app's MyCase integration?
- Are the conflicting events on your personal calendar, on a shared firm calendar, or both?

If you can send us a screenshot of your MyCase calendar settings page, that would let us see exactly where the sync is breaking. In the meantime, we can also add a buffer rule on our side so the agent only books slots with extra padding — let us know if you'd like us to do that as a temporary measure.

Best regards,
Seeb Support Team
