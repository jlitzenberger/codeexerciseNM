import { Component, OnInit } from '@angular/core';
import { TeamArrest } from './model/teamarrest.model';
import { GitService } from '../app/services/git.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'NFL Team Arrest Information!';

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredTeamArrests = this.listFilter ? this.performFilter(this.listFilter) : this.teamArrests;
    }

    filteredTeamArrests: TeamArrest[];
    teamArrests: TeamArrest[];

    constructor(private gitService: GitService) {
      
    }

    performFilter(filterBy: string): TeamArrest[] {
      filterBy = filterBy.toLocaleLowerCase();

        return this.teamArrests.filter((teamArrest: TeamArrest) =>
            teamArrest.Team_preffered_name.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    ngOnInit(): void {
      this.gitService.getApi()
        .subscribe(resultArray => {
            this.teamArrests = resultArray;
            this.teamArrests.sort((a: TeamArrest, b: TeamArrest) => {
                if (a.Team_preffered_name < b.Team_preffered_name) {
                  return -1;
                }
                if (a.Team_preffered_name > b.Team_preffered_name) {
                  return 1;
                }
                return 0;
            });
            this.filteredTeamArrests = this.teamArrests;
          },
          error => console.log("Error :: " + error)
        ); 
    }
}
