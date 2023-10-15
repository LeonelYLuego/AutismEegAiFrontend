import { Injectable } from '@angular/core';
import { HttpPetitions } from '@core/services/http-petitions.service';
import {
  CreatePatientInterface,
  Patient,
  UpdatePatientInterface,
} from './models/patient.interface';
import { SERVER_ENDPOINTS } from '@core/constants/server-endpoints.constant';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private http: HttpPetitions) {}

  async create(
    createPatientInterface: CreatePatientInterface
  ): Promise<Patient> {
    return await this.http.post<Patient>(
      SERVER_ENDPOINTS.PATIENTS.BASE_ENDPOINT,
      createPatientInterface
    );
  }

  async findAll(): Promise<Patient[]> {
    return await this.http.get<Patient[]>(
      SERVER_ENDPOINTS.PATIENTS.BASE_ENDPOINT
    );
  }

  async findOne(id: string): Promise<Patient> {
    return await this.http.get<Patient>(SERVER_ENDPOINTS.PATIENTS.BY_ID(id));
  }

  async update(
    id: string,
    updatePatientInterface: UpdatePatientInterface
  ): Promise<Patient> {
    return await this.http.put<Patient>(
      SERVER_ENDPOINTS.PATIENTS.BY_ID(id),
      updatePatientInterface
    );
  }

  async remove(id: string): Promise<void> {
    await this.http.delete<void>(SERVER_ENDPOINTS.PATIENTS.BY_ID(id));
  }
}
