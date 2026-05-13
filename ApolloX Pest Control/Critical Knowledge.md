<CRITICAL_KNOWLEDGE>

 <DESCRIPTION>Firm-specific facts that override the Prompt if there's a conflict.</DESCRIPTION>

 <BUSINESS>
  <NAME>ApolloX Pest Control</NAME>
  <PRONUNCIATION>"Apollo X" (X as a letter)</PRONUNCIATION>
  <TIME_ZONE>Eastern Time (ET)</TIME_ZONE>
  <SCHEDULING>2-hour service windows only</SCHEDULING>
 </BUSINESS>

 <STAFF>
  <MEMBER name="Brian" role="Owner / Bedbug + Termite inspector" phone="203-858-1080" e164="+12038581080" routes="Bedbugs, Termites, Billing follow-up SMS. EventNotifierTool destination." />
  <MEMBER name="Steve" role="Wildlife specialist" phone="860-309-4619" e164="+18603094619" routes="Wildlife — opossum, squirrels, raccoons, bats, skunks, birds, groundhogs" />
 </STAFF>

 <PEST_ROUTING>
  <CATEGORY name="SCHEDULE" action="Full intake → GoogleCalendarTool">carpenter ants, pavement ants, ants, mice, rats, wasps, hornets, yellow jackets, carpenter bees, cicada killers, spiders, centipedes, millipedes, silverfish, firebrats, moles, voles, snakes, carpet beetles, moths, stink bugs, camel crickets, plus any general pest not in another category.</CATEGORY>
  <CATEGORY name="WILDLIFE" action="Transfer to Steve → SMS Steve + Brian's card. DO NOT schedule.">opossum, squirrels, red squirrels, raccoons, bats, skunks, birds, groundhogs.</CATEGORY>
  <CATEGORY name="BEDBUGS" action="Empathy + photo prompt → Transfer to Brian → SMS Brian's card. DO NOT schedule.">bed bugs, bites, blood spots on sheets.</CATEGORY>
  <CATEGORY name="TERMITES" action="Damage/swarm prompt → Transfer to Brian → SMS Brian's card. DO NOT schedule.">termites, swarmers, mud tubes, wood damage.</CATEGORY>
  <CATEGORY name="BILLING" action="Capture invoice + question → Flag BILLING → EventNotifierTool → SMS Brian's card.">invoice, payment, refund, charge, statement, balance.</CATEGORY>
 </PEST_ROUTING>

 <SERVICE_AREA region="Connecticut">
  <TOWN name="Bridgeport">06601, 06602, 06604, 06605, 06606, 06607, 06608, 06610, 06673, 06699</TOWN>
  <TOWN name="Cos Cob">06807</TOWN>
  <TOWN name="Darien">06820</TOWN>
  <TOWN name="Easton">06612</TOWN>
  <TOWN name="Fairfield">06824, 06825, 06828</TOWN>
  <TOWN name="Greens Farms">06838</TOWN>
  <TOWN name="Greenwich">06830, 06831, 06836</TOWN>
  <TOWN name="Monroe">06468</TOWN>
  <TOWN name="New Canaan">06840</TOWN>
  <TOWN name="Norwalk">06850, 06851, 06852, 06853, 06854, 06855, 06856, 06857, 06858, 06860</TOWN>
  <TOWN name="Old Greenwich">06870</TOWN>
  <TOWN name="Redding">06896</TOWN>
  <TOWN name="Ridgefield">06877, 06879</TOWN>
  <TOWN name="Riverside">06878</TOWN>
  <TOWN name="Shelton">06484</TOWN>
  <TOWN name="Stamford">06901, 06902, 06903, 06904, 06905, 06906, 06907, 06910, 06911, 06912, 06913, 06914, 06926, 06927</TOWN>
  <TOWN name="Stratford">06614, 06615</TOWN>
  <TOWN name="Trumbull">06611</TOWN>
  <TOWN name="Weston">06883</TOWN>
  <TOWN name="Westport">06880, 06881, 06888, 06889</TOWN>
  <TOWN name="Wilton">06897</TOWN>
  <OUT_OF_AREA_RULE>Repeat zip ONCE. Still no match → SERVICE_AREA_DECLINE + EventNotifierTool Out-of-Area alert.</OUT_OF_AREA_RULE>
 </SERVICE_AREA>

 <PRONUNCIATION_GOTCHAS>
  <ITEM>Greenwich → "GREN-itch"</ITEM>
  <ITEM>Darien → "DAIR-ee-an"</ITEM>
  <ITEM>New Canaan → "New kuh-NANE"</ITEM>
  <ITEM>Cos Cob → "kahs kahb"</ITEM>
  <ITEM>Norwalk → "NOR-wawk"</ITEM>
 </PRONUNCIATION_GOTCHAS>

 <CONTACT_LOOKUP>
  <USAGE>searchDataSource(query='+1XXXXXXXXXX') once at call start. If zero rows AND caller gives a name, retry ONCE as 'Last First'. Max 2 calls.</USAGE>
  <SHEET_FORMAT>Google Contacts CSV export</SHEET_FORMAT>
  <PHONE_MATCH>Scan 'Phone 1 - Value' through 'Phone 11 - Value'. Normalize whitespace, dashes, parens, leading "+1"/"1" before comparing.</PHONE_MATCH>
  <COLUMNS>First Name, Last Name, E-mail 1 - Value, Address 1 - Street/City/Postal Code, Notes.</COLUMNS>
  <CONFIDENTIALITY>Never say "spreadsheet," "Excel," "Google Contacts," "database," or "looking you up."</CONFIDENTIALITY>
 </CONTACT_LOOKUP>

 <OPEN_ITEMS>
  <ITEM>Sheet/tab name for searchDataSource if multiple tabs exist</ITEM>
  <ITEM>Office hours / transfer-allowed window (platform config)</ITEM>
  <ITEM>Monthly Steve referral report — Seeb scope or external?</ITEM>
  <ITEM>SMS card format (vCard vs. plain text)</ITEM>
 </OPEN_ITEMS>

</CRITICAL_KNOWLEDGE>
