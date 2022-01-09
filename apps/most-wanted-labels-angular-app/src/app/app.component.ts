import { Component } from '@angular/core';
import { API } from 'aws-amplify';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { FormBuilder } from '@angular/forms';

const apiName = 'mostwantedlabelsapi';
const getInit = {
  headers: { 'Content-Type': 'application/json' },
  response: true,
};

@Component({
  selector: 'most-wanted-labels-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  rows = [];
  ColumnMode = ColumnMode;
  
  recordLabelSearchForm = this.formBuilder.group({
    name: '',
  });
  constructor(private formBuilder: FormBuilder) {}
  
  fetchResults(username: string): void {
    const getPath = `/api/record-labels?userId=${username}`;
    API.get(apiName, getPath, getInit)
    .then((response) => {
      this.rows = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  }
  onSubmit(username: string): void {
    const postPath = `/api/record-labels/add-new?userId=${username}`;
    const getPath = `/api/record-labels?userId=${username}`;
    const postInit = {
      headers: { 'Content-Type': 'application/json' },
      body: this.recordLabelSearchForm.value,
      response: true,
    };
    API.post(apiName, postPath, postInit)
      .then(() => {
        API.get(apiName, getPath, getInit)
          .then((response) => {
            this.rows = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
