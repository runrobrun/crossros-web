import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface Result {
  distanceInMiles: number;
  meetName: string;
  meetDateTime: Timestamp;
  place: number;
  season: number;
  meetId?: string;
  time: string;
  timeInSeconds: number;
  pace: string;
}
