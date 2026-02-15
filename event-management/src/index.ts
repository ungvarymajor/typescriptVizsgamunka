import { EventManager } from "./services/eventManager";
import { TrainingEvent } from "./models/event";
import { Participant } from "./models/participant";
import { Category, ProcessInfo, ToolsInfo, MethodInfo } from "./models/category";

const manager = new EventManager();

// Events
const ev1: TrainingEvent = {
  id: 1,
  name: "ASPICE Process Basics",
  location: "Budapest",
  dateTime: new Date("2026-03-10T09:00:00"),
  category: Category.Process,
  categoryInfo: new ProcessInfo("ASPICE"),
  participants: []
};

const ev2: TrainingEvent = {
  id: 2,
  name: "Jira Tools Workshop",
  location: "Veszprém",
  dateTime: new Date("2026-03-12T10:00:00"),
  category: Category.Tools,
  categoryInfo: new ToolsInfo("Jira"),
  participants: []
};

const ev3: TrainingEvent = {
  id: 3,
  name: "Agile Methods Training",
  location: "Online",
  dateTime: new Date("2026-03-15T13:00:00"),
  category: Category.Method,
  categoryInfo: new MethodInfo("Scrum"),
  participants: []
};

manager.addEvent(ev1);
manager.addEvent(ev2);
manager.addEvent(ev3);

// Participants
const p1: Participant = { id: 1, name: "Kiss Anna", email: "anna@example.com" };
manager.addParticipant(p1);

manager.registerParticipantToEvent(1, 1);

// ENUM based filter
console.log("Process kategória eventek:");
manager.listEventsByCategory(Category.Process)
  .forEach(e => console.log(`- ${e.name}`));

// Using legacy
console.log("Extra metaadat:");
console.log(ev1.categoryInfo);
