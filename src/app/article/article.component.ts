import { Component, Input } from '@angular/core';
import { Article } from '../models/article';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article',
  imports: [RouterLink,NgFor],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent {

  @Input() article!:Article;
  
}
