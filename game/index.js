const history = document.getElementById("history");
function battlefield(text) {
  history.innerHTML += `<p>${text}</p>`;
}
// player
class Player {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.power = 50;
    this.medicine = 0;
    this.inventory = [];
  }
  attack(monster) {
    const damage = Math.floor(Math.random() * this.power);
    monster.health -= damage;
    battlefield(`${this.name} attack ${monster.type}  on  ${damage} damage.`);
  }
  heal() {
    if (this.medicine > 0) {
      const healAmount = 50;
      this.health += healAmount;
      this.medicine--;
      battlefield(`${this.name} heal to ${healAmount}. HP: ${this.health}`);
    } else {
      battlefield(`${this.name} doesn't have medkit!`);
    }
  }
  addItem(item) {
    this.inventory.push(item);
    battlefield(`${this.name} find item: ${item.name}`);
  }
  useItem(itemName) {
    const index = this.inventory.findIndex((i) => i.name === itemName);
    if (index !== -1) {
      this.inventory[index].use(this);
      this.inventory.splice(index, 1);
    } else {
      battlefield(`${itemName} not at inventory.`);
    }
  }
  showStatus() {
    battlefield(
      ` ${this.name} HP: ${this.health}, Power: ${this.power}, Inventary: ${this.medicine}`
    );
  }
}
// ----monster
class Monster {
  constructor(type) {
    this.type = type;
    this.health = 50;
    this.power = 10;
  }
  attack(player) {
    const damage = Math.floor(Math.random() * this.power);
    player.health -= damage;
    battlefield(`${this.type} attak ${player.name} on ${damage} damage.`);
  }
}
// ------------------------item
class Item {
  constructor(name, type, effect) {
    this.name = name;
    this.type = type;
    this.effect = effect;
  }
  use(player) {
    if (this.type === "medkit") {
      player.health += this.effect;
      player.medicine++;
      battlefield(`${player.name} used ${this.name} — add ${this.effect} HP.`);
    } else if (this.type === "weapon") {
      player.power += this.effect;
      battlefield(
        `${player.name} used ${this.name} — power up ${this.effect}.`
      );
    }
  }
}
// -------game
class Game {
  constructor(playerName) {
    this.player = new Player(playerName);
    this.monsters = [
      new Monster("Monster1"),
      new Monster("Monster2"),
      new Monster("Monster3"),
    ];
    this.items = [
      new Item("Medkit", "medkit", 50),
      new Item("blade", "weapon", 10),
    ];
    this.currentMonster = null;
  }
  //
  startGame() {
    battlefield(`Welcome ${this.player.name}`);
    this.player.showStatus();
  }

  getRandomMonster() {
    return this.monsters[Math.floor(Math.random() * this.monsters.length)];
  }

  getRandomItem() {
    return this.items[Math.floor(Math.random() * this.items.length)];
  }

  adventures() {
    if (this.player.health <= 0 || this.monsters.length === 0) return;

    const eventChance = Math.random();

    if (eventChance < 0.5) {
      this.currentMonster = this.getRandomMonster();
      battlefield(`met a ${this.currentMonster.type}!`);
    } else {
      const item = this.getRandomItem();
      this.player.addItem(item);
      item.use(this.player);
    }

    this.player.showStatus();
  }
  // ---battleoptions
  battleTurn() {
    if (!this.currentMonster) {
      battlefield("not enemy");
      return;
    }

    this.player.attack(this.currentMonster);

    if (this.currentMonster.health <= 0) {
      battlefield(`${this.currentMonster.type} `);
      this.monsters = this.monsters.filter((m) => m !== this.currentMonster);
      this.currentMonster = null;

      if (this.monsters.length === 0) {
        battlefield("You win");
      }

      this.player.showStatus();
      return;
    }

    this.currentMonster.attack(this.player);

    if (this.player.health <= 0) {
      battlefield(`${this.player.name} Game over.`);
    }

    this.player.showStatus();
  }
}
// ---------start game
const playerName = prompt("enter yourr name");
const game = new Game(playerName);
game.startGame();
// -------interface
document.getElementById("nextBtn").addEventListener("click", () => {
  game.adventures();
});
document.getElementById("attackBtn").addEventListener("click", () => {
  game.battleTurn();
});

document.getElementById("healBtn").addEventListener("click", () => {
  game.player.heal();
  if (game.currentMonster) {
    game.currentMonster.attack(game.player);
    game.player.showStatus();
  }
});
