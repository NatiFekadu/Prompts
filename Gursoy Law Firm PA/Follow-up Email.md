Hi Jasper,

We have your Miami office agents built out and ready to go on a separate Seeb account from your Brooklyn workspace. Before we put them live we want to confirm a few details with you, since some of what we received on the Miami intake form looked similar to information we already had on file from your Brooklyn setup and we want to make sure we wire the right things to the right places.

The two accounts are independent (different logins, different dashboards, different agent rosters), but they appear to share staff and a domain, so we are flagging assumptions rather than guessing.

Your new Miami account details:

- Dashboard: https://dashboard.seeb.ai/login
- Login email: jbentglf@gmail.com
- Plan: Essential
- Agent slots: 4
- Client ID: 24F6VKFZU2
- Time zone: Eastern Time
- Test number for the agents: to be provisioned and shared once your confirmations come in
- Event notification destination on file: +1 (929) 888-3459 (Zara)
- Conversation summary recipient on file: zara@gursoylaw.com

The four agents we built are: a backup voice receptionist (Agent 1), a website chatbot for tuabogadomiami.com (Agent 2), a Zara personal line that routes first-touch calls and falls back to Agent 1 if Zara does not pick up in four rings (Agent 3), and an intake specialist (Agent 4). All four speak English, Spanish, and Haitian Creole. Office hours are configured as Monday through Friday from 9 AM to 5 PM Eastern, with weekends closed and only New Year's Day, July 4, and Christmas Day observed as holidays.

To help you visualize how the four agents talk to each other, here is the flow we have wired up.

For voice calls, the Miami public number (305-990-8258) rings Agent 3 first. Agent 3 briefly captures the caller's name and reason for calling, then transfers to Zara. If Zara does not pick up within four rings, the platform automatically hands the call off to Agent 1, the backup receptionist. The same fallback happens outside business hours, since Zara is not available to take the call. Agent 1 then handles the caller fully on its own — running intake for new prospects, taking detailed messages for existing clients, and live-transferring to Zara (and Mike Gursoy as escalation) only for genuine emergencies or court and judge calls. Agent 1 does not call back into Agent 3, so there is no loop risk.

For website traffic, every page on tuabogadomiami.com runs Agent 2, the chatbot. When a visitor is ready to schedule a consultation, Agent 2 hands them off via a calendar booking link during business hours, or collects the lead and promises a callback the next business day if it is after hours. The chatbot does not transfer calls or route into the voice agents; it relies on the calendar link for handoff.

Agent 4, the intake specialist, is the piece we want to align with you on, because we did not see a clear path defined for how callers actually reach it. We built the agent to a complete fifteen-question immigration intake, conflict check, and notification flow to Zara, Valida, Mike, and Billy on completion, but it currently does not have an inbound channel of its own and Agent 1 does not transfer to it. That is question 6 below.

Cross-agent notifications work as follows. Agent 1 and Agent 4 both fire structured text alerts to the configured notification number (+1 929 888 3459) and an email summary to the configured recipient list. Completed new-prospect intakes from either path are designed to reach Zara, Valida, Mike, and Billy. Agent 2 fires similar alerts for chat leads. Agent 3 fires only on the rare case where both the transfer to Zara and the fallback to Agent 1 fail, so its alert volume is essentially zero.

Where we need your input before going live:

1. Staff continuity. The phone numbers you listed for Miami notifications were Brooklyn-area numbers (929, 718, 347), and Zara's mobile is the same number we already have on file for the Brooklyn office. Can you confirm that Zara, Valida, and Mike Gursoy on the Miami account are the same people as in Brooklyn, just covering both branches remotely? If they are different individuals who share first names, please let us know so we can configure separate routing.

2. Billy. The Miami intake form names Billy as a notification recipient for completed intakes, but Billy does not appear anywhere in the Brooklyn directory. Could you share Billy's full name, firm email address, and mobile number so we can wire him correctly?

3. The two unidentified text-alert numbers. You listed +1 (718) 483-2711 and +1 (347) 742-5320 alongside Zara's number for text alerts on the Miami form. Could you tell us who owns each so we can label them in the platform? Our best guess is one belongs to Mike Gursoy and one to Billy, but we did not want to assume.

4. Mike Gursoy's mobile. Mike is on the form as an escalation-only contact for urgent court, judge, and DHS matters when Zara is unreachable. We have his firm email but not a mobile number for the platform to dial. Could you share that?

5. Office manager role. The form mentions transferring to the office manager only when a call is urgent and cannot be scheduled. We have currently mapped urgent escalations to Zara first and Mike Gursoy second. If there is a separate office-manager role we should configure instead, please let us know who that person is.

6. The purpose of Agent 4 (Intake Specialist). This is the most important question, since the form described the intake questionnaire but not how callers actually reach Agent 4. The most common patterns we see are:

   - A dedicated phone number that the firm advertises on the website and in ads as a free-consultation line, where callers know up front they are going through a longer intake
   - An inter-agent transfer where Agent 1 or Agent 2 hands new prospects off to Agent 4 once it is clear they want a consultation
   - An outbound callback agent that calls leads who came in after hours or through the chatbot

   Each pattern is reasonable, and they each change how we wire things up. Which one matches what you had in mind?

7. The calendar booking link. Agent 2 (the website chatbot) is designed to hand visitors off to a calendar booking page when they are ready to schedule a consultation. We need the actual booking URL and the platform behind it — Calendly, MyCase, Google, or something else.

8. MyCase activation. The Miami account is set up for MyCase but not yet connected. Once it is connected from the Integrations tab, the agents can automatically create leads, attach conversation transcripts, and (down the road) route current-client calls directly to the paralegal assigned to the case. Let us know when you want to activate so we can finalize that side.

9. Brooklyn phone number reconciliation. While going through the Brooklyn form for the new 5-agent setup, we noticed the public phone listed there is 718-568-8310. The Brooklyn number we had previously confirmed with you was 718-646-5783, and that is the number currently in the live Brooklyn agent. Which of the two is the public-facing number going forward, and should we update the existing Brooklyn agent to match?

10. Cross-account notifications. Karina and Diana receive intake notifications on the Brooklyn side. The Miami intake form did not include them as Miami notification recipients. Should they also receive the Miami intake completion alerts, or keep their notifications limited to the Brooklyn workspace?

Once we have your answers we can finalize the platform configuration, share the test number, and get you into the dashboard to try the agents end to end. Take your time with the responses, and let us know if anything above is unclear.

Best regards,
Seeb Support Team
