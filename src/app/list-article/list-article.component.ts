import { Component, inject, Inject } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { Article } from '../models/article';
import { NgFor } from '@angular/common';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-list-article',
  imports: [ArticleComponent, NgFor],
  templateUrl: './list-article.component.html',
  styleUrl: './list-article.component.css',
})
export class ListArticleComponent {
  articles!: Article[];
  service: ArticleService = inject(ArticleService);

  ngOnInit(): void {
    this.service.all().then((response: Article[]) => {
      this.service.articles = [...response];
      this.articles = this.service.articles;
    });
  }
}
