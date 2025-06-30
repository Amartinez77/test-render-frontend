import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service'; // Asegúrate de que la ruta sea correcta
import { environment } from '../environments/environment'; // Importa el entorno para la URL de

@Component({
  selector: 'app-root',
  standalone: true, // 👈 Componente independiente
  imports: [CommonModule, FormsModule], // 👈 Módulos necesarios
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
    this.loadTasks();
  }

  loadTasks() {
    this.apiService.getTasks().subscribe((tasks: any) => {
      this.tasks = tasks;
    });
  }

  addTask() {
    this.apiService.addTask(this.newTask).subscribe(() => {
      this.newTask = '';
      this.loadTasks();
    });
  }
}