import { Component } from '../Entity';
import { Rectangle } from '../../../utils/collisionUtils';

export class Collider implements Component {
  bounds: Rectangle;

  constructor(bounds: Rectangle) {
    this.bounds = bounds;
  }

  update(deltaTime: number): void {
    // Collider component does not need to update itself
  }
}