import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import { Comment } from '../../models/comment.model';
import Firebase from 'firebase';



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



  ngOnInit(): void {
    this.myComment="";
    this.com={} as Comment;
    // This is a test for the database connection. Most of the database queries requires you to subsribe tot them which means
    // you wont get the data instantly, so you have to wait for it, but because of that the app is very responsive, since if you
    // change something it will change in the app too, because you are subscribed to the channel aka watching for changes.
    this.fbService.getPagesByProject('1').subscribe(result => {
      this.text=result[0].id;

      this.fbService.getCommentsByPage(result[0].id).subscribe(res =>{
        this.comment = res[0].comment;
        this.author = res[0].author;

      });

    });

  }

  sendComment(): void{
    console.log(this.myComment);
    this.com.id="";
    this.com.author="zsolt";
    this.com.comment="fvbfiov";
    this.com.pageID=this.text;
    this.com.createdAt= Firebase.firestore.Timestamp.fromDate(new Date);
    this.fbService.add("Comments",this.com);

  }


}
