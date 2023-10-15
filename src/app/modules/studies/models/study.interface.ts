export interface Wave {
  id: string;
  time: number;
  type: string;
  channel1: number;
  channel2: number;
  channel3: number;
  channel4: number;
  channel5: number;
  channel6: number;
  channel7: number;
  channel8: number;
  channel9: number;
  channel10: number;
  channel11: number;
  channel12: number;
  channel13: number;
  channel14: number;
}

export interface Study {
  id: string;
  createdOn: Date;
  waves: Wave[];
  executiveFunction: number | null;
  sensoryProcessing: number | null;
  repetitiveBehaviours: number | null;
  motorSkills: number | null;
  perseverativeThinking: number | null;
  socialAwareness: number | null;
  verbalNoVerbalCommunication: number | null;
  informationProcessing: number | null;
}
