// @ts-ignore
import firebase from 'firebase/compat/app';
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
  profileImageUrl?: String;
  tshirtSize?: string;
  isTeamLeader?: boolean;
  teamLeader?: string;
  isPhysicalCurrent?: boolean;
  physicalExpiryDate?: Timestamp;
  bio?: string;
  notes?: string;
  activeSeasons?: [];
}
