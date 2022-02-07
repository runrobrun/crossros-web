// @ts-ignore
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface Athlete {
  id?: string;
  firstName: string;
  lastName: string;
  gender: string;
  gradYear: number;
  active?: boolean;
  primaryPhone?: string;
  secondaryPhone?: string;
  email?: string;
  uniformBottomSize?: string;
  uniformTopSize?: string;
  warmUpTopSize?: string;
  bagNumber?: number;
  profileUrl?: string;
  tshirtSize?: string;
  isTeamLeader?: boolean;
  teamLeader?: string;
  physicalCurrent?: boolean;
  physicalExpiryDate?: Timestamp;
  bio?: string;
  notes?: string;
}
