import * as moment from "moment";
import { IDiaryActivity } from "./diaryActivity.model";
import { IRating } from "./rating.model";


export interface IDiaryEntry {
    date: any;
    activities: IDiaryActivity[];
    spoonsAvailable: number;
    spoonsUsed:number
    spoonsBorrowed:number;
    mood?:IRating[];
    pain?:IRating[];
    notes?: string[];
    }