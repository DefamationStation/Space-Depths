import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Entity } from '../../systems/combat/Entity';
import { Position } from '../../systems/combat/components/Position';
import { Renderer } from '../../systems/combat/components/Renderer';
import { RoomGenerator, Room } from '../../systems/procedural/RoomGenerator';
import { SkillSystem, Skill } from '../../systems/skills/SkillSystem';
import { InventorySystem, Item } from '../../systems/inventory/InventorySystem';
import { playerTakeDamage, playerUseEnergy, playerConsumeOxygen, exploreRoom, levelUp } from '../../state/actions/gameActions';
import { selectPlayerHealth, selectPlayerEnergy, selectPlayerOxygen, selectPlayerPosition } from '../../state/selectors/playerSelectors';
import { selectCurrentLevel, selectRoomsExplored } from '../../state/selectors/gameWorldSelectors';
import { AI } from '../../systems/combat/components/AI';

const GameCanvas: React.FC = () => {
  const playerHealth = useSelector(selectPlayerHealth);
  const playerEnergy = useSelector(selectPlayerEnergy);
  const playerOxygen = useSelector(selectPlayerOxygen);
  const playerPosition = useSelector(selectPlayerPosition);

  const currentLevel = useSelector(selectCurrentLevel);
  const roomsExplored = useSelector(selectRoomsExplored);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
    }
  }, [dimensions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Create a player entity
    const player = new Entity('player');
    const playerPositionComponent = new Position(100, 100);
    const playerRenderer = new Renderer('blue');

    player.addComponent('position', playerPositionComponent);
    player.addComponent('renderer', playerRenderer);

    // Generate complex rooms
    const complexRoom1 = RoomGenerator.generateComplexRoom('complexRoom1', 300, 300, 3);
    const complexRoom2 = RoomGenerator.generateComplexRoom('complexRoom2', 300, 300, 2);
    RoomGenerator.connectRooms(complexRoom1, complexRoom2);

    const rooms: Room[] = [complexRoom1, complexRoom2];

    // Spawn enemies in rooms
    const enemies = [
      RoomGenerator.spawnEnemy(complexRoom1, 'enemy1', 120, 120),
      RoomGenerator.spawnEnemy(complexRoom2, 'enemy2', 270, 120),
    ];

    // Add AI to enemies
    enemies.forEach((enemy) => {
      const ai = new AI(playerPositionComponent, 50); // Speed of 50 units per second
      enemy.addComponent('ai', ai);
    });

    // Initialize skill system
    const skillSystem = new SkillSystem();

    // Create a sample skill
    const fireball: Skill = {
      name: 'Fireball',
      cooldown: 5,
      execute: () => {
        console.log('Fireball skill executed!');
      },
    };

    skillSystem.addSkill(fireball);

    // Example: Use the skill
    skillSystem.useSkill('Fireball');

    // Initialize inventory system
    const inventorySystem = new InventorySystem();

    // Create sample items
    const sword: Item = { id: '1', name: 'Sword', description: 'A sharp blade.' };
    const shield: Item = { id: '2', name: 'Shield', description: 'A sturdy shield.' };

    // Add items to inventory
    inventorySystem.addItem(sword);
    inventorySystem.addItem(shield);

    // List items in inventory
    console.log('Inventory:', inventorySystem.listItems());

    // Remove an item from inventory
    inventorySystem.removeItem('1');
    console.log('Inventory after removal:', inventorySystem.listItems());

    let animationFrameId: number;

    const render = () => {
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Render player stats
      context.fillStyle = 'black';
      context.font = '16px Arial';
      context.fillText(`Health: ${playerHealth}`, 10, 20);
      context.fillText(`Energy: ${playerEnergy}`, 10, 40);
      context.fillText(`Oxygen: ${playerOxygen}`, 10, 60);
      context.fillText(`Position: (${playerPosition.x}, ${playerPosition.y})`, 10, 80);
      context.fillText(`Level: ${currentLevel}`, 10, 100);
      context.fillText(`Rooms Explored: ${roomsExplored}`, 10, 120);

      // Render rooms
      rooms.forEach((room, index) => {
        context.strokeStyle = 'black';
        context.strokeRect(index * 250, 100, room.width, room.height);
      });

      // Render enemies
      enemies.forEach((enemy) => {
        const position = enemy.getComponent('position') as Position;
        const renderer = enemy.getComponent('renderer') as Renderer;
        renderer.render(context, position.x, position.y);
      });

      // Update enemies
      const deltaTime = 1 / 60; // Assuming 60 FPS
      enemies.forEach((enemy) => {
        enemy.update(deltaTime);
      });

      // Update and render the player
      const position = player.getComponent('position') as Position;
      const renderer = player.getComponent('renderer') as Renderer;
      renderer.render(context, position.x, position.y);

      // Request the next frame
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Simulate gameplay mechanics
    setTimeout(() => {
      console.log('Player takes damage');
      playerTakeDamage(10);
    }, 1000);

    setTimeout(() => {
      console.log('Player uses energy');
      playerUseEnergy(5);
    }, 2000);

    setTimeout(() => {
      console.log('Player consumes oxygen');
      playerConsumeOxygen(3);
    }, 3000);

    setTimeout(() => {
      console.log('Player explores a room');
      exploreRoom();
    }, 4000);

    setTimeout(() => {
      console.log('Player levels up');
      levelUp();
    }, 5000);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [playerHealth, playerEnergy, playerOxygen, playerPosition, currentLevel, roomsExplored, dimensions]);

  return <canvas ref={canvasRef} style={{ border: '1px solid black' }} />;
};

export default GameCanvas;