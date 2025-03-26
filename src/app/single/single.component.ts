import { Component, inject } from '@angular/core';
import { Article } from '../models/article';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-single',
  imports: [NgFor],
  templateUrl: './single.component.html',
  styleUrl: './single.component.css',
})
export class SingleComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  article!: Article;
  service: ArticleService = inject(ArticleService);
  articleId = -1;

  async ngOnInit() {
    this.articleId = Number(this.route.snapshot.paramMap.get('id'));
    this.article = this.service.getOne(this.articleId);
  }
}
