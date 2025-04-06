import { Component } from '../Entity';

export class Position implements Component {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update(deltaTime: number): void {
    // Position component does not need to update itself
  }
}