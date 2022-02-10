import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface Result {
  meetScheduleId: string,
  meetName: string,
  hostSchool: string,
  meetDate: Timestamp,
  timeInSeconds: number,
  minutes: number,
  seconds: number
  distance: number
  pace: string
}
