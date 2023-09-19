export interface Wave {
  id: string;
  time: number;
  fp1: number;
  af3: number;
  f3: number;
  f7: number;
  fc5: number;
  fc1: number;
  c3: number;
  t7: number;
  cp5: number;
  cp1: number;
  p3: number;
  p7: number;
  po3: number;
  o1: number;
  oz: number;
  pz: number;
  fp2: number;
  af4: number;
  fz: number;
  f4: number;
  f8: number;
  fc6: number;
  fc2: number;
  cz: number;
  c4: number;
  t8: number;
  cp6: number;
  cp2: number;
  p4: number;
  p8: number;
  po4: number;
  o2: number;
}

export interface Study {
  id: string;
  created_on: Date;
  result: string;
  waves: Wave[];
}
