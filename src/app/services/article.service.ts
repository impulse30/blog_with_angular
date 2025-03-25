import { Injectable } from '@angular/core';
import { Article, ArticleStore } from '../models/article';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = [];

  // async all(): Promise<Article[]> {
  //   let data = await fetch('http://localhost:8000/articles', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then((response) => response.json());
  //   console.log(data);
  //   return data;
  // }

  async all(): Promise<Article[]> {
    return await fetch('http://localhost:8000/api/articles')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data.data;
      });
  }

  getAll(): Article[] {
    return this.articles;
  }

  getOne(id: number): Article {
    return this.articles.find((article) => article.id == id)!;
  }

  async store(
    title: string,
    content: string,
    auteur: string,
    image: string,
    categories: Category[]
  ): Promise<ArticleStore> {
    const response = await fetch('http://localhost:8000/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        auteur,
        image,
        categories: categories.map(category => category.id), // Assurez-vous d'envoyer seulement les IDs
      }),
    });
  
    if (!response.ok) {
      throw new Error('Erreur lors de la création de l\'article');
    }
  
    const data = await response.json();
    return data; // Assurez-vous que la structure correspond à votre API
  }

  async allCategory(): Promise<Category[]> {
    return await fetch('http://localhost:8000/api/categories').then(
      (response) => response.json()
    );
  }
}
