import { Component } from '../Entity';

export class Renderer implements Component {
  color: string;

  constructor(color: string) {
    this.color = color;
  }

  render(context: CanvasRenderingContext2D, x: number, y: number): void {
    context.fillStyle = this.color;
    context.fillRect(x, y, 50, 50); // Example rendering logic
  }

  update(deltaTime: number): void {
    // Renderer component does not need to update itself
  }
}