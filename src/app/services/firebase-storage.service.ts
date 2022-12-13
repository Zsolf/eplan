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

  async upload(data: any) {
    await this.fireStorage.upload("/Documents/", data);
  }

  delete(id: string) {
    this.fireStorage.ref("/Documents/" + id).delete();
  }

}
