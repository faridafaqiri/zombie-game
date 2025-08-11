// Player object with name, health, current weapon, and inventory of weapons
let player = {
  name: "Farida",
  health: 100,
  currentWeapon: "gun",
  inventory: {
    knife: { ammo: Infinity, damage: 10 },
    gun: { ammo: 8, damage: 15 },
    shotgun: { ammo: 4, damage: 60 },
  },
};

// Array of zombie types with their health
let zombies = [
  { type: "walker", health: 50 },
  { type: "runner", health: 30 },
  { type: "brute", health: 100 },
];

// Select the current zombie to fight
let currentZombie = 1;
let zombie = zombies[currentZombie];

// Function to display messages inside the game log div on the webpage
function logMessage(message) {
  const logDiv = document.getElementById("game-log");
  const p = document.createElement("p");
  p.textContent = message;
  logDiv.appendChild(p);
  logDiv.scrollTop = logDiv.scrollHeight; // Auto scroll to the bottom
}

// Function for player attacking zombie
function attackZombie(attacker, defender, weaponName) {
  let weapon = attacker.inventory[weaponName];

  // Check if weapon ammo is zero (and not infinite), switch to knife if out of ammo
  if (weapon.ammo <= 0 && weapon.ammo !== Infinity) {
    logMessage(`⚠️ ${weaponName} is out of ammo! Switching to knife...`);
    weaponName = "knife";
    weapon = attacker.inventory.knife;
  }

  // Reduce zombie health by weapon damage
  defender.health -= weapon.damage;

  // Reduce ammo if weapon is not melee
  if (weapon.ammo !== Infinity) {
    weapon.ammo--;
  }

  // Log the attack details
  logMessage(`${attacker.name} attacks with ${weaponName} and deals ${weapon.damage} damage!`);
  logMessage(`Zombie health: ${defender.health}`);
}

// Function for zombie attacking player back
function zombieAttack(attacker, defender) {
  const damage = 10; // Fixed damage by zombie
  defender.health -= damage;
  logMessage(`${attacker.type} attacks back and deals ${damage} damage!`);
  logMessage(`Player health: ${defender.health}`);
}

// Run one round of attacks
attackZombie(player, zombie, player.currentWeapon);

// If zombie still alive, zombie attacks back
if (zombie.health > 0) {
  zombieAttack(zombie, player);
}

// Final status messages
if (player.health <= 0) {
  logMessage("💀 Player died! Game over.");
} else if (zombie.health <= 0) {
  logMessage("🎉 Zombie defeated!");
}
