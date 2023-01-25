export interface ActivityDT {
    _id?: string;
    activityType: string;
    date: Date;
    attendees: string[];
    placeId: number & string;
    hasBeenChecked: boolean;
}
