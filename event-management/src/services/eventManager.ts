//src/services/eventManager.ts

import { TrainingEvent } from "../models/event";
import { Participant } from "../models/participant";
import { Category } from "../models/category";
import { isParticipant, isTrainingEvent } from "../utils/typeGuards";
import { RegistrationManager } from "./registrationManager";
import { LogClass, LogMethod } from "../decorators/log";

@LogClass("EventManager")
export class EventManager {
  private events: Map<number, TrainingEvent> = new Map();
  private participants: Map<number, Participant> = new Map();

  // eventId -> RegistrationManager<Participant>
  private registrations: Map<number, RegistrationManager<Participant>> = new Map();

  // --- CRUD: Create ---
  @LogMethod("addEvent")
  addEvent(event: TrainingEvent): void {
    this.events.set(event.id, event);
    if (!this.registrations.has(event.id)) {
      this.registrations.set(event.id, new RegistrationManager<Participant>());
    }
  }

  // --- CRUD: Update (edit) ---
  updateEvent(
    eventId: number,
    patch: Partial<{ name: string; location: string; dateTime: Date; category: Category }>
  ): void {
    const ev = this.events.get(eventId);
    if (!isTrainingEvent(ev)) {
      console.log("Event not found");
      return;
    }

    this.events.set(eventId, {
      ...ev,
      name: patch.name ?? ev.name,
      location: patch.location ?? ev.location,
      dateTime: patch.dateTime ?? ev.dateTime,
      category: patch.category ?? ev.category
    });
  }

  // --- CRUD: Delete ---
  removeEvent(eventId: number): void {
    this.events.delete(eventId);
    this.registrations.delete(eventId);
  }

  // --- Queries ---
  listEvents(): TrainingEvent[] {
    return Array.from(this.events.values());
  }

  getEventById(eventId: number): TrainingEvent | undefined {
    return this.events.get(eventId);
  }

  // --- Grouping / Filtering --- 
  listEventsByCategory(category: Category): TrainingEvent[] {
    return Array.from(this.events.values()).filter(
      (ev) => ev.category === category
    );
  }

  // --- Register Participant ---
  addParticipant(participant: Participant): void {
    this.participants.set(participant.id, participant);
  }

  getParticipantDetails(participantId: number): Participant | undefined {
    return this.participants.get(participantId);
  }

  // registration (add participant / delete event)
  registerParticipantToEvent(eventId: number, participantId: number): void {
    const ev = this.events.get(eventId);
    const p = this.participants.get(participantId);

    if (!isTrainingEvent(ev) || !isParticipant(p)) {
      console.log("Cannot register: event or participant not found");
      return;
    }

    const reg = this.registrations.get(eventId);
    if (!reg) {
      console.log("Registration store not found for event");
      return;
    }

    if (reg.hasItem(p.id)) {
      console.log("Participant already registered");
      return;
    }

    reg.addItem(p);

    // sync participant list and event
    ev.participants.push(p);

    console.log(`Participant ${p.name} registered to event ${ev.name}`);
  }

  removeParticipantFromEvent(eventId: number, participantId: number): void {
    const ev = this.events.get(eventId);
    const reg = this.registrations.get(eventId);

    if (!isTrainingEvent(ev) || !reg) {
      console.log("Cannot remove: event not found");
      return;
    }

    if (!reg.hasItem(participantId)) {
      console.log("Participant was not registered");
      return;
    }

    reg.removeItem(participantId);

    // delete from event participant list
    ev.participants = ev.participants.filter((x) => x.id !== participantId);

    console.log("Participant removed from event");
  }

  listRegisteredParticipants(eventId: number): Participant[] {
    const reg = this.registrations.get(eventId);
    return reg ? reg.listItem() : [];
  }

  // find Event by Participant
  findEventsByParticipant(participantId: number): TrainingEvent[] {
    return Array.from(this.events.values()).filter((ev) =>
      ev.participants.some((p) => p.id === participantId)
    );
  }

// Async/await
async addEventAsync(event: TrainingEvent): Promise<void> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      this.addEvent(event);
      console.log("Async event added:", event.name);
    } catch (err) {
      console.error("Async error:", err);
      throw err;
    }
  }
}