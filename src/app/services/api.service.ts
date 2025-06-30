import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Importa el entorno para la URL de la API
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //private apiUrl = environment.apiUrl;
  private apiUrl = 'https://test-render-backend-h55a.onrender.com';
    
  constructor(private http: HttpClient) { }

  getTasks() {
    console.log('Intentando obtener tareas desde:', `${this.apiUrl}/api/tasks`);
    return this.http.get(`${this.apiUrl}/api/tasks`).pipe(
      tap(
        response => console.log('Respuesta exitosa getTasks:', response),
        error => console.error('Error en getTasks:', error)
      )
    );
  }

  addTask(task: string) {
    console.log('Intentando agregar tarea:', task);
    return this.http.post(`${this.apiUrl}/api/tasks`, { text: task }).pipe(
      tap(
        response => console.log('Respuesta exitosa addTask:', response),
        error => console.error('Error en addTask:', error)
      )
    );
  }
}

//test