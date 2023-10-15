import { Injectable } from '@angular/core';
import { HttpPetitions } from '@core/services/http-petitions.service';
import {
  LogInInterface,
  LogInResponseInterface,
} from './models/log-in.interface';
import { SERVER_ENDPOINTS } from '@core/constants/server-endpoints.constant';
import { User } from '@users/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpPetitions) {}

  async logIn(credentials: LogInInterface): Promise<LogInResponseInterface> {
    return await this.http.post<LogInResponseInterface>(
      SERVER_ENDPOINTS.AUTH.LOG_IN,
      credentials
    );
  }

  async logged(): Promise<User | null> {
    try {
      return await this.http.get<User>(SERVER_ENDPOINTS.AUTH.LOGGED);
    } catch {}
    return null;
  }
}
