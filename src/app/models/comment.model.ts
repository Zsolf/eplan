import Firebase from "firebase";
type Timestamp = Firebase.firestore.Timestamp;

export interface Comment{
    id: string;
    author: string;
    comment: string
    createdAt: Timestamp;
    pageID: string;
}