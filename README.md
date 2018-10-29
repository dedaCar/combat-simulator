# combat-simulator
Simulation of combat, with five different units, which are randomly attacking each other, until only &lt;= 2 are left.
We have asynchronous combat simulator with five different units, every unit has: 
- name
-	health (100)
-	rechargeTime (1000 * health/100)
-	damage (health/100)
-	criticalChance (10 - health/10);
Every unit that charges only deliveres damage, it does not get any damage. For unit to attack, it needs to fill its own recharge time. Unit can attac any other unit that has healt>0.
