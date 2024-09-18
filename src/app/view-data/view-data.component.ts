import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import the date adapter

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent implements OnInit, AfterViewInit, OnDestroy {
  // #region Variables
  chart: any;
  temperatureData: number[] = [];
  datetimeData: string[] = [];
  // #endregion

  // #region Constructor
  constructor(private dataService: DataService) {
    Chart.register(...registerables);
  }
  // #endregion

  // #region Lifecycle Hooks
  ngOnInit(): void {
    this.dataService.currentData.subscribe(dataItems => {
      if (dataItems.length > 0) {
        this.temperatureData = dataItems.map(item => item.temperature);
        this.datetimeData = dataItems.map(item => item.datetime);
        this.updateChart();
      } else {
        this.temperatureData = [];
        this.datetimeData = [];
      }
    });

    this.initChart();
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
  // #endregion

  // #region Chart Initialization
  initChart() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    if (canvas) {
      this.chart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: this.datetimeData,
          datasets: [
            {
              label: 'Temperature (°C)',
              data: this.temperatureData,
              borderColor: 'blue',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { type: 'time', time: { unit: 'day' } },
            y: {
              beginAtZero: true,
              max: 50,
              min: -50
            }
          }
        }
      });
    }
  }
  // #endregion

  // #region Chart Update
  updateChart() {
    if (this.chart) {
      this.chart.data.labels = this.datetimeData;
      this.chart.data.datasets[0].data = this.temperatureData;
      this.chart.update();
    }
  }
  // #endregion

  // #region Chart Refresh
  refreshChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.initChart();
  }
  // #endregion
}
