import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor( private afs: AngularFirestore) { }

  async add(collectionName: string, data: any, id?: string): Promise<string>{
    const uid = id ? id : this.afs.createId();
    data.id = uid;
    await this.afs.collection(collectionName).doc(uid).set(data);
    return uid;
  }

  getById(collectionName: string, id: string): Observable<any>{
    return this.afs.collection(collectionName).doc(id).valueChanges();
  }

  getPagesByProject(project: string): Observable<any>{
    return this.afs.collection('Pages', ref => ref.where('project', '==', project)).valueChanges();
  }

  update(collectionName: string, id: string, data: any){
    this.afs.collection(collectionName).doc(id).update(data);
  }

  delete(collectionName: string, id: string){
    return this.afs.collection(collectionName).doc(id).delete();
  }

  getCommentsByPage(pageID: string): Observable<any>{
    return this.afs.collection('Comments', ref => ref.where('pageID', '==', pageID)).valueChanges();
  }
}
