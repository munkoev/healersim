//declare
class Unit {
    constructor(hpbarID, cssID, hpbarText, maxHP, dps, role) {
        this.hpbarID = hpbarID;
        this.cssID = cssID;
        this.maxHP = maxHP;
        this.curHP = maxHP;
        this.hpbarText = hpbarText;
        this.dps = dps;
        this.role = role;
    }
    isAlive() {
        return this.curHP > 0;
    }
}
class Combat {
    constructor(boss, players, spells, mana) {
        this.boss = boss;
        this.players = players;
        this.spells = spells;
        this.mana = mana;
        this.over = false;
        this.tank = players.find((player) => { // suggested N of tanks and healers = 1
            return player.role === 'tank';
        })
        this.healer = players.find((player) => {
            return player.role === 'healer';
        })
        this.period = 0;
        this.onStart();
    }
    onStart() {
        let currentTarget;
        this.players.forEach((player) => {
            const mouseTarget = document.getElementById(player.cssID);
            mouseTarget.addEventListener('mouseenter', () => {
                mouseTarget.style.outline = '5px solid red';
                currentTarget = player;
            });
            mouseTarget.addEventListener('mouseleave', () => {
                mouseTarget.style.outline = '0px brown';
                currentTarget = {};
            });
        });

        document.addEventListener("keypress", (event) => {
            this.spells.forEach((spell) => {
                if (event.key === spell.hotkey && this.mana.curValue >= spell.cost && this.over === false && currentTarget.curHP > 0) {
                    spell.castSpell(currentTarget);
                    this.mana.change(-spell.cost);
                }
            })
        })

        this.refreshID = setInterval(() => {
            this.onCombat();
            this.refreshBars();
        }, 100); //                   declaring refresh frequency
    }
    closeCombat() {
        if (this.healer.curHP <= 0 || this.tank.curHP <= 0 || this.boss.curHP <= 0) {
            clearInterval(this.refreshID);
            this.over = true;
        }
    }
    refreshBars() {
        document.getElementById(this.boss.hpbarID).style.width = `${(this.boss.curHP / this.boss.maxHP) * 100}%`;
        document.getElementById(this.boss.hpbarText).innerText = `${Math.round(this.boss.curHP / this.boss.maxHP * 100)}%`;
        this.players.forEach((player) => {
            document.getElementById(player.hpbarID).style.width = `${(player.curHP / player.maxHP) * 100}%`;
            document.getElementById(player.hpbarText).innerText = `${Math.round(player.curHP / player.maxHP * 100)}%`;
        });
    }
    onCombat() {
        let totalDps = 0;
        this.players.forEach((player) => { //TODO refactor to reduce() later
            if (player.isAlive()) {
                totalDps += player.dps;
            }
        });

        this.boss.curHP -= totalDps;

        this.tank.curHP -= getRandomInt(1, 12) * 0.01 * this.boss.dps;

        this.period++;
        if (this.period % 9 === 1) { //                    declaring refresh frequency for random dmg
            this.players.forEach((player) => {
                player.curHP -=
                    2.0 * this.boss.dps * Math.floor(Math.random()*1.2) +
                    0.5 * this.boss.dps * Math.floor(Math.random()*1.5); //16% 33% (5% 25dmg)
            });
        }
        this.closeCombat();
    }
}
class Mana {
    constructor(maxValue, barID, barText) {
        this.maxValue = maxValue;
        this.curValue = maxValue;
        this.barID = barID;
        this.barText = barText;
    }
    change(value) {
        this.curValue = Math.max(Math.min(this.maxValue, this.curValue + value), 0);
        document.getElementById(this.barID).style.width = `${(this.curValue / this.maxValue) * 100}%`;
        document.getElementById(this.barText).innerText = `${Math.round(this.curValue / this.maxValue * 100)}%`;
    }
}
class Spell {
    constructor(cost, value, hotkey) {
        this.cost = cost;
        this.value = value;
        this.hotkey = hotkey;
    }
}
class TargetHeal extends Spell {
    constructor(cost, value, hotkey) {
        super(cost, value, hotkey);
    }
    castSpell(target) {
        target.curHP = Math.min(target.curHP + this.value, target.maxHP);
    }
}
class AllHeal extends Spell{
    constructor(cost, value, hotkey) {
        super(cost, value, hotkey);
    }
    castSpell() {
        combat.players.forEach((player) => { //can we change this objects??
            player.curHP = Math.min(player.curHP + this.value, player.maxHP);
        })
    }
}
class AOEHeal extends Spell{
    constructor(cost, value, hotkey) {
        super(cost, value, hotkey);
    }
    castSpell(target) {
        let len = combat.players.length;
        let leftN = combat.players[(combat.players.indexOf(target)+len-1)%len];
        let rightN = combat.players[(combat.players.indexOf(target)+1)%len];
        leftN.curHP = Math.min(leftN.curHP + this.value, leftN.maxHP);
        rightN.curHP = Math.min(rightN.curHP + this.value, rightN.maxHP);
        target.curHP = Math.min(target.curHP + this.value, target.maxHP);
        }
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //including max
}

const mana = new Mana(2300, 'progressBarFull-mana', 'text-mana')
const boss = new Unit('progressBarFull-boss', 'bar1', 'text-boss',8000, 10, 'boss');
const tank = new Unit('progressBarFull-tank', 'bar2', 'text-tank',200, 1, 'tank');
const dps1 = new Unit('progressBarFull-dps1', 'bar3', 'text-dps1',100, 3, 'dps');
const dps2 = new Unit('progressBarFull-dps2', 'bar4', 'text-dps2',100, 3, 'dps');
const dps3 = new Unit('progressBarFull-dps3', 'bar5', 'text-dps3',100, 3, 'dps');
const healer = new Unit('progressBarFull-healer', 'bar6', 'text-healer',100, 0, 'healer');
const healTarget = new TargetHeal (20, 18, '1');
const healAll = new AllHeal(10,5,'2');
const healAOE = new AOEHeal(100,40,'3');

let combat = new Combat(boss, [tank, dps1, dps2, dps3, healer], [healTarget, healAll, healAOE], mana)