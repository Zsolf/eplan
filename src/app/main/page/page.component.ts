import {Component, DoCheck, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import { Comment } from '../../models/comment.model';
import Firebase from 'firebase';
import { IPage } from 'src/app/models/pagemodel';
import { FileUpload } from 'primeng/fileupload';
import { StorageService } from 'src/app/services/firebase-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import * as uuid from 'uuid';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']

})
export class PageComponent implements OnInit, DoCheck {
  fileUploadService: any;

  constructor(private fbService: FirebaseService, private stService: StorageService, public authservice: AuthService) {

  }


  pageId: string;
  comment: string;
  author: string;
  myComment: string;
  com: Comment
  comArray: Comment[];
  tf: IPage;
  uploadedFiles: any[]=[];

  ngOnInit(): void {
    this.myComment="";
    this.com={} as Comment;
    this.tf={id:""} as IPage;

    if (this.fbService.selectedPageId != '') {
      this.fbService.getById("Pages", this.fbService.selectedPageId).subscribe(result => {
        this.pageId = result.id;
        this.tf = result;
        this.getFile();
        this.fbService.getCommentsByPage(result.id).subscribe(res => {
          this.comArray = res;

        });
      });
    }

  }

  ngDoCheck(): void {
    if (this.fbService.selectedPageId != this.pageId){
      if(this.fbService.selectedPageId != '') {
        this.myComment = "";
        this.com = {} as Comment;
        this.tf = {id: ""} as IPage;
        this.fbService.getById("Pages", this.fbService.selectedPageId).subscribe(result => {
          this.pageId = result.id;
          this.tf = result;
          this.fbService.selectedProjectId = result.project;
          this.getFile();
          this.fbService.getCommentsByPage(result.id).subscribe(res => {
            this.comArray = res;
          });
        });
      }else {
        this.pageId = uuid.v4();
        this.fbService.selectedPageId = this.pageId;
        this.tf.project = this.fbService.selectedProjectId;
        this.tf.text = ''
        this.tf.hasFile= false;
        this.comArray = [];
        this.fbService.getCommentsByPage(this.pageId).subscribe(res => {
          this.comArray = res;

        });
      }
    }
  }

  sendComment(): void{
    console.log(this.myComment);
    this.com.id="";
    this.com.author=this.authservice.user.displayName;
    this.com.comment=this.myComment;
    this.com.pageID=this.pageId;
    this.com.createdAt= Firebase.firestore.Timestamp.fromDate(new Date);
    this.fbService.add("Comments",this.com);
    this.myComment="";

  }


  update(): void{
    if (this.pageId == ''){
      if (this.tf.text != undefined) {
        this.tf.text = this.tf.text.substring(3, this.tf.text.length - 4);
      }else{
        this.tf.text = '';
      }
      console.log(this.tf)
      this.tf.project = this.fbService.selectedProjectId;
      this.tf.hasFile = false;
      this.fbService.add("Pages", this.tf);
      this.fbService.selectedComponent = 'project';
    }else {
      if (this.tf.text != undefined) {
        this.tf.text = this.tf.text.substring(3, this.tf.text.length - 4);
      }else{
        this.tf.text = '';
      }
      this.fbService.add("Pages", this.tf, this.pageId);
      this.ngOnInit();
    }
  }



  onUpload(event, upload) {
    this.uploadedFiles=[];
    this.uploadedFiles.push(event.files[0]);
    this.tf.hasFile = true;
    this.tf.project = this.fbService.selectedProjectId;

    this.stService.upload(event.files[0], this.tf.project, this.pageId).then(r => {
      this.getFile();
    });
    upload.clear();
  }

  deleteComment(id: string): void{
    this.fbService.delete("Comments", id);

  }

  getFile(){
    this.uploadedFiles = [];
    if(this.tf.hasFile == true) {
      this.stService.getFile(this.tf.project, this.pageId).subscribe(result => {
        this.uploadedFiles = [];
        this.uploadedFiles.push(result);
      });
    }

  }

  deleteFile(){
    this.stService.delete(this.tf.project, this.pageId)
    this.uploadedFiles=[];
    this.tf.hasFile = false;
  }

  delete(){
    if (this.fbService.selectedPageId != '') {
      this.fbService.delete("Pages", this.pageId);
    }
    this.fbService.selectedComponent = '';
    this.fbService.selectedPageId = '';
    this.fbService.setRefresh();
  }

}
