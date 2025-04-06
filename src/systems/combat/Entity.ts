export interface Component {
  update(deltaTime: number): void;
}

export class Entity {
  id: string;
  components: Map<string, Component>;

  constructor(id: string) {
    this.id = id;
    this.components = new Map();
  }

  addComponent(name: string, component: Component): void {
    this.components.set(name, component);
  }

  removeComponent(name: string): void {
    this.components.delete(name);
  }

  getComponent(name: string): Component | undefined {
    return this.components.get(name);
  }

  update(deltaTime: number): void {
    this.components.forEach((component) => component.update(deltaTime));
  }
}