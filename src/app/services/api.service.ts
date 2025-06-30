import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Importa el entorno para la URL de la API


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //private apiUrl = environment.apiUrl;
  private apiUrl = environment.production
    ? 'https://test-render-backend-h55a.onrender.com' // URL en producción
    : 'http://localhost:3000'; // URL local del backend
  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get(`${this.apiUrl}/api/tasks`); // 👈 /api añadido aquí
  }

  addTask(task: string) {
    return this.http.post(`${this.apiUrl}/api/tasks`, { text: task }); // 👈 /api añadido aquí
  }
}