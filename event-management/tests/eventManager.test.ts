// @ts-nocheck

import { EventManager } from "../src/services/eventManager";
import { TrainingEvent } from "../src/models/event";
import { Participant } from "../src/models/participant";
import { Category, ProcessInfo } from "../src/models/category";

describe("EventManager", () => {
  test("addEvent hozzáadja az eseményt", () => {
    const manager = new EventManager();

    const ev: TrainingEvent = {
      id: 1,
      name: "Test",
      location: "Bp",
      dateTime: new Date(),
      category: Category.Process,              
      categoryInfo: new ProcessInfo("ASPICE"),
      participants: []
    };

    manager.addEvent(ev);

    expect(manager.listEvents().length).toBe(1);
  });

  test("registerParticipantToEvent regisztrál", () => {
    const manager = new EventManager();

    const ev: TrainingEvent = {
      id: 1,
      name: "Test",
      location: "Bp",
      dateTime: new Date(),
      category: Category.Process,
      categoryInfo: new ProcessInfo("ASPICE"),
      participants: []
    };

    const p: Participant = { id: 1, name: "Anna", email: "anna@example.com" };

    manager.addEvent(ev);
    manager.addParticipant(p);

    manager.registerParticipantToEvent(1, 1);

    expect(manager.listRegisteredParticipants(1).length).toBe(1);
  });
});
