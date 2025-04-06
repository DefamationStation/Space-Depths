import { Entity } from '../combat/Entity';
import { Position } from '../combat/components/Position';
import { Renderer } from '../combat/components/Renderer';

export interface Room {
  id: string;
  width: number;
  height: number;
  connections: string[];
}

export class RoomGenerator {
  static generateRoom(id: string, width: number, height: number): Room {
    return {
      id,
      width,
      height,
      connections: [],
    };
  }

  static connectRooms(room1: Room, room2: Room): void {
    room1.connections.push(room2.id);
    room2.connections.push(room1.id);
  }

  static spawnEnemy(room: Room, id: string, x: number, y: number): Entity {
    const enemy = new Entity(id);
    const position = new Position(x, y);
    const renderer = new Renderer('red');

    enemy.addComponent('position', position);
    enemy.addComponent('renderer', renderer);

    return enemy;
  }

  static generateComplexRoom(id: string, width: number, height: number, numConnections: number): Room {
    const room = this.generateRoom(id, width, height);

    for (let i = 0; i < numConnections; i++) {
      const connectionId = `${id}-conn-${i}`;
      room.connections.push(connectionId);
    }

    return room;
  }
}