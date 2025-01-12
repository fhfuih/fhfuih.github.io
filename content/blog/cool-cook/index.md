---
title: "Cool Cook – HKUST COMP4461 Project"
date: 2020-11-02T21:11:35+08:00
draft: false
categories:
  - HCI
  - coursework
featured_image: coolcook.jpg
summary: "This article is also an assigned self-reflection on HCI course project (COMP4461) at HKUST. A chatbot prototype that guides you through a cooking workflow that makes the most sense."
---

This article is also an assigned self-reflection on HCI course project (COMP4461) at HKUST.

A chatbot prototype that guides you through a cooking workflow that makes the most sense.

{{< figure src="coolcook.jpg" alt="Cool Cook Artwork" >}}

## Project Info

This is the second project of COMP4461: Human-Computer Interaction at the Hong Kong University of Science and Technology. For this project, we were required to prototype a chatbot about "online communication", with comprehensive design thinking process. We worked as a group of six people and proposed this chatbot prototype as a step-by-step cooking tutor that provides timely responds.

## Introduction

"How to cook some dishes?" Searching this question online will give you a huge number of answers in various forms
from words-and-pictures to videos. But are they truly helpful once we pick up the spatula and turn on the fire?
At least for newbies, it is easy to get nervous hearing the buzzing of the oven, and forget about everything.
That's why a more user-friendly form of cooking tutorials is needed. Hence, we have designed Cool Cook,
a chatbot that assist the user in cooking an entire meal from the choosing of dishes to buying the ingredients
and to instruct the user to cook correctly step-by-step. During the instruction, the chatbot will take the time needed
for each step of each dish into account, and help the user cook all the dishes in parallel in an elegant arrangement.

## Emphasis

### Study of existing solutions

#### Cookbooks

A cookbook is the most traditional and reliable collection of recipes. However, it's content is fixed,
and it lacks portability.

#### Videos

A cooking video is easy to find on online video platforms. However, we have noted that most of the videos are intended
for the audience to appreciate the cooking process rather than to learn themselves. These videos are more elaborated in
the shooting techniques and the artistic expressions rather than the comprehensiveness of the information.

Plus, the elderly are less familiar with online video platforms.

### Interviews

To locate the problems the cooking newbies face when following the online tutorials, we have conducted several
interviews. Below are the pain points our interviewees have raised up during the interviews.

1. They find it hard to organize the time when they need to cook several dishes at the same time.
And this is a common case when they need to prepare for an entire meal.
2. Details are more or less omitted in many tutorials, depending on how professional the authors are.
Newbies may struggle when they are instructed to add "a proper amount of" some ingredients.
This situation is especially common when cooking Chinese dishes.
3. It is hard to memorize all the steps at once. And constantly checking the tutorials during cooking is time consuming
and troublesome.

## Interpretation

### POV Model

We have developed two personas for our Point-Of-View model.

{{< figure src="pov.png" alt="POV" >}}

### HTA Framework

We have then constructed an Hierarchical Task Analysis framework that describes the goals and sub-goals required in our solution.

{{< figure src="hta.png" alt="HTA" >}}

## Ideation

We have drafted a mind map during a brainstorm session to gather and analyse our ideas.

{{< figure src="mindmap.png" alt="Mind Map" >}}

## Verification

### Storyboard

We have drawn a storyboard to illustrate our solution and the pain point we want to solve.

Two major functions are shown: the chatbot provides **step-by-step cooking instructions**,
and it can **answer questions during the cooking session** at any step.

{{< figure src="storyboard.png" alt="Storyboard" >}}

## Prototype

### Video Prototype

{{< youtube cl86WZcvbp0 >}}

### Interactive Prototype

The interactive prototype is built using JavaScript and the [BotKit library](https://botkit.ai/).
A complete sample is hosted on Glitch [here](https://comp4461-hvc-cool-cook.glitch.me/).
The source code can be found on GitHub [here](https://github.com/fhfuih/cool-cook).
Below are some screenshots of the interactive prototype.

{{< figure src="prototype1.png" alt="Screenshots of the interactive prototype" >}}
{{< figure src="prototype2.png" alt="Screenshots of the interactive prototype" >}}

### Speed Dating & Follow-ups

We have shown the video prototype to the previous interviewees.
They are satisfied by the QA feature during the instructions,
and how the chatbot smartly help them organize the time and steps.
They have listed more ideas as enhancements of the functionality.

1. Voice input to make the interactions more convenient.
2. A preview of all the steps before starting the actual cooking session to inform the user of the complexity.
3. Smarter recommends of the dishes provided available ingredients at home.

## Personal Reflections

I mainly work on the interactive prototype this time, thanks to my familiarity with the JavaScript programming skills and the [Glitch](https://glitch.com/) platform. Unlike our previous project, this interactive prototype calls for higher fidelity. Therefore, it is important to fix more design details during the previous steps. Whenever a problem is noted during the programming, I need to promptly and iteratively communicate with others to come up with a solution. This project makes me realize the potential gap between an idea and its actual implementation. Thus, it is always beneficial to care about the design details at the beginning.
