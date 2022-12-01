import { Component } from '@angular/core';
import { RestAPICallService } from './rest-apicall.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CSVTest';
  isError : boolean = false;
  JSONResult: any;
  splitLines: Array<String>;

  constructor(private service: RestAPICallService){}

  public handleFileSelect(evt) {
    let files = evt.target.files; // FileList object
    let file = files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      let csv = event.target.result; // Content of CSV file
      console.log(typeof(csv));
      console.log(csv);
      this.splitLines = csv.split("\n");
      console.log(this.splitLines);

      this.validate();

      if (!this.isError) {
        this.convertCSVToJson();

        let response = this.service.upload(this.JSONResult);
        response.subscribe(data => console.log(data));
      }

    }
    
  }

  validate(){
    // to validate login duplicate in uploaded csv file
    let loginArr: Array<String> = [];
    let idArr: Array<String>=[];

    for (let i = 1; i < this.splitLines.length; i++) { // to loop each employee
      const element = this.splitLines[i];

      if (element[0] != '#') { // validate to ignore comment line

        let empColumns = element.split(",");
        if (empColumns.length != 4) {
          console.log("Column length != 4");
          this.isError = true;
          return;
        } else {

          // validate all columns filled or not
          if(empColumns.filter(col => col.trim().length == 0).length > 0){
            console.log("One or more column is empty.");
            this.isError = true;
            return;
          }

          // validate duplicate id, login and salary
          let salary = Number(empColumns[3]);
          if(idArr.includes[empColumns[0]] || loginArr.includes[empColumns[1]] 
              || (isNaN(salary) || salary < 0)){ 
            console.log('duplicate id, login and salary error');
            this.isError = true;
            return;
          } else {
            idArr.push(empColumns[0]);
            loginArr.push(empColumns[1]);
          }

        }
      }

    }
  }

  convertCSVToJson(){
    // Hard code header to avoid wrong header type input from CSV
    let headers: Array<string> = ['id', 'login', 'name', 'salary'];
    console.log(headers);

    let headMatchResult = [];

    for (var i = 1; i < this.splitLines.length ; i++) {
      var obj = {};
      var currentLine = this.splitLines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }

      headMatchResult.push(obj);
    }

    console.log('Heading match');
    console.log(headMatchResult);

    this.JSONResult = JSON.stringify(headMatchResult);
    console.log(this.JSONResult);
  }
}
