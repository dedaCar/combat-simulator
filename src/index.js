function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function findRandomOpponent(warriors, id) {
	const potentialOpponents = warriors.filter(warrior => warrior.id !== id);

	return potentialOpponents[getRandomInt(0, potentialOpponents.length)];
}

class Unit {
	constructor(name) {
		this.id = name + Math.random();
		this.name = name;
		this.health = 100;
		this.currentHealth = this.health;
		this.lastActionTime = 0;
		this.attack();
	}

	rechargeTime() {
		return 1000 * this.health / 100;
	}

	damage() {
		return this.health / 100;
	}

	criticalChance() {
		const chance = 10 - this.currentHealth / 10;
		if (chance >= Math.floor(Math.random() * 100)) {
			return chance;
		}
		return 0;
	}
	attack() {
		setTimeout(() => {
			// if you are dead, remove yourself from battle
			if (this.health < 1) {
				warriors = warriors.filter(warrior => warrior.id !== this.id);
				console.log(`${this.name} LOST!`);
				return;
			}
			// find opponent
			const opponent = findRandomOpponent(warriors, this.id);

			if (!opponent) {
				// no opponents left, you won
				console.log(`${this.name} WON!`);
				return;
			}

			const damage = this.damage() + this.criticalChance();
			console.log(`${this.name}{${this.health} HP} attacked ${opponent.name} {${opponent.health} HP} for ${damage}`);
			opponent.health -= damage;

			this.attack();
		}, this.rechargeTime);
	}
}


let warriors = [
	new Unit('one', 0),
	new Unit('two', 1),
	new Unit('three', 2),
	new Unit('four', 3),
	new Unit('five', 4),
];
