import { Injectable } from '@angular/core';
import { SERVER_ENDPOINTS } from '@core/constants/server-endpoints.constant';
import { HttpPetitions } from '@core/services/http-petitions.service';
import { CreateUserInterface, User } from './models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpPetitions) {}

  async registered(): Promise<boolean> {
    return await this.http.get<boolean>(SERVER_ENDPOINTS.USERS.BASE_ENDPOINT);
  }

  async create(createUserInterface: CreateUserInterface): Promise<User> {
    return await this.http.post<User>(
      SERVER_ENDPOINTS.USERS.BASE_ENDPOINT,
      createUserInterface
    );
  }
}
