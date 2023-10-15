export interface Patient {
  id: string;
  name: string;
  age: number;
}

export interface CreatePatientInterface {
  name: string;
  age: number;
}

export interface UpdatePatientInterface {
  name: string;
  age: number;
}
