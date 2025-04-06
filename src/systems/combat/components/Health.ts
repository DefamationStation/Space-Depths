import { Component } from '../Entity';

export class Health implements Component {
  current: number;
  max: number;

  constructor(max: number) {
    this.max = max;
    this.current = max;
  }

  takeDamage(amount: number): void {
    this.current = Math.max(0, this.current - amount);
  }

  heal(amount: number): void {
    this.current = Math.min(this.max, this.current + amount);
  }

  update(deltaTime: number): void {
    // Health component does not need to update itself
  }
}