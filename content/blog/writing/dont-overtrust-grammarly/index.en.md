---
title: "Dont' Overtrust Grammarly"
date: 2023-06-29T13:48:25+08:00
lang: en
summary: >
    Grammarly should be a very familiar tool to a lot of paper-writers.
    Although it does improve our writing to some extent,
    recently I realize that its accuracy is not that ideal
    after an in-depth experience of authoring academic papers.
    Here lists some of the false alarms that make Grammarly annoyed and annoying.
tags:
    - latex
    - grammarly
---

Grammarly should be a very familiar tool to a lot of paper-writers.
Although it does improve our writing to some extent,
recently I realize that its accuracy is not that ideal
after an in-depth experience of authoring academic papers.
I often reject almost half of its red suggestions it provides.
(And the red suggestions are those Grammarly thinks are *erroneous*)
Here lists some of the false alarms that make Grammarly annoyed and annoying.

## False Alarms

Even if a sentence only has one predicate, using different subjects in different clauses can trigger alarms.
> The design is illustrated in Figure 1, each feature elaborated below.

For this sentence, Grammarly will first suggest users change ", each" into ". Each" (or "; each", ", and each").
When users accept this suggestion,
it will realize that this new sentence doesn't have a predicate,
and suggest users to change it into "Each feature **is**".

When a compound word has several common versions with or without a hyphen,
Grammarly will stick to one specific version (often with a hyphen) no matter what.
> The data is collected in real time.

Here I deliberately ignore the hyphen between "real" and "time",
as I prefer "real-time" as an independent adverb and "in real time" as an adverb phrase (because "in" is a preposition to be followed by a noun).
But Grammarly will prefer "real-time" over "real time" at every occurrence.

More interestingly, if I use "in real-time" here,
another grammar checking tool *LanguageTool* will report an error and prefer "in real time".

## Too Much Emphasis on Conciseness

When Grammarly gives too much emphasis on conciseness,
it will sometimes replace a phrase with another one with a close meaning in some contexts,
but it may not fit the current context.
> The AR design should be in accordance with the geographical semantics and physical appearances of the real-world elements.

Grammarly dislikes the wordy "in accordance with", and suggests users use "by", "following", "per", or "under".
But none of these options seems like a good substitution,
and it just cannot realize that "consistent with" is a better fit.
For example, "should be following" is not even as good as simply "should follow";
and it is more reasonable to say: "The designers [of the AR experience] should follow...", instead of "The AR design should follow".

Conciseness also leads to repetitive word choices (which is another problem that Grammarly tries to solve). For example:
> Users can take part in the game by...
>
> It can help improve users' physical and mental health, as well as provide a more engaging experience.

In the first sentence, Grammarly will unconditionally suggest users substitute "take part" with "participate",
even if I have used "participate" many times in my writing.
In the second sentence, it will replace ", as well as " with "and". But I like to use "as well as" to not only avoid repetitive use of "and", but also avoid different roles of "and" in one sentence (e.g., when one "and" connects two objects and another "and" connects two clauses).

## Penalty on insertion

> However, most research studies the more popular live-streaming genres, e.g., gaming and life-sharing.
> Cultural live streaming, despite its growing popularity, is relatively new and understudied.

Grammarly will put the "despite xxx" in the second sentence to the sentence beginning.
But the object that "despite" refers to will become unclear.
If it is put at the sentence beginning,
readers may think that it refers to "[Despite] the more popular (gaming and life-sharing) live streaming",
until they progress to the end of the second sentence and realize that it refers to "[Despite] Cultural live streaming".
It is not suitable to put this "despite" and the end of the sentence either,
because my coming paragraph talks more about its novelty and the state of underexploration.
But such an insertion of adverb phrase in the middle easily irritates Grammarly.

## Inconsistent Attitudes Towards Punctuation Usages

In some cases, Grammarly is tolerant of suboptimal punctuation usages.
For example, when users mix up straight quotation marks and curly quotation marks,
Grammarly says both are fine as long as consistency is maintained.
It will prompt users for one style and globally replace the other variant.
However, curly quotation marks should be the ultimate answer,
while straight quotation marks are only invented in the early days of typesetting tools as a technically simpler alternative.
Convertion to curly quotation marks are enabled in many modern tools like MS Word and macOS built-in IME.
Late versions of LaTeX also tries to render straight quotation marks in the source code as appropriate curly variants.
Therefore, to me, Grammarly appears to be too tolerate of this issue as a grammar checking tool.
It could have enfored curly quotation marks replacement instead of an additional prompt.

But sometimes Grammarly is also too strict about punctuations,
especially when it comes to commas.
When an "and" connects two objects, two phrases,
or anything other than two complete clauses,
Grammarly forbids a comma before this "and".
But if we click to expand the "Learn More" section of this error message,
sometimes it actually says "It is OK to add a comma from time to time,
as it can help users find the right place to pause within the sentence."

## Some Strange Thesauri Suggestions

Below are some thesaurus suggestions provided by Grammarly but look strange to me.

* completely -> wholly; but the latter seems rarely used.
* huge -> vast, substantial; but I want to describe physical sizes.
* randomness -> randomnesses

## All in all...

Never trust English writing suggestions from a Ukrainian company straight away.
But it is always good to have a second look at the sentence when an alarm is triggered:
is it too complex to be understood? Do I need to split it into several shorter sentences?
In China, one of the most common systematic training sessions of English writing is throughout our high school in preparation for the collage entrance exam.
At that time, we are taught complex English syntax
and we are encouraged to use them in exams to demonstrate our capability.
Also, due to the different logic behind Chinese and English languages,
we often form sentences in our minds using the Chinese logic,
and then realize that the next part of the sentence is normally placed at former locations in English.
This may result in excessive use of embedded clauses as well.
It is only after I am exposed to the environment of English academic writing that I realize the equal importance of being concise.
