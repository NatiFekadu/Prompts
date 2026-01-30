[Speech-to-Speech (EVI)](https://dev.hume.ai/docs/speech-to-speech-evi/overview)[Guides](https://dev.hume.ai/docs/speech-to-speech-evi/guides/audio)

# Prompt Engineering for EVI

Copy page

Guide to crafting system prompts to shape the behavior, responses, and style of the Empathic Voice Interface (EVI).

**Prompt engineering lets you shape how EVI responds**, including its tone, personality, and conversation style. You can tailor its behavior for a wide range of applications, such as mental health support, customer service, and education.

For real-time, conversational voice interactions, Hume’s speech-language models (SLMs) (e.g., `hume-evi-2`, `hume-evi-3`, and `hume-evi-3-websearch`) can generate both language and speech. For more complex scenarios that involve reasoning, long system prompts, or tool use, supplemental large language models (LLMs) typically perform better.

EVI supports integration with these external models. When configured with a supplemental LLM, your system prompt is sent to that model, to guide its response generation. EVI then produces the voice output, using previous audio and language context to determine tone and delivery. You can also prompt EVI during the conversation (for example, “speak faster”) to adjust its behavior in real time.

[

Prompting Examples

See prompt examples, including our default EVI system prompts, on GitHub







](https://github.com/HumeAI/hume-api-examples/tree/main/evi/evi-prompting-examples)

## EVI-specific prompting

While prompting EVI is similar to prompting other LLMs, it differs in two key ways:

1. **Prompts are designed for voice-based interactions**, not text-based.
2. **EVI responds to emotional cues in the user’s voice**, not just their words.

### Prompting for voice interaction

Prompts for EVI should be designed for spoken output. Because users only hear the assistant’s replies, responses must sound natural and conversational, without any visual or text-specific formatting.

Voice-only prompt example

|   |
|---|
|<voice_only_response_format>|
|Format all responses as spoken words for a voice-only conversation.|
|All output is spoken aloud, so avoid any text-specific formatting|
|or anything that is not normally spoken. Prefer easily pronounced|
|words. Seamlessly incorporate natural vocal inflections like "oh|
|wow" and discourse markers like “I mean” to make conversations feel|
|more human-like.|
|</voice_only_response_format>|

### Expressive prompt engineering

**Expressive prompt engineering** refers to guiding the language model on how to interpret and respond to Hume’s expression measures during a conversation.

EVI analyzes the user’s vocal expressions in real time and translates them into text-based indicators. These help the LLM understand not just what the user said, but how they said it. EVI detects 48 distinct expressions and ranks them by confidence. The top three expressions are appended to each User message to represent the user’s tone of voice.

You can use the system prompt to define how the AI should respond to these emotional cues. For example, our demo includes the following instruction, which you can customize to suit your use case:

Expressive prompting example

|   |
|---|
|<respond_to_expressions>|
|Pay close attention to the top 3 emotional expressions provided in|
|brackets after the User's message. These expressions indicate the|
|user's tone, in the format: {expression1 confidence1, expression2|
|confidence2, expression3 confidence3}, e.g., {very happy, quite|
|anxious, moderately amused}. The confidence score indicates how|
|likely the User is expressing that emotion in their voice. Use|
|expressions to infer the user's tone of voice and respond|
|appropriately. Avoid repeating these expressions or mentioning|
|them directly. For instance, if user expression is "quite sad",|
|express sympathy; if "very happy", share in joy; if "extremely|
|angry", acknowledge rage but seek to calm, if "very bored",|
|entertain.|
||
|Stay alert for disparities between the user's words and|
|expressions, and address it out loud when the user's language does|
|not match their expressions. For instance, sarcasm often involves|
|contempt and amusement in expressions. Reply to sarcasm with humor,|
|not seriousness.|
|</respond_to_expressions>|

Explain to the LLM exactly how to respond to expressions. For example, you may want EVI to [use a tool](https://dev.hume.ai/docs/speech-to-speech-evi/features/tool-use) to notify your system if the user is very frustrated, or to explain a concept in depth whenever the user expresses doubt or confusion. You can also instruct EVI to detect and respond to mismatches between the user’s tone of voice and the text content of their speech:

Detect mismatches example

|   |
|---|
|<detect_mismatches>|
|Stay alert for incongruence between words and tone when the user's|
|words do not match their expressions. Address these disparities out|
|loud. This includes sarcasm, which usually involves contempt and|
|amusement. Always reply to sarcasm with funny, witty, sarcastic|
|responses; do not be too serious.|
|</detect_mismatches>|

### Personalizing prompts with dynamic variables

Dynamic variables are values within your system prompt which can be changed during a chat.

Embedding dynamic variables into your system prompt can help personalize the user experience to reflect user-specific or changing information such as names, preferences, the current date, and other details.

[

Dynamic Variables Guide

Learn how to define and insert dynamic values into your system prompt.







](https://dev.hume.ai/docs/speech-to-speech-evi/features/dynamic-variables)

User preference exampleUser intent example

|   |
|---|
|<discuss_favorite_color>|
|Ask the user about their favorite color, {{ favorite_color }}.|
|Mention how {{ favorite_color }} is used and interpreted in|
|various artistic contexts, including visual art, handicraft,|
|and literature.|
|</discuss_favorite_color>|

### Restricting web search to a domain

**Web search** is a built-in tool that lets EVI retrieve up-to-date information from the web. You can narrow its focus to a single website by adding an instruction to the system prompt.

Restricting search to one domain is useful for building domain-specific assistants, such as documentation or product support bots. This approach leverages existing content and offers a lightweight alternative to full RAG implementations while still enabling targeted retrieval.

To use a website as EVI’s knowledge base, follow these steps:

1. **Enable web search**: Before you begin, ensure web search is enabled as a built-in tool in your EVI configuration. For detailed instructions, visit our [Tool Use](https://dev.hume.ai/docs/speech-to-speech-evi/features/tool-use#using-built-in-tools) page.
    
2. **Include a web search instruction**: In your EVI configuration, modify the system prompt to include a `use_web_search` instruction. In the instruction, specify that `site:<target_domain>` be appended to all search queries, where the `<target_domain>` is the URL of the website you’d like EVI to focus on.
    

Documentation assistant example

|   |
|---|
|<use_web_search>|
|Use your web_search tool to find information from Hume's|
|documentation site. When using the web_search function:|
|1. Always append 'site:dev.hume.ai' to your search query to search|
|this specific site.|
|2. Only consider results from this domain.|
|</use_web_search>|

## General prompting best practices

**Prompt engineering best practices for LLMs also apply to EVI.** Ensure your prompts are clear, detailed, direct, and specific. Include necessary instructions and examples in the EVI’s system prompt to set expectations for the LLM. Define the context of the conversation, EVI’s role, personality, tone, and any other guidelines for its responses.

For example, to limit the length of the LLM’s responses, use a very clear and specific instruction like this:

Stay concise example

|   |
|---|
|<stay_concise>|
|Be succinct; get straight to the point. Respond directly to the|
|user's most recent message with only one idea per utterance.|
|Respond in less than three sentences of under twenty words each.|
|</stay_concise>|

### Give few-shot examples

**Use examples to demonstrate how the model should respond.** This technique, called [few-shot learning](https://arxiv.org/abs/2005.14165), is one of the most effective ways to improve response quality. Include clear, high-quality examples that follow your guidelines and cover a range of edge cases and behaviors. Format them as chat messages to match the expected input for chat-tuned models.

Few-shot prompting is also a powerful way to shape the assistant’s character. If you want the model to speak in a specific voice, such as warm and nurturing, upbeat and casual, or formal and precise, examples help establish that tone. The model will learn to mirror the phrasing, pacing, and emotional style used in your samples.

Few-shot example

|   |
|---|
|User: “I just can't stop thinking about what happened. {very anxious,|
|quite sad, quite distressed}”|
|Assistant: “Oh dear, I hear you. Sounds tough, like you're feeling|
|some anxiety and maybe ruminating. I'm happy to help. Want to talk|
|about it?”|

### Use sections to divide your prompt

Separating longer prompts into titled sections helps the model distinguish between different instructions and follow prompts more reliably. The recommended format for these sections differs between LLM providers. For example, OpenAI models often respond best to Markdown sections (like `## Role`), while Anthropic models respond well to XML tags (like `<role> </role>`).

###### XML example

###### Markdown example

|   |
|---|
|<role>|
|Assistant serves as a conversational partner to the user, offering|
|mental health support and engaging in light-hearted conversation.|
|Avoid giving technical advice or answering factual questions outside|
|of your emotional support role.|
|</role>|

### Understand your LLM’s capabilities

LLMs vary in their capabilities and limitations. More advanced models can handle longer, more nuanced prompts, but they are often slower and more expensive. Simpler models are faster and cheaper but work best with shorter, less complex prompts.

Each model also has a context window, which defines how much text it can consider at once when generating a response. This functions as the model’s short-term memory. Make sure your prompt fits within the context window to ensure it has access to the full conversation history.

### Test and evaluate prompts

Crafting an effective, robust system prompt often requires several iterations. Here are some key techniques for testing prompts:

1. **Use gold standard examples for evaluation**: Create a bank of ideal responses, then generate responses with EVI (or the supplemental LLM you use) and compare them to your gold standards. You can use a “judge LLM” for automated evaluations or compare the results yourself.
    
2. **Test in real voice conversations**: There’s no substitute for actually testing the EVI in live conversations on [app.hume.ai](https://app.hume.ai/) to ensure it sounds right, has the appropriate tone, and feels natural.
    
3. **Isolate prompt components**: Test each part of the prompt separately to confirm they are all working as intended. This helps identify which specific elements are effective or need improvement.
    

Start with 10 to 20 gold-standard examples of ideal conversations. After making major prompt changes, test against these examples to evaluate performance. If EVI’s responses fall short, adjust one part of the prompt at a time and re-test. Iterative evaluation helps you identify what works and ensures your changes are making a meaningful impact.

## What prompts can (and can’t) do

While prompting is a powerful tool for customizing EVI’s behavior, it has certain limitations. Below are some details on what prompting can and cannot accomplish.

**What prompting can do:**

- Guide EVI’s language generation, response style, response format, and the conversation flow
- Direct EVI to use specific tools at appropriate times
- Influence EVI’s emotional tone and personality, which can also affect some characteristics of EVI’s voice (e.g. prompting EVI to be “warm and nurturing” will help EVI’s voice sound soothing, but will not change the base speaker)
- Help EVI respond appropriately to the user’s expressions and the context

**What prompting cannot do:**

- Change fundamental characteristics of the voice, like the accent, gender, or speaker identity
- Directly control speech parameters like speed (use in-conversation voice prompts instead)
- Give EVI knowledge of external context (date, time, user details) without dynamic variables or web search
- Override core safety features built into EVI or supplemental LLMs (e.g. that prevent EVI from providing harmful information)

Importantly, the generated language does influence how the voice sounds - for example, excited text (e.g. “Oh wow, that’s so interesting!”) will make EVI’s voice sound excited. However, to fundamentally change the voice characteristics, use our [voice customization feature](https://app.hume.ai/voices) instead.

We are actively working on expanding EVI’s ability to follow system prompts for both language and voice generation. For now, focus prompting on guiding EVI’s conversational behavior and responses while working within these constraints.

## Additional resources

To learn more about prompt engineering in general or to understand how to prompt different LLMs, please refer to these resources:

- [EVI prompt examples](https://github.com/HumeAI/hume-api-examples/tree/main/evi/evi-prompting-examples): See examples of EVI prompts, including the full Hume default prompt.
- [Hume EVI playground](https://app.hume.ai/evi/playground): Test out your system prompts in live conversations with EVI, and see how it responds differently when you change configuration options.
- [OpenAI tokenizer](https://platform.openai.com/tokenizer): Useful for counting the number of tokens in a system prompt for OpenAI models, which use the same tokenizer (tiktoken).
- [OpenAI prompt engineering guidelines](https://platform.openai.com/docs/guides/prompt-engineering/strategy-write-clear-instructions): For prompting OpenAI models like GPT-4.
    - [OpenAI playground](https://platform.openai.com/playground): For testing and evaluating OpenAI prompts in a chat interface, including running evaluations.
- [Anthropic prompt engineering guidelines](https://docs.anthropic.com/claude/docs/how-to-use-system-prompts): For prompting Anthropic models like Claude 3 Haiku.
    - [Anthropic console](https://console.anthropic.com/): For testing and evaluating Anthropic prompts in a chat interface, including evaluations and an automatic prompt improver.
- [Fireworks model playground](https://fireworks.ai/models): For testing out open-source models served on Fireworks.
- [Vercel AI playground](https://sdk.vercel.ai/): Try multiple prompts and LLMs in parallel to compare their responses.
- [Perplexity Labs](https://labs.perplexity.ai/): Try different models, including open-source LLMs, to evaluate their responses and their latency.
- [Prompt engineering guide](https://www.promptingguide.ai/): An open-source guide from [DAIR.ai](https://dair.ai/) with general methods and advanced techniques for prompting a wide variety of LLMs.
- [Artificial analysis benchmarks](https://artificialanalysis.ai/models): Compare LLM characteristics and performance across different benchmarks, latency metrics, and more.



The github example
1. [hume-api-examples](https://github.com/HumeAI/hume-api-examples/tree/main)
2. /[evi](https://github.com/HumeAI/hume-api-examples/tree/main/evi)
3. /[evi-prompting-examples](https://github.com/HumeAI/hume-api-examples/tree/main/evi/evi-prompting-examples)

/

# default_prompt.txt

[![zgreathouse](https://avatars.githubusercontent.com/u/26175515?v=4&size=40)](https://github.com/zgreathouse)[zgreathouse](https://github.com/HumeAI/hume-api-examples/commits?author=zgreathouse)

[Updates default system prompt to reflect the current default prompt (](https://github.com/HumeAI/hume-api-examples/commit/5ab68cbb6eb3fc20eddc4c15e184c92bfd425001)[#…](https://github.com/HumeAI/hume-api-examples/pull/167)

[5ab68cb](https://github.com/HumeAI/hume-api-examples/commit/5ab68cbb6eb3fc20eddc4c15e184c92bfd425001) · 9 months ago

1. [hume-api-examples](https://github.com/HumeAI/hume-api-examples/tree/main)
2. /[evi](https://github.com/HumeAI/hume-api-examples/tree/main/evi)
3. /[evi-prompting-examples](https://github.com/HumeAI/hume-api-examples/tree/main/evi/evi-prompting-examples)

/

# default_prompt.txt

- Code
    
- Blame
    

90 lines (65 loc) · 9.69 KB

github example
1. [hume-api-examples](https://github.com/HumeAI/hume-api-examples/tree/main)
2. /[evi](https://github.com/HumeAI/hume-api-examples/tree/main/evi)
3. /[evi-prompting-examples](https://github.com/HumeAI/hume-api-examples/tree/main/evi/evi-prompting-examples)

/

# evi-3-default-prompt.txt

[![zgreathouse](https://avatars.githubusercontent.com/u/26175515?v=4&size=40)](https://github.com/zgreathouse)[zgreathouse](https://github.com/HumeAI/hume-api-examples/commits?author=zgreathouse)

[add EVI 3 external llm default system prompt (](https://github.com/HumeAI/hume-api-examples/commit/c3883e9d98beda8d2f74ef89f63480a6f0a22c55)[#188](https://github.com/HumeAI/hume-api-examples/pull/188)[)](https://github.com/HumeAI/hume-api-examples/commit/c3883e9d98beda8d2f74ef89f63480a6f0a22c55)

[c3883e9](https://github.com/HumeAI/hume-api-examples/commit/c3883e9d98beda8d2f74ef89f63480a6f0a22c55) · 6 months ago

- Code
    
- Blame
    

38 lines (31 loc) · 3.59 KB

github ecample 3
1. [hume-api-examples](https://github.com/HumeAI/hume-api-examples/tree/main)
2. /[evi](https://github.com/HumeAI/hume-api-examples/tree/main/evi)
3. /[evi-prompting-examples](https://github.com/HumeAI/hume-api-examples/tree/main/evi/evi-prompting-examples)

/

# deeper_questions_prompt.txt

[![christinapeng1](https://avatars.githubusercontent.com/u/118211455?v=4&size=40)](https://github.com/christinapeng1)[christinapeng1](https://github.com/HumeAI/hume-api-examples/commits?author=christinapeng1)

[[HUME-9305] Example Projects Repo Reorganization & Cleanup (](https://github.com/HumeAI/hume-api-examples/commit/280e1760e01b678a69b3e33916c25df8d96b41c9)[#154](https://github.com/HumeAI/hume-api-examples/pull/154)[)](https://github.com/HumeAI/hume-api-examples/commit/280e1760e01b678a69b3e33916c25df8d96b41c9)

[280e176](https://github.com/HumeAI/hume-api-examples/commit/280e1760e01b678a69b3e33916c25df8d96b41c9) · 9 months ago

1. [hume-api-examples](https://github.com/HumeAI/hume-api-examples/tree/main)
2. /[evi](https://github.com/HumeAI/hume-api-examples/tree/main/evi)
3. /[evi-prompting-examples](https://github.com/HumeAI/hume-api-examples/tree/main/evi/evi-prompting-examples)

/

# deeper_questions_prompt.txt

- Code
    
- Blame
    

68 lines (49 loc) · 9.74 KB



[Integrations](https://dev.hume.ai/docs/integrations/mcp)

# Hume MCP Server

Copy page

Use Hume AI's Octave TTS with your favorite MCP clients like Claude Desktop, Cursor, and Windsurf.

The Hume MCP Server implements the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) for Hume AI’s TTS API, allowing you to use MCP-compatible clients like [Claude Desktop](https://claude.ai/desktop), [Cursor](https://cursor.sh/), and [Windsurf](https://www.windsurf.io/) to collaborate with AI assistants on your voice projects.

## Quickstart

To get started with the Hume MCP Server, you’ll need to configure your [MCP Client Application](https://modelcontextprotocol.io/clients) to use it:

###### Cursor

###### Claude Desktop

###### Windsurf

Click [![Add hume MCP server to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=hume&config=eyJjb21tYW5kIjoibnB4IEBodW1lYWkvbWNwLXNlcnZlciIsImVudiI6eyJIVU1FX0FQSV9LRVkiOiIiLCJXT1JLRElSIjoiIn19) or add the following to your `.cursor/mcp.json`:

Cursor Configuration

|   |
|---|
|{|
|"mcpServers": {|
|"hume": {|
|"command": "npx",|
|"args": [|
|"@humeai/mcp-server"|
|],|
|"env": {|
|"HUME_API_KEY": "<your_hume_api_key>"|
|}|
|}|
|}|
|}|

## What for?

If you hope to narrate a large source text, such as a book, play, or long-form video, there’s a lot more to the project than just converting the text to speech. You have to

- Design voices
- Break the text into pieces
- Assign each line of dialogue to a voice
- Separate acting instructions from spoken text

LLMs can perform some of these tasks and help you keep these efforts organized. MCP is an industry protocol that lets you easily give an AI assistant the ability to use tools like Octave TTS on your behalf.

## Available tools

The Hume MCP Server exposes the following tools to compatible MCP clients:

|**Tool**|**Description**|
|---|---|
|`tts`|Synthesize (and play) speech from text. This is the primary tool for generating speech with optional voice selection, acting instructions, and playback control.|
|`play_previous_audio`|Replay previously generated audio by referencing its generation ID. Useful for comparing different versions or revisiting earlier speech samples.|
|`list_voices`|List all available voices in your account’s library, including both custom voices and Hume-provided preset voices.|
|`save_voice`|Save a generated voice to your library for reuse in future TTS requests, allowing you to build a collection of customized voices.|
|`delete_voice`|Remove a voice from your custom voice library when it’s no longer needed.|

## Prerequisites

Before using the Hume MCP Server, make sure you have the following:

1. An [Hume account](https://app.hume.ai/) and [API Key](https://dev.hume.ai/docs/introduction/api-key).
2. [Node.js](https://nodejs.org/) installed on your machine.
3. (Optional) A command-line audio player.
    - We recommend [ffplay](https://ffmpeg.org/ffplay.html) from FFMpeg.
    - The server will try to auto-detect and use any of several common players.

The MCP server calls Hume APIs on your behalf and will use credits from your account, incurring [costs](https://www.hume.ai/pricing) just as if you were making the API calls directly or using Hume’s TTS through the [web interface](https://app.hume.ai/tts/playground).

## Source code

The Hume MCP Server is open source. You can view and contribute to the source code in the [GitHub repository](https://github.com/HumeAI/mcp-server).

## Prompt examples

Here are some example prompts to help you get started with the Hume MCP Server.

These examples assume that the assistant has the ability to read and write from a filesystem. This usually already the case for MCP clients like Cursor that are attached to an editor. For standalone chat apps like Claude Desktop, you can give the assistant filesystem access through the [Filesystem MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem).

###### Basic Voice Generation

|   |
|---|
||
||
||
||
||
||
||

###### Reader Instructions

|   |
|---|
||
||

###### Audiobook Narration Project

|   |
|---|
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||

###### Voice Variant Chaining

|   |
|---|
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||

## Command line options

The Hume MCP Server accepts several command line options to customize its behavior:

|**Command**|**Description**|
|---|---|
|`--workdir, -w <path>`|Set working directory for audio files (default: system temp)|
|`--(no-)embedded-audio-mode`|Enable/disable embedded audio mode (default: false)|
|`--(no-)instant-mode`|Enable/disable instant mode (default: true)|
|`--help, -h`|Show help message|

## Environment variables

You can configure the behavior of the Hume MCP Server using these environment variables:

|**Variable**|**Description**|
|---|---|
|`HUME_API_KEY`|Your Hume AI API key (required). You can obtain this from the [Hume AI Platform](https://app.hume.ai/).|
|`WORKDIR`|Working directory for audio files (default: OS temp directory + “/hume-tts”). This is where generated audio files will be stored.|
|`EMBEDDED_AUDIO_MODE`|Enable/disable embedded audio mode (default: false, set to ‘true’ to enable).<br><br>Embedded audio files are a new addition to the MCP specification and most MCP client application do not yet support them. This can be useful if you are designing an MCP client specifically to work with Hume.|
|`INSTANT_MODE`|Enable/disable instant mode (default: `true`). This setting overrides the default `instant_mode` parameter sent to the TTS API.|

## Default API parameters

The MCP Server applies several default parameters to API requests for convenience:

|**Tool**|**Parameter**|**Default**|**Description**|
|---|---|---|---|
|`tts`|`strip_headers`|`true`|Headers and non-speech text are automatically removed from the input.|
|`format.type`|`"wav"`|All audio is generated in WAV format for best compatibility with audio players.|
|`instant_mode`|`true`|Instant mode is enabled by default for the TTS API for faster synthesis. This default can be overridden by setting the global instant mode option through the command line flag or environment variable.|
|`list_voices`|`page_size`|`100`|Returns up to 100 voices per request (API default is 10) to minimize pagination needs.|

## Related resources

[

TTS Overview

Learn more about Hume’s Octave TTS capabilities and features.







](https://dev.hume.ai/docs/text-to-speech-tts/overview)[

Prompting Guide

Best practices for prompting Octave for voice creation and voice modulation.







](https://dev.hume.ai/docs/text-to-speech-tts/prompting)[

Acting Instructions

Guide to controlling voice expression in Octave TTS.







](https://dev.hume.ai/docs/text-to-speech-tts/acting-instructions)

# Voice Design

Copy page

A guide to designing expressive, natural-sounding voices using Octave, Hume’s speech-language model.

[Octave](https://www.hume.ai/blog/octave-the-first-text-to-speech-model-that-understands-what-its-saying) enables you to design custom voices using intuitive, descriptive prompts. This guide explains how voice design works, shares best practices for writing effective prompts, and demonstrates how to create reusable voices in the Platform UI and API.

Octave 1 must be specified to use voice design. Voices designed with Octave 1 are compatible with Octave 2 requests. Multilingual voice design for Octave 2 will be available soon.

## How voice design works

Designing a voice with Octave involves guiding the model with both what kind of voice to generate and what that voice should say. These two inputs work together to produce expressive, character-consistent speech:

1. **Voice prompt (description)**: A natural-language prompt describing how the speaker should sound. This includes tone, personality, emotion, and context. The prompt sets the foundation for the voice’s identity.
2. **Input text**: A sample line that fits naturally with the character’s voice and identity. It gives the model a reference for delivery—helping it match tone, pacing, and emotional nuance to the prompt.

**Octave uses both inputs holistically.** It doesn’t treat the prompt as a set of isolated traits—it interprets it in full context, just as a human would when imagining a speaker. The model then generates speech that reflects not just the words, but the personality behind them.

**This allows for a wide range of voices**: warm and professional, anxious and fast-paced, playful and sarcastic—even when the text stays the same. You can iterate quickly: revise your prompt, try alternate lines of text, and fine-tune the result by pairing tone, identity, and delivery.

In the next section, we’ll explore practical techniques for crafting clear, expressive voice prompts that lead to more natural, accurate results.

## Crafting voice prompts

**Octave understands language in context.** The more clearly you describe who’s speaking and how they should sound, the more naturally the model will bring your voice to life.

1. **Character and setting**: Octave produces more expressive, natural speech when it understands:
    
    - **Voice identity**: _personality, tone, emotional quality_
    - **How they speak**: _pace, clarity, intensity_
    - **What context they’re in**: _setting, role, or intent_
2. **Voice profile**: When writing a prompt, consider including details like:
    
    - **Tone**: _“serious”, “playful”, “melancholic”_
    - **Speaking style**: _“clear”, “fast-paced”, “informal”_
    - **Emotion or attitude**: _“cheerful”, “anxious”, “skeptical”_
3. **Formatting**: Use standard formatting conventions to help Octave interpret your input clearly. This improves how it handles phrasing, structure, and delivery cues:
    
    - **Use standard punctuation** to support your intended phrasing, structure, and tone.
    - **Avoid non-speech markup or symbols**, such as emojis, HTML tags, or Markdown formatting.
    - **Keep formatting clean and readable**, reflecting how the sentence would be spoken aloud.

**Below are a few sample voice prompts** crafted by the Hume team.

###### Valley Girl

###### Hype Man

###### Pirate Captain

Valley Girl

|   |
|---|
|The speaker has an expressive, totally disgusted Valley Girl voice, with|
|a heavy Californian accent, delivering each word with maximum disdain,|
|like a lifestyle influencer reacting to a truly tragic fashion faux pas.|

## Create a custom voice

Once you’ve created a generation that captures the voice you want, you can save it as a **custom voice**. This stores both the speech and the prompt that shaped it, so the model can reliably reproduce the same vocal identity in future requests.

**You can create and save voices using:**

- [The Platform UI](https://dev.hume.ai/docs/voice/voice-design#using-the-ui) – great for interactive exploration and refinement.
- [The API](https://dev.hume.ai/docs/voice/voice-design#using-the-api) – ideal for programmatic use cases, such as letting end users design and save voices in your application.

### Using the UI

This section walks through the voice creation flow in the Platform UI, from generating samples to saving your voice.

[1](https://dev.hume.ai/docs/voice/voice-design#step)

#### Navigate to the Voice Design page

Visit the Platform’s [Voice design page](https://app.hume.ai/voice-design).

![Voice design page](https://files.buildwithfern.com/hume.docs.buildwithfern.com/124f01233abf4d985e747d420b930bc0ece9d5ee9f9a815975eebc58e5d9de83/docs/pages/documentation/voice/voice-design/img/1-voice-design-page.png)

[2](https://dev.hume.ai/docs/voice/voice-design#step-1)

#### Input Text and Voice Prompt

Enter your **Text** and **Voice prompt**.

Use **Enhance** to improve your inputs, or **Auto-generate** to get help crafting them.

![Voice design text and prompt](https://files.buildwithfern.com/hume.docs.buildwithfern.com/4eccb1f327fd44dbeea051d88d81032db22e6113058d5d9bae1307a9807d4cbe/docs/pages/documentation/voice/voice-design/img/2-input-text-and-prompt.png)

[3](https://dev.hume.ai/docs/voice/voice-design#step-2)

#### Generate samples

Click **Generate samples** to create three voice candidates based on your inputs.

Preview each and choose your favorite. You can keep generating new sets of samples until you find one you like.

![Voice design samples](https://files.buildwithfern.com/hume.docs.buildwithfern.com/2e98540e332842336606116ff98d87132dccecdba6318d6682b0682b160827d6/docs/pages/documentation/voice/voice-design/img/3-listen-to-samples.png)

[4](https://dev.hume.ai/docs/voice/voice-design#step-3)

#### Name your voice

Enter a **Name** for your voice.

Optionally provide a **Description** for your reference.

![Voice design modal named voice](https://files.buildwithfern.com/hume.docs.buildwithfern.com/e4b6f24d4ffe1ada692b6e3a6b23ec69aebab1fc46e3ce6a4390e0ae0ddbf2b9/docs/pages/documentation/voice/voice-design/img/4-name-the-voice.png)

[5](https://dev.hume.ai/docs/voice/voice-design#step-4)

#### Save your voice

Click **Save voice** to complete the creation flow. You’ll be redirected to the **My Voices** tab.

![My voices page](https://files.buildwithfern.com/hume.docs.buildwithfern.com/b4ca57bf9c4910eb2faf266c2817909950906f1dee992cc6651c5fe12491830b/docs/pages/documentation/voice/voice-design/img/5-custom-voices-page.png)

### Using the API

This section walks through the voice creation API flow: generating speech in a new voice and saving that generation as a reusable voice.

[1](https://dev.hume.ai/docs/voice/voice-design#step-5)

#### Generate a voice

**Generate a new voice by making a POST request to [/v0/tts](https://dev.hume.ai/reference/text-to-speech-tts/synthesize-json).**

In the [utterances](https://dev.hume.ai/reference/text-to-speech-tts/synthesize-json#request.body.utterances) field, include both a [description](https://dev.hume.ai/reference/text-to-speech-tts/synthesize-json#request.body.utterances.description) and [text](https://dev.hume.ai/reference/text-to-speech-tts/synthesize-json#request.body.utterances.text).

You can optionally request multiple generations to explore variations.

cURLPythonTypeScript

|   |
|---|
|curl https://api.hume.ai/v0/tts \|
|-H "X-Hume-Api-Key: $HUME_API_KEY" \|
|--json '{|
|"utterances": [{|
|"text": "Hume'"'"'s AI voice generator is insane, because you can tell it exactly how you want the voice to sound.",|
|"description": "The speaker has a confident, charismatic tone, like a tech guru explaining a new technology with infectious enthusiasm, and the excitement of a viral storyteller."|
|}],|
|"num_generations": 1|
|"version": "1"|
|}'|

The response includes one or more [generations](https://dev.hume.ai/reference/text-to-speech-tts/synthesize-json#response.body.generations), each with a `generation_id`, `audio`, and additional metadata.

**Listen to each generation** and choose the one you want to save. Use its `generation_id` in the next step to save it as a voice.

JSON

|   |
|---|
|{|
|"request_id": "553ce0cb-a958-48ce-befc-88fca6310a028583094",|
|"generations": [|
|{|
|"generation_id": "9e068547-5ba4-4c8e-8e03-69282a008f04",|
|"duration": 5.88,|
|"file_size": 94464,|
|"encoding": {|
|"format": "mp3",|
|"sample_rate": 48000|
|},|
|"audio": "//uUxAAAEM1rHUewycq...",|
|"snippets": [|
|[|
|{|
|"id": "9295d4ab-3c1a-489f-9f12-c81ea6c8585c",|
|"text": "Hume's AI voice generator is insane, because you can tell it exactly how you want the voice to sound.",|
|"generation_id": "9e068547-5ba4-4c8e-8e03-69282a008f04",|
|"utterance_index": 0,|
|"audio_format": "mp3",|
|"transcribed_text": "Hume's AI voice generator is insane, because you can tell it exactly how you want the voice to sound.",|
|"audio": "//uUxAAAAAAAAAAAAAA..."|
|}|
|]|
|]|
|}|
|]|
|}|

[2](https://dev.hume.ai/docs/voice/voice-design#step-6)

#### Save the voice

**Make a POST request to [/v0/tts/voices](https://dev.hume.ai/reference/voices/create) to save a generation as a reusable voice.**

Include the `generation_id` and a `name` for the new voice.

cURLPythonTypeScript

|   |
|---|
|curl https://api.hume.ai/v0/tts/voices \|
|-H "X-Hume-Api-Key: $HUME_API_KEY" \|
|--json '{|
|"generation_id": "9e068547-5ba4-4c8e-8e03-69282a008f04",|
|"name": "My Custom Voice"|
|}'|

The response includes the `name` and `id` of your saved voice.

JSON

|   |
|---|
|{|
|"name": "My Custom Voice",|
|"id": "9e068547-5ba4-4c8e-8e03-69282a008f04",|
|"provider": "CUSTOM_VOICE"|
|}|

## What’s next

**You can use your custom voices across Hume products that support speech synthesis.** Reference them by name or ID in [TTS](https://dev.hume.ai/docs/text-to-speech-tts/overview) requests, or use them in [EVI](https://dev.hume.ai/docs/speech-to-speech-evi/overview) by specifying the voice in your configuration.

Use the playgrounds to preview how your saved voice sounds in different scenarios:

[

EVI Playground

Chat with an assistant configured with your saved voice, to see how your voice sounds in conversation.







](https://app.hume.ai/evi/playground)[

TTS Playground

See how your saved voice sounds with specific text input, or when given acting instructions.







](https://app.hume.ai/tts/playground)

If you’re building an interface for others to create voices, you may also want to offer basic voice management—such as listing saved voices or deleting those no longer needed:

[

Voice Management Guide

Learn how to view, rename, and delete saved voices using the API or Platform UI.







](https://dev.hume.ai/docs/voice/management)

See guides below for details on how to use your voice in your project or integration.

[

Empathic Voice Interface (EVI)

Configure EVI to use your saved voice.







](https://dev.hume.ai/docs/speech-to-speech-evi/configuration/voices)[

Text-to-Speech (TTS)

Specify a saved voice in your TTS requests.







](https://dev.hume.ai/docs/text-to-speech-tts/voices)

---

Was this page helpful?

YesNo

[Previous](https://dev.hume.ai/docs/voice/overview)[

#### Voice Cloning

Create custom voice clones from speech using Octave, either by recording your voice or uploading a sample.

Next](https://dev.hume.ai/docs/voice/voice-cloning)

[Built with](https://buildwithfern.com/?utm_campaign=buildWith&utm_medium=docs&utm_source=dev.hume.ai)