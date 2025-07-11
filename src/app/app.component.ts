import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service'; // Asegúrate de que la ruta sea correcta
import { environment } from '../environments/environment'; // Importa el entorno para la URL de

@Component({
  selector: 'app-root',
  standalone: true, // 👈 Componente independiente
  imports: [CommonModule, FormsModule, HttpClientModule], // 👈 Módulos necesarios
  template: `
    <h1>Lista de Tareas</h1>
    <input [(ngModel)]="newTask" placeholder="Nueva tarea">
    <button (click)="addTask()">Agregar</button>
    <ul>
      <li *ngFor="let task of tasks">{{ task.text }}</li>
    </ul>
  `,
})

export class AppComponent {
  tasks: any[] = [];
  newTask = '';

  constructor(private apiService: ApiService) {
    console.log('AppComponent inicializado');
    this.loadTasks();
  }

  loadTasks() {
    console.log('Iniciando carga de tareas');
    this.apiService.getTasks().subscribe({
      next: (response: any) => {
        console.log('Tareas cargadas exitosamente:', response);
        this.tasks = response;
      },
      error: (error) => {
        console.error('Error al cargar tareas:', error);
      }
    });
  }

  addTask() {
    if (!this.newTask.trim()) {
      console.log('Intento de agregar tarea vacía');
      return;
    }
    
    console.log('Intentando agregar nueva tarea:', this.newTask);
    this.apiService.addTask(this.newTask).subscribe({
      next: (response: any) => {
        console.log('Tarea agregada exitosamente:', response);
        this.tasks.push(response);
        this.newTask = '';
      },
      error: (error) => {
        console.error('Error al agregar tarea:', error);
      }
    });
  }
}