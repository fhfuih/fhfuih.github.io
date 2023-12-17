---
title: "My Dream Elevator"
date: 2023-12-18T00:40:41+08:00
lang: en
tags:
- Elevator
---

It's said that every engineering-minded person will observe and imagine the elevator scheduling algorithm while waiting for the elevator. Especially when multiple elevators and buttons are interconnected and divided into odd-floor and even-floor, the problem becomes even more complex. At this point, this wandering thought process can perfectly help us pass the few minutes before the elevator arrives.

Until—

In the year I moved out of campus dormitory, I finally encountered my dream elevator, a system that controlled odd- and even-floor elevators with a strict logic that most residents couldn't understand. I thought this scheduling logic only existed in people's imagination. Never have I expected to encounter it in the real world and press its magic "up" button myself. It becomes more than reasonable to deserve a dedicated blog post.

The dream elevator is a Fujitec from Japan, deployed in the residential buildings of Metro City Phase II in Hong Kong. Each building has one odd-numbered elevator, one even-numbered elevator, and two full-floor elevators.

When a user presses the button for an even-numbered elevator on the G floor (the same applies to odd-numbered elevators), only the button for that even-numbered elevator lights up, but all elevators participate in the calculation. The nearest one will descend to pick up the user. That is to say, if the nearest one is a full-floor elevator, that one will come down, instead of the even-numbered elevator.

I can imagine the rationale behind. Since the user has made it clear that they want to go to an even-numbered floor, all elevators that can go to even-numbered floors should respond. The button light, however, serves a different purpose of reflecting the current status of the elevator. The information is especially useful for those who arrive at the elevator *later*. Since the elevator is processing an "even-numbered floor" request, and since it is traceable which elevators are descending, the full-floor elevators' light won't turn up. In case a user with an "odd-numbered floor" or "any floor" request arrives at the elevator later, they know that the system don't guarantee to cater to them currently. Therefore, they need to press additional buttons to ensure the elevator understands their request.

When a user presses the button for a full-floor elevator on the G floor, only that button lights up, and only the two full-floor elevators participate in the scheduling. The logic should be similar: since the user requests "any floor", the system can't assume whether they go to an odd or even-numbered floor, so the odd and even elevators won't participate in the scheduling, and their status lights won't light up either.

There are also some special logics when the elevator is running and arriving. If a full-floor elevator is currently heading to the G floor to serve an "even-numbered floor" request, and a user presses the full-floor elevator button again, no more elevator will descend. When that full-floor elevator arrives at the G floor, it will turn off all lights—including the full-floor, the odd-numbered, and the even-numbered elevator light, because this elevator can indeed meet all needs. Conversely, when an even or odd-numbered elevator arrives at the G floor, it will only turn off its own light but not the full-floor elevator light.

The only regret is that there are no "up" buttons on the residential floors. Nevertheless, adding more "up" buttons to the already complex logic would be a bit too exaggerated. Since one can only go down from the residential floors, the system uses the most straightforward scheduling mode: pressing any down button will light up all buttons, and all elevators will participate in the scheduling.

Logically speaking, this system is the closest to perfect — perhaps a piece of art. Unfortunately, due to the continuous aging population in Hong Kong, it is the grandpas and grandmas who use this perfectly rigorous system in this estate. They only want to know, when they press a button, why some elevators don't move and some lights don't light. Confrontation shall be expected: they end up smashing almost all the buttons out there.