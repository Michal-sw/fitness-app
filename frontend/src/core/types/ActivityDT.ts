export interface ActivityDT {
  _id: string;
  activityType: string;
  description?: string;
  date: Date;
  attendees: { _id: string; login: string }[];
  placeId: number & string;
  hasBeenChecked: boolean;
}
