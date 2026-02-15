// src/utils/typeGuard.ts

import { TrainingEvent } from "../models/event";
import { Participant } from "../models/participant";

export function isParticipant(value: unknown): value is Participant {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "email" in value
  );
}

export function isTrainingEvent(value: unknown): value is TrainingEvent {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "location" in value &&
    "dateTime" in value &&
    "category" in value &&
    "participants" in value
  );
}
