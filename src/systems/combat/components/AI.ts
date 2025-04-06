import { Component } from '../Entity';
import { Position } from './Position';

export class AI implements Component {
  target: Position;
  speed: number;

  constructor(target: Position, speed: number) {
    this.target = target;
    this.speed = speed;
  }

  update(deltaTime: number): void {
    // Example AI logic: Move towards the target
    const dx = this.target.x - this.target.x;
    const dy = this.target.y - this.target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      this.target.x += (dx / distance) * this.speed * deltaTime;
      this.target.y += (dy / distance) * this.speed * deltaTime;
    }
  }
}