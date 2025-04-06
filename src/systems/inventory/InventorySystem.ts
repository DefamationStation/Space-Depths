export interface Item {
  id: string;
  name: string;
  description: string;
}

export class InventorySystem {
  private items: Item[];

  constructor() {
    this.items = [];
  }

  addItem(item: Item): void {
    this.items.push(item);
  }

  removeItem(itemId: string): void {
    this.items = this.items.filter((item) => item.id !== itemId);
  }

  listItems(): Item[] {
    return this.items;
  }
}