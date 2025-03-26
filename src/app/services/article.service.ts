import { Injectable } from '@angular/core';
import { Article, ArticleStore } from '../models/article';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = [];



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
    photo: string, // ✅ Assurer que le champ photo est bien envoyé
    categories: number[]
  ): Promise<ArticleStore> {
    const articleData = {
      title,
      content,
      auteur,
      photo, // ✅ Assurez-vous que ce champ est bien rempli
      category_id: categories, // ✅ Vérifiez si l'API attend `category_id` au lieu de `categories`
    };
  
    console.log('🔹 Données envoyées à l’API :', articleData); // ✅ Debug avant envoi
  
    const response = await fetch('http://localhost:8000/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(articleData),
    });
  
    const textResponse = await response.text();
    console.log('🔹 Réponse brute de l\'API :', textResponse); // ✅ Voir la réponse avant parsing
  
    if (!response.ok) {
      throw new Error(`Erreur API : ${response.status} - ${response.statusText}`);
    }
  
    try {
      return JSON.parse(textResponse); // ✅ Vérifie si c'est un JSON valide
    } catch (error) {
      throw new Error('La réponse de l\'API n\'est pas un JSON valide');
    }
  }
  
  
  
  async allCategory(): Promise<Category[]> {
    try {
      const response = await fetch('http://localhost:8000/api/categories');
  
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des catégories');
      }
  
      const data = await response.json();
  
      if (!Array.isArray(data)) {
        throw new Error('Format de réponse incorrect pour les catégories');
      }
  
      return data;
    } catch (error) {
      console.error('Erreur:', error);
      return []; // ✅ Retourne un tableau vide en cas d'erreur pour éviter les crashs
    }
  }
  
}