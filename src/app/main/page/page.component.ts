import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import { Comment } from '../../models/comment.model';
import Firebase from 'firebase';
import { PageText } from 'src/app/models/pagemodel';
import { FileUpload } from 'primeng/fileupload';
import { StorageService } from 'src/app/services/firebase-storage.service'; 
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']

})
export class PageComponent implements OnInit {
  fileUploadService: any;

  constructor(private fbService: FirebaseService, private stService: StorageService, private authservice:AuthService) { 

  }


  pageId: string;
  comment: string;
  author: string;
  myComment: string;
  com: Comment
  comArray: Comment[];
  tf: PageText;
  uploadedFiles: any[]=[];
  
  ngOnInit(): void {
    this.myComment="";
    this.com={} as Comment;
    this.tf={id:""} as PageText;

   
    this.fbService.getPagesByProject('2').subscribe(result => {
      this.pageId=result[0].id;
      this.tf=result[0];
      this.getFile();
      this.fbService.getCommentsByPage(result[0].id).subscribe(res =>{
       this.comArray=res;

      });

    });

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
    this.tf.project="";
    this.tf.text=this.tf.text.substring(3, this.tf.text.length-4);
    this.fbService.add("Pages", this.tf);
  }



  onUpload(event, upload) {
    this.uploadedFiles=[];
    this.uploadedFiles.push(event.files[0]);
    this.stService.upload(event.files[0],"2",this.pageId).then(r=> {
      this.getFile();
    });
    upload.clear();
  }

  deleteComment(id: string): void{
    console.log(id);
    this.fbService.delete("Comments", id);

  }

  getFile(){
    this.stService.getFile("2",this.pageId).subscribe(result => {
      this.uploadedFiles=[];
      this.uploadedFiles.push(result);
    });

  }

  deleteFile(){
    this.stService.delete("2",this.pageId)
    this.uploadedFiles=[];
  }

}
