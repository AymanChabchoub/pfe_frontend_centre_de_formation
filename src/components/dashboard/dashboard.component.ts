import { Component } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { AuthService } from 'src/services/auth/auth.service';
import { FormationService } from 'src/services/formation/formation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  nbClient: number = 0;
  nbFormateur: number = 0;
  nbFormation: number = 0;
  nbInscription: number = 0;
  tab_nom_formation:string[]=[]
  tab_nombre_inscription:number[]=[]

  chartDataPie: ChartDataset<'pie'>[] = [
    {
      data: [], // Initialize empty
      label: 'User Distribution',
      
    }
  ];
  chartLabelsPie: string[] = ['Client', 'Formateur'];
  chartOptionsPie: ChartOptions<'pie'> = {  };

  chartDataLine: ChartDataset<'line'>[] = [
    {
      data: [], // Initialize empty
      label: 'Nombre Client par formation',
      
    }
  ];
  chartLabelsLine: string[] = [];
  chartOptionsLine: ChartOptions<'line'> = {  };

  constructor(
    private userService: AuthService,
    private formationService: FormationService,
  ) { }
  ngOnInit(): void {
    
    this.formationService.getAll().subscribe((data) => {
      this.nbFormation = data.length;
    });
    this.userService.getAllUsers().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].role === 'CLIENT') {
          this.nbClient++;
        } else if (data[i].role === 'FORMATEUR') {
          this.nbFormateur++;
        }
      }
      // Update Pie Chart Data
      this.chartDataPie[0].data = [this.nbClient, this.nbFormateur];
      console.log(this.chartDataPie[0].data)
    });


  }

}




