export class Skill {
  id?: number;
  name: string | '';
  level: string | '';
  type: skill_types;
}

enum skill_types {
  hard,
  soft,
  language
}
