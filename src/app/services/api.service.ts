import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Importa el entorno para la URL de la API

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;  // Usará la URL según el entorno

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get(`${this.apiUrl}/api/tasks`);
  }

  addTask(task: string) {
    return this.http.post(`${this.apiUrl}/api/tasks`, { text: task });
  }
}