import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '@patients/models/patient.interface';
import { PatientsService } from '@patients/patients.service';
import { Study, Wave } from '@studies/models/study.interface';
import { StudiesService } from '@studies/studies.service';
import {
  Chart,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  LineController,
  PointElement,
  LineElement,
  RadarController,
  RadialLinearScale,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

type channelName =
  | 'channel1'
  | 'channel2'
  | 'channel3'
  | 'channel4'
  | 'channel5'
  | 'channel6'
  | 'channel7'
  | 'channel8'
  | 'channel9'
  | 'channel10'
  | 'channel11'
  | 'channel12'
  | 'channel13'
  | 'channel14';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss'],
})
export class StudyComponent implements OnInit {
  patient: Patient | undefined;
  study: Study | undefined;
  studyChart: { data: ChartData; options: ChartOptions } = {
    data: {
      datasets: [],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `Ondas`,
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true
            }
          }
        }
      },
    },
  };
  channels: { name: channelName; color: string }[] = [
    {
      name: 'channel1',
      color: '#FF0000',
    },
    {
      name: 'channel2',
      color: '#00FF00',
    },
    {
      name: 'channel3',
      color: '#0000FF',
    },
    {
      name: 'channel4',
      color: '#FFFF00',
    },
    {
      name: 'channel5',
      color: '#FF00FF',
    },
    {
      name: 'channel6',
      color: '#00FFFF',
    },
    {
      name: 'channel7',
      color: '#800000',
    },
    {
      name: 'channel8',
      color: '#008000',
    },
    {
      name: 'channel9',
      color: '#000080',
    },
    {
      name: 'channel10',
      color: '#808000',
    },
    {
      name: 'channel11',
      color: '#800080',
    },
    {
      name: 'channel12',
      color: '#008080',
    },
    {
      name: 'channel13',
      color: '#C0C0C0',
    },
    {
      name: 'channel14',
      color: '#808080',
    },
  ];

  constructor(
    private patientsService: PatientsService,
    private studiesService: StudiesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    Chart.register(
      LineController,
      PointElement,
      LineElement,
      CategoryScale,
      LinearScale,
      Title,
      Tooltip,
      Legend,
      RadarController,
      RadialLinearScale,
      zoomPlugin
    );
  }

  createCharts(waves: Wave[]): void {
    const labels: string[] = [];
    for (let i = 1; i <= waves.length; i++) labels.push(i.toString());
    this.studyChart.data.labels = labels;

    const datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      borderWidth: number;
      pointRadius: number;
    }[] = [];
    for (let i = 1; i <= 14; i++) {
      const channel = this.channels[i - 1];
      const data = waves.map((wave) => wave[channel.name]);
      datasets.push({
        label: `Canal ${i}`,
        backgroundColor: channel.color,
        borderColor: channel.color,
        borderWidth: 1,
        pointRadius: 0,
        data,
      });
    }
    this.studyChart.data.datasets = datasets;
  }

  async ngOnInit(): Promise<void> {
    try {
      const patientId = this.route.snapshot.params['patientId'];
      this.patient = await this.patientsService.findOne(patientId);
      this.study = await this.studiesService.findOne(
        patientId,
        this.route.snapshot.params['id']
      );
      this.createCharts(this.study!.waves);
    } catch {
      this.router.navigate(['/']);
    }
  }

  createChart() {}
}
