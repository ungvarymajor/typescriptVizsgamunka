// src/models/event.ts

import { Category, CategoryInfo } from "./category";
import { Participant } from "./participant";

export interface TrainingEvent {
  id: number;
  name: string;
  location: string;
  dateTime: Date;
  category: Category;
  categoryInfo?: CategoryInfo;
  participants: Participant[];
}