import Project from '../models/project.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ProjectService {

  api_url = 'http://localhost:3000';
  projectUrl = `${this.api_url}/api/projects`;

  constructor(
    private http: HttpClient
  ) { }

  createProject(project: Project): Observable<any>{
      return this.http.post(`${this.projectUrl}`, project);
  }

  getProjects(): Observable<Project[]>{
      return this.http.get(this.projectUrl)
        .pipe(map(res => {
            return res["data"].docs as Project[];
        }))
  }

  editProject(project:Project) {
      let editUrl = `${this.projectUrl}`
      return this.http.put(editUrl, project);
  }

  deleteProject(id:string):any{
      let deleteUrl = `${this.projectUrl}/${id}`
      return this.http.delete(deleteUrl)
        .pipe(map(res => {
            return res;
        }))
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }

}