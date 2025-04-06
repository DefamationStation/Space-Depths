export interface Skill {
  name: string;
  cooldown: number;
  execute(): void;
}

export class SkillSystem {
  private skills: Map<string, Skill>;

  constructor() {
    this.skills = new Map();
  }

  addSkill(skill: Skill): void {
    this.skills.set(skill.name, skill);
  }

  useSkill(name: string): void {
    const skill = this.skills.get(name);
    if (skill) {
      skill.execute();
    }
  }
}