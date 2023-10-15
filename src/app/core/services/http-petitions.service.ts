import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class HttpPetitions {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  private serverException(message: string): void {
    this.snackBar.open(`Error del servidor: ${message}`, undefined, {
      duration: 2000,
      panelClass: 'warn-snackbar',
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  async get<Type>(
    url: string,
    params?: { name: string; value: string }[]
  ): Promise<Type> {
    let sendParams: undefined | HttpParams = undefined;
    if (params) {
      sendParams = new HttpParams();
      params.map((param) => {
        sendParams = sendParams!.set(param.name, param.value);
      });
    }
    return new Promise<Type>((resolve, reject) => {
      this.http
        .get<Type>(url, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')!,
          },
          params: sendParams,
        })
        .subscribe({
          next: (value) => {
            resolve(value);
          },
          error: (err: HttpErrorResponse) => {
            if (err.status == 500) this.serverException(err.message);
            reject(err);
          },
        });
    });
  }

  async post<Type>(
    url: string,
    body: any,
    params?: { name: string; value: string }[]
  ): Promise<Type> {
    let sendParams: undefined | HttpParams = undefined;
    if (params) {
      sendParams = new HttpParams();
      params.map((param) => {
        sendParams = sendParams!.set(param.name, param.value);
      });
    }
    return new Promise<Type>((resolve, reject) => {
      this.http
        .post<Type>(url, body, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')!,
          },
          params: sendParams,
        })
        .subscribe({
          next: (value) => {
            resolve(value);
          },
          error: (err: HttpErrorResponse) => {
            if (err.status == 500) this.serverException(err.message);
            reject(err);
          },
        });
    });
  }

  async put<Type>(
    url: string,
    body: any,
    params?: { name: string; value: string }[]
  ): Promise<Type> {
    let sendParams: undefined | HttpParams = undefined;
    if (params) {
      sendParams = new HttpParams();
      params.map((param) => {
        sendParams = sendParams!.set(param.name, param.value);
      });
    }
    return new Promise<Type>((resolve, reject) => {
      this.http
        .put<Type>(url, body, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')!,
          },
          params: sendParams,
        })
        .subscribe({
          next: (value) => {
            resolve(value);
          },
          error: (err: HttpErrorResponse) => {
            if (err.status == 500) this.serverException(err.message);
            reject(err);
          },
        });
    });
  }

  async patch<Type>(
    url: string,
    body: any,
    params?: { name: string; value: string }[]
  ): Promise<Type> {
    let sendParams: undefined | HttpParams = undefined;
    if (params) {
      sendParams = new HttpParams();
      params.map((param) => {
        sendParams = sendParams!.set(param.name, param.value);
      });
    }
    return new Promise<Type>((resolve, reject) => {
      this.http
        .patch<Type>(url, body, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')!,
          },
          params: sendParams,
        })
        .subscribe({
          next: (value) => {
            resolve(value);
          },
          error: (err: HttpErrorResponse) => {
            if (err.status == 500) this.serverException(err.message);
            reject(err);
          },
        });
    });
  }

  async delete<Type>(
    url: string,
    params?: { name: string; value: string }[]
  ): Promise<Type> {
    let sendParams: undefined | HttpParams = undefined;
    if (params) {
      sendParams = new HttpParams();
      params.map((param) => {
        sendParams = sendParams!.set(param.name, param.value);
      });
    }
    return new Promise<Type>((resolve, reject) => {
      this.http
        .delete<Type>(url, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')!,
          },
          params: sendParams,
        })
        .subscribe({
          next: (value) => {
            resolve(value);
          },
          error: (err: HttpErrorResponse) => {
            if (err.status == 500) this.serverException(err.message);
            reject(err);
          },
        });
    });
  }
}
