import { Component, OnInit } from '@angular/core';
import { ProjectService } from './services/project.service';
import Project from './models/project.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    private projectService: ProjectService
  ) { }

  public newProject: Project = new Project()

  projectList: Project[];
  editProjects: Project[] = [];

  ngOnInit(): void {
    this.projectService.getProjects()
      .subscribe(projects => {
        this.projectList = projects
        console.log(projects)
      })
  }

  create() {
    this.projectService.createProject(this.newProject)
      .subscribe((res) => {
        this.projectList.push(res.data)
        this.newProject = new Project()
      })
  }

  editProject(project: Project) {
    console.log(project)
    if(this.projectList.includes(project)){
      if(!this.editProjects.includes(project)){
        this.editProjects.push(project)
      }else{
        this.editProjects.splice(this.editProjects.indexOf(project), 1)
        this.projectService.editProject(project).subscribe(res => {
          console.log('Update Successful')
        }, err => {
          this.editProject(project)
          console.error('Update Unsuccesful')
        })
      }
    }
  }

  submitProject(event, project:Project){
    if(event.keyCode ==13){
      this.editProject(project)
    }
  }

  deleteProject(project: Project) {
    this.projectService.deleteProject(project._id).subscribe(res => {
      this.projectList.splice(this.projectList.indexOf(project), 1);
    })
  }

}
