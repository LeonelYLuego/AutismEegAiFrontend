import { Injectable } from '@angular/core';
import { HttpPetitions } from '@core/services/http-petitions.service';
import { Study } from './models/study.interface';
import { SERVER_ENDPOINTS } from '@core/constants/server-endpoints.constant';

@Injectable({
  providedIn: 'root',
})
export class StudiesService {
  constructor(private http: HttpPetitions) {}

  async create(patientId: string, files: FormData): Promise<Study> {
    return await this.http.post<Study>(
      SERVER_ENDPOINTS.STUDIES.BASE_ENDPOINT(patientId),
      files
    );
  }

  async findAll(patientId: string): Promise<Study[]> {
    return await this.http.get<Study[]>(
      SERVER_ENDPOINTS.STUDIES.BASE_ENDPOINT(patientId)
    );
  }

  async findOne(patientId: string, id: string): Promise<Study> {
    return await this.http.get<Study>(
      SERVER_ENDPOINTS.STUDIES.BY_ID(patientId, id)
    );
  }

  async remove(patientId: string, id: string): Promise<void> {
    return await this.http.delete<void>(
      SERVER_ENDPOINTS.STUDIES.BY_ID(patientId, id)
    );
  }
}
