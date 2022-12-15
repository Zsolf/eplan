import { Injectable, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private fireStorage: AngularFireStorage) {
  }

  fileUrl: any;
  usersAvatar: { id: string, avatar: string }[]
  currenUserAvatar: string;

  async upload(data: any, projectId:string, pageId:string) {
    await this.fireStorage.upload("/Documents/"+projectId+'/'+pageId, data);
  }

  delete(projectId:string, pageId:string) {
    this.fireStorage.ref("/Documents/"+projectId+'/'+pageId).delete();
  }

  getFile(projectId:string, pageId:string): Observable<any>{

    return this.fireStorage.ref("/Documents/"+projectId+'/'+pageId).getDownloadURL();
  }

}
