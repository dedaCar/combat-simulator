class Unit {
	constructor(name) {
		this.name = name;
		this.health = 100;
		this.currentHealth = this.health;
		this.lastActionTime = 0;
	}

	get rechargeTime() {
		const customRechargeTime = 1000 * this.health / 100;
		return customRechargeTime;
	}

	get damage() {
		const customDamage = this.health / 100;
		return customDamage;
	}

	get criticalChance() {
		const customCriticalChance = Math.floor(10 - this.currentHealth / 10);
		return customCriticalChance;
	}

	get shouldAttack() {
		const nextActionTime = this.lastActionTime + this.rechargeTime;
		if (nextActionTime <= new Date().getTime()) {
			return true;
		}
		return false;
	}
}

const warriors = [
	new Unit('one'),
	new Unit('two'),
	new Unit('three'),
	new Unit('four'),
	new Unit('five'),
];
let isRunning = true;
let currentTime = new Date().getTime();

while (isRunning) {
	const crit = Math.floor(Math.random() * 100);
	currentTime = new Date().getTime();

	for (let i = 0; i < warriors.length; i += 1) {
		const warrior = warriors[i];
		if (warrior.currentHealth <= 0) {
			warriors.splice(i, 1);
		}

		if (warrior.shouldAttack) {
			const opponents = warriors.slice();
			opponents.splice(i, 1);

			const opponent = opponents[Math.floor(Math.random() * opponents.length)];

			if (warrior.criticalChance >= crit) {
				opponent.currentHealth -= warrior.damage + warrior.criticalChance;
				console.log(`${warrior.name}{${warrior.currentHealth} HP} attacked ${opponent.name} {${opponent.currentHealth} HP} for ${warrior.damage + warrior.criticalChance}`);
			} else {
				opponent.currentHealth -= warrior.damage;
				console.log(`${warrior.name}{${warrior.currentHealth} HP} attacked ${opponent.name} {${opponent.currentHealth} HP} for ${warrior.damage}`);
			}


			warrior.lastActionTime = currentTime;

			if (warriors.length <= 2) {
				console.log(`Survivor(s): ${JSON.stringify(warriors)}`);
				isRunning = false;
				break;
			}
		}
	}
}
