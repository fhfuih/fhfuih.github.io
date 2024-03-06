---
title: "V Gather – HKUST COMP4461 Project"
date: 2020-11-19T09:18:25+08:00
draft: false
lang: en
categories:
  - HCI
  - coursework
featured_image: v-gather.jpg
summary: "This article is also an assigned self-reflection on HCI course project (COMP4461) at HKUST. A social VR product prototype that kindles ice-breaking events with liveliness."
---

This article is also an assigned self-reflection on HCI course project (COMP4461) at HKUST.

A social VR product prototype that kindles ice-breaking events with liveliness.

{{< figure src="v-gather.jpg" alt="V Gather Artwork" >}}

## Project Info

This is the third project of COMP4461: Human-Computer Interaction at the Hong Kong University of Science and Technology. Previously in this course, we are required to [Mozilla Hubs](https://hubs.mozilla.com/) to hold meetings for all of our course projects. And for this project, we are assigned the theme of Social VR. We need to reflect on our experiences with Mozilla Hubs and focus on one of the three topics:

1. Improving Social VR experiences for future group collaborations
2. Designing Social VR experiences for some other future scenario
3. Proposing a better alternative solution to Social VR for a given scenario

Looking at the third topic, we end up with V Gather, our Social VR solution for online ice-breaking and gathering events that maximizes liveliness and minimize awkwardness.

## Qualitative Analysis

We conducted qualitative analysis to find out the pros and cons of the general functionalities of Mozilla Hubs and its feasibility in different scenarios. 

### Heuristic Test

We have concluded a lot of pros and cons of the functionalities of Mozilla Hubs via heuristic tests. Below is an extract.

* User Interface
  * 😄Internal consistency among the icon buttons in the toolbar.
  * 😄Intuitive visual implications of the button icons.
  * External inconsistency in the screen sharing icon compared to other products.
  * 😥No labels for button icons unless the mouse is pointed at them. This introduces difficulty in interpreting the meanings of the icon.
* Features
  * 😄The countdown of the camera.
  * 😥No assistance in placing objects.
  * 😥Cannot batch-edit objects in the room.
  * 😥Poor server quality, characters and objects not showing over bad Internet and no messages shown for such errors.
  * 😥Poor pen tool experience
* Support 
  * 😄Documentation to help beginners.
  * 😥No FAQ to solve ad-hoc problems.

{{< figure src="heuristic-test.png" alt="Heuristic Test Result" >}}

### Usability Test

We conducted usability tests to see the capability of Mozilla Hubs to support group collaborations and meetings, especially concerning our COMP4461 course projects. The usability follows the design and process below.

Task Design:
- Goal: To discuss and hopefully come up with available ideas for course projects in COMP4461.
- Look for: How well does the brainstorming task flow work?
- Context of use: The users are expected to be under pressure as the timeline is short, non-interrupted as they are having the meeting. They are also expected to be at home with available microphone and speaker to interact in the task.

Evaluation Metrics:
- Realization: What does the users want to do during the brainstorm, and whether the users identify relevant function to satisfy such needs?
- Issue: Identify issue and its severity, if any.
- Self-reported feedback on user experiences

Recording method:
- Video recording

Users:
- Target user profile: Users that expect Mozilla Hub as a place for virtual meeting to discuss issues and conduct brainstorming.
- Who: 5 college students from HKUST, with age from 19 to 22. They would discuss about the course project ideation in the Hub, which is expected to be a match for the target user.

Experiment findings:
- Users encounter severe Internet connection issue during the experiment. The majority of the users spent over 15 minutes simply for entering the room. Some teammates can’t hear other voices with no hardware and software problem in their own devices. 
- Users attempted to communicate with each other to start the meeting, but the aforementioned problem hindered meeting from getting started.
- The imitated effect of distance to voice volume interrupted the meeting for several times because members can’t hear each other clearly.
- Users attempted to share notes but found no available effective functions in the Hub. Pen function is impracticable for taking notes.
- Users were not aware of the screen sharing supported in the Hub.

Feedback:
- The overall experience is negative due to Internet issues and poor function realization.
- There are no outstanding and irreplaceable functions found for holding brainstorming session in Mozilla Hub.
- The advantage of imitating real-life interaction is not utilized in this scenario.


### Choice of our topic

We want to design a Social VR product for online informal gatherings such as ice-breaking sessions. We see the huge potential of Social VR in mitigating the awkwardness of "Zoom gatherings" by putting characters in a simulated environment instead of grid view panels. VR rooms also allows for private conversations an richer means of communication, which is perfectly suitable for gatherings events.

## Ideation

### POV Model

We constructed two POV models. The first one is a college freshman who need to familiarize herself with the communities and the campus.

{{< figure src="persona1.jpg" alt="Persona: college freshman.jpg" >}}

The second one is a product manager who need to organize online gatherings and have people socialize and build a strong team spirit.

{{< figure src="persona2.jpg" alt="Persona: product manager.jpg" >}}

### Brainstorming

According to the two POV models and the problems these two personas face, we conducted a brainstorm session to discover the solutions and the features in detail.

{{< figure src="mindmap.png" alt="Brainstorm Mind Map" >}}

### Storyboard

Below is a storyboard we drew, where a team leader succeeded in familiarizing the team members with each other using the product we design.

{{< figure src="storyboard.jpg" alt="Storyboard" >}}

### Finalizing Design

We eventually came up with our design of V Gather to solve the problems in online ice-breaking events. The participants can customize their appearance in the room, and we also empathize on three main features to make it capable. 

The first is the *speech feature*. The host can invite participants to a designated room and deliver a speech, e.g. an opening speech. The room consists of a set-up stage and audience seats, and enables real-time interactions. 

The second is the *chit-chat feature*. The participants can take a step closer to each other and have private conversations with facial expressions and body languages. The facial expression and body languages will be detected via face recognition cameras and Kinect cameras.

The third feature is *ice-breaking games support*. Participants can join in various ice-breakings games to have a more enjoyable experience.

### Speed Dating

After viewing our design, the interviewees expressed their interest in both the customization of the appearance and our additional features. They believed the imitation of the real world environments greatly attracts them to use the platform for future gatherings.

The interviewees also pointed out something we can improve. A third person's view can be added to have the participants more aware of of their own characters. Voice adjustments are also useful for some participants. The gaming part can be further polished, for different people may want games of different topics and difficulties.

## Video Prototype

{{< youtube 1Vcpl_dP3iU >}}

## Personal Reflections

Personally, I have taken part in the ideation stage and the in-class presentation, including making the slides. It is inspiring to have collected all the parts of the work done by our group mates and sort them out. Since we are required to use Mozilla Hubs to hold group meetings for the entire semester, it is quite easy for us to conduct heuristic studies and propose many ideas at the beginning. (Of course we also swore a lot about the bad experience of the Hubs LOL.) We realized that it is important to analyze the core and irreplaceable features of a product before we target to, or use it in, a specific scenario. Up till today, VR is not the solution to everything, but its huge potential is undeniable. Therefore, we have gone through careful discussions on how the attributes of VR technology can benefit an online gathering event, and such a thinking process is very important in designing a product.
