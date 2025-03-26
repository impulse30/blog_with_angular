import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category } from '../models/category';
import { ArticleService } from '../services/article.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgFor],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  articleForm!: FormGroup;
  categories: Category[] = [];
  selectedCategories: number[] = [];
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService
  ) {}

  async ngOnInit(): Promise<void> {
    // Initialisation du formulaire avec validations
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      auteur: ['', Validators.required],
      photo: ['', Validators.required],
      categories: [[]],
    });

    try {
      // Chargement des catégories depuis l'API avec await
      this.categories = await this.articleService.allCategory();
    } catch (error) {
      console.error('Erreur lors du chargement des catégories', error);
    }
  }

  // Gérer la sélection des catégories
  toggleCategory(categoryId: number): void {
    if (this.selectedCategories.includes(categoryId)) {
      this.selectedCategories = this.selectedCategories.filter(
        (id) => id !== categoryId
      );
    } else {
      this.selectedCategories.push(categoryId);
    }
    this.articleForm.patchValue({ categories: [...this.selectedCategories] });
  }

  // Soumission du formulaire
  async submitForm(): Promise<void> {
    if (this.articleForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const { title, content, auteur, photo } = this.articleForm.value;
    const categories = [...this.selectedCategories];

    console.log('🔹 Données du formulaire avant envoi :', {
      title,
      content,
      auteur,
      photo,
      categories,
    });

    try {
      await this.articleService.store(
        title,
        content,
        auteur,
        photo,
        categories
      );
      this.successMessage = 'Article créé avec succès ! 🎉';
      this.articleForm.reset();
      this.selectedCategories = [];
    } catch (error) {
      this.errorMessage =
        'Une erreur est survenue lors de la création de l’article.';
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}
