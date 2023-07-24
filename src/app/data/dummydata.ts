import * as moment from "moment";
import { IDiaryEntry } from "../models/diaryEntry.model";

export const DummyData : IDiaryEntry = {
    date: moment(),
    mood:[
     {period:'morning',rating:5},
     {period:'afternoon',rating:3}   
    ],
    pain:[
        {period:'morning',rating:5},
        {period:'afternoon',rating:3}  
    ],
    activities: [
      { activity: { name: 'Reading', spoonCost: 2 }, isCompleted: false },
      { activity: { name: 'Go to work', spoonCost: 3 }, isCompleted: false },
      { activity: { name: 'Walking', spoonCost: 3 }, isCompleted: false },
      { activity: { name: 'Cooking', spoonCost: 4 }, isCompleted: false },
      { activity: { name: 'Extra', spoonCost: 4 }, isCompleted: false },
    ],
    spoonsAvailable: 12,
    spoonsUsed:0,
    spoonsBorrowed:0,
    notes: ['Had a good day overall!']
}