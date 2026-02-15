# Training Event Management System (TypeScript)

## Overview

This project is an **OOP-based Training Event Management System** built with **TypeScript**.
It demonstrates clean architecture, strong typing, and modern TypeScript patterns such as:

* Map-based data storage
* Interfaces and enums
* Generics
* Type guards
* Separation of models and services

The system allows managing corporate training events, participants, and registrations with category-based filtering.

---

## Features

* Create, update, and delete training events (CRUD)
* Register and remove participants
* Categorize events (process, tools, method)
* Query events by category
* List participants per event
* Find events by participant
* Map-based O(1) lookups
* Generic registration management

---

### Components

* **Models** – data structures (Event, Participant, Category)
* **Services** – business logic (EventManager, RegistrationManager)
* **Utils** – runtime validation (type guards)

---

## Project Structure

```
src/
├── index.ts
├── models/
│   ├── category.ts
│   ├── event.ts
│   └── participant.ts
├── services/
│   ├── eventManager.ts
│   └── registrationManager.ts
└── utils/
    └── typeGuards.ts
```

---

## How Registration Works

Example flow:

```ts
manager.registerParticipantToEvent(eventId, participantId);
```

Steps:

1. Fetch event from Map
2. Fetch participant from Map
3. Validate with type guards
4. Get RegistrationManager for the event
5. Add participant
6. Sync participants list in the event

This ensures both:

* Fast lookup
* Requirement-compliant participant storage

---

## Example Usage

```ts
manager.addEvent(event);
manager.addParticipant(user);

manager.registerParticipantToEvent(1, 1);

const processEvents = manager.listEventsByCategory(Category.Process);
```

---

## License

Educational use only.

---

## Author

Prepared as part of a TypeScript OOP exam project by Bernadett Ungvary-Major
