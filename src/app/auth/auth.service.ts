import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject } from 'rxjs';
import { RecipeService } from '../services/recipe.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  onAuthChange = new Subject<boolean>();
  error: string;

  constructor(
    private fireAuth: AngularFireAuth,
    private recipeService: RecipeService
  ) {}

  async signUp(email: string, password: string) {
    try {
      const response = await this.fireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      const token = await response.user!.uid;
      sessionStorage.setItem('token', token!.toString());
      this.onAuthChange.next(true);
    } catch (error: any) {
      this.setError(error.code);
    }
  }

  async signIn(email: string, password: string) {
    try {
      const response = await this.fireAuth.signInWithEmailAndPassword(
        email,
        password
      );
      const token = await response.user!.uid;
      sessionStorage.setItem('token', token!.toString());
      this.onAuthChange.next(true);
    } catch (error: any) {
      this.setError(error.code);
    }
  }

  async logOut() {
    try {
      await this.fireAuth.signOut();
      sessionStorage.removeItem('token');
      this.recipeService.clearRecipes();
      this.onAuthChange.next(false);
    } catch (error: any) {
      this.setError(error.code);
    }
  }

  getError() {
    return this.error;
  }

  setError(errorCode: string) {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        throw new Error('Email already exists');
      case 'auth/user-not-found':
        throw new Error('Email or password is wrong');
      case 'auth/wrong-password' || 'auth/user-not-found':
        throw new Error('Email or password is wrong');
    }
  }
}
