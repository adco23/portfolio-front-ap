export class Skill {
  id?: number;
  name: string | '';
  level: string | '';
  type: skill_types;
}

export enum skill_types {
  hard = 'hard',
  soft = 'soft',
  language = 'language'
}
