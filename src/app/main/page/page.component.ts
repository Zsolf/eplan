import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import { Comment } from '../../models/comment.model';
import Firebase from 'firebase';
import { PageText } from 'src/app/models/pagemodel';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']

})
export class PageComponent implements OnInit {

  constructor(private fbService: FirebaseService) { }

  text: string;
  comment: string;
  author: string;
  myComment: string;
  com: Comment
  comArray: Comment[];
  tf: PageText;





  ngOnInit(): void {
    this.myComment="";
    this.com={} as Comment;
    this.tf={id:""} as PageText;

    // This is a test for the database connection. Most of the database queries requires you to subsribe tot them which means
    // you wont get the data instantly, so you have to wait for it, but because of that the app is very responsive, since if you
    // change something it will change in the app too, because you are subscribed to the channel aka watching for changes.
    this.fbService.getPagesByProject('2').subscribe(result => {
      this.text=result[0].id;
      this.tf=result[0];

      this.fbService.getCommentsByPage(result[0].id).subscribe(res =>{
       this.comArray=res;

      });

    });

  }

  sendComment(): void{
    console.log(this.myComment);
    this.com.id="";
    this.com.author="zsolt";
    this.com.comment=this.myComment;
    this.com.pageID=this.text;
    this.com.createdAt= Firebase.firestore.Timestamp.fromDate(new Date);
    this.fbService.add("Comments",this.com);
    this.myComment="";
  }

 
  update(): void{
    this.tf.project="";
    this.tf.text=this.tf.text.substring(3, this.tf.text.length-4);
    this.fbService.add("Pages", this.tf);
  }

  upload(): void{


  }

  deleteComment(id: string): void{
    console.log(id);
    this.fbService.delete("Comments", id);

  }


}
