import { Component, OnInit } from '@angular/core';
import { ArticlesOnlineService } from '../services/articles-online.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {

  articles;

  isOk = false;


  constructor(
    private router: Router,
    private service: ArticlesOnlineService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const _id = params.get('id');

      this.service.getOne(_id).subscribe((result) => {
        this.articles = result;
      }, (error) => {
        this.router.navigate(['/not-found']);
      });
    });
  }

  onSubmitUpdateArticle($event, f) {
    $event.preventDefault();
    if (f.valid) {
      const article = (f.value);

      console.log('ressource => ', article);
      this.service.update(article).subscribe((result) => {
        console.log(result);
        this.isOk = true;
      });
    }
  }





  onClickDelete(article) {
    this.service.delete(article._id).subscribe(
      (result) => {
        console.log(result);

        const index = this.articles.indexOf(article);
        this.articles.splice(index, 1);
      }
    );
  }

  onClickUpdate(article) {
    console.log(article);
    this.router.navigate(['/article/update', article.id]);
  }

}
