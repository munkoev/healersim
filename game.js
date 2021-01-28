//declare
const bossHP = document.getElementById('progressBarFull-boss');
let bossCurHP = textBoss = bossMaxHP = 1000;
bossHP.style.width = `${(bossCurHP / bossMaxHP) * 100}%`;

const tankHP = document.getElementById('progressBarFull-tank');
let tankCurHP = textTank = tankMaxHP = 100;
tankHP.style.width = `${(tankCurHP / tankMaxHP) * 100}%`;

const mana = document.getElementById('progressBarFull-mana');
let manaCur = textMana = manaMax = 2300;
mana.style.width = `${(manaCur / manaMax) * 100}%`;

const dps1HP = document.getElementById('progressBarFull-dps1');
let dps1CurHP = textDps1 = dps1MaxHP = 100;
dps1HP.style.width = `${(dps1CurHP / dps1MaxHP) * 100}%`;

const dps2HP = document.getElementById('progressBarFull-dps2');
let dps2CurHP = textDps2 = dps2MaxHP = 100;
dps2HP.style.width = `${(dps2CurHP / dps2MaxHP) * 100}%`;

const dps3HP = document.getElementById('progressBarFull-dps3');
let dps3CurHP = textDps3 = dps3MaxHP = 100;
dps3HP.style.width = `${(dps3CurHP / dps3MaxHP) * 100}%`;

const healerHP = document.getElementById('progressBarFull-healer');
let healerCurHP = textHealer = healerMaxHP = 100;
healerHP.style.width = `${(healerCurHP / healerMaxHP) * 100}%`;

let i;

//vspom func
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function bossDecay() {
  bossCurHP--;
}
function tankDMG() {
  tankCurHP = tankCurHP - getRandomInt(1, 12)*0.1;
}
function dps1DMG() {
  dps1CurHP = dps1CurHP - 20 * Math.floor(Math.random()*1.2) - 5 * Math.floor(Math.random()*1.5); //16% 33% (5% 25dmg)
  dps1HP.style.width = `${(dps1CurHP / dps1MaxHP) * 100}%`;
  document.getElementById('text-dps1').innerText = `${Math.round(dps1CurHP / dps1MaxHP * 100)}%`;
}
function dps2DMG() {
  dps2CurHP = dps2CurHP - 20 * Math.floor(Math.random()*1.2) - 5 * Math.floor(Math.random()*1.5); //16% 33% (5% 25dmg)
  dps2HP.style.width = `${(dps2CurHP / dps2MaxHP) * 100}%`;
  document.getElementById('text-dps2').innerText = `${Math.round(dps2CurHP / dps2MaxHP * 100)}%`;
}
function dps3DMG() {
  dps3CurHP = dps3CurHP - 20 * Math.floor(Math.random()*1.2) - 5 * Math.floor(Math.random()*1.5); //16% 33% (5% 25dmg)
  dps3HP.style.width = `${(dps3CurHP / dps3MaxHP) * 100}%`;
  document.getElementById('text-dps3').innerText = `${Math.round(dps3CurHP / dps3MaxHP * 100)}%`;
}
function healerDMG() {
  healerCurHP = healerCurHP - 20 * Math.floor(Math.random()*1.2) - 5 * Math.floor(Math.random()*1.5); //16% 33% (5% 25dmg)
  healerHP.style.width = `${(healerCurHP / healerMaxHP) * 100}%`;
  document.getElementById('text-healer').innerText = `${Math.round(healerCurHP / healerMaxHP * 100)}%`;
}

//бесконечный цикл для постоянного дмг
let refreshID = setInterval(() => {
  bossDecay();
  bossHP.style.width = `${(bossCurHP / bossMaxHP) * 100}%`;
  document.getElementById('text-boss').innerText = `${Math.round(bossCurHP / bossMaxHP * 100)}%`;
  if (bossCurHP <= 0) {
    clearInterval(refreshID);
    clearInterval(refreshID2);
    alert("You win");
}
  tankDMG();
  tankHP.style.width = `${(tankCurHP / tankMaxHP) * 100}%`;
  document.getElementById('text-tank').innerText = `${Math.round(tankCurHP / tankMaxHP * 100)}%`;
  if (tankCurHP <= 0) {
    clearInterval(refreshID);
    clearInterval(refreshID2);
    alert("You loose");
}
  mana.style.width = `${(manaCur / manaMax) * 100}%`;
  document.getElementById('text-mana').innerText = `${Math.round(manaCur / manaMax * 100)}%`;
  dps1HP.style.width = `${(dps1CurHP / dps1MaxHP) * 100}%`;
  document.getElementById('text-dps1').innerText = `${Math.round(dps1CurHP / dps1MaxHP * 100)}%`;
  dps2HP.style.width = `${(dps2CurHP / dps2MaxHP) * 100}%`;
  document.getElementById('text-dps2').innerText = `${Math.round(dps2CurHP / dps2MaxHP * 100)}%`;
  dps3HP.style.width = `${(dps3CurHP / dps3MaxHP) * 100}%`;
  document.getElementById('text-dps3').innerText = `${Math.round(dps3CurHP / dps3MaxHP * 100)}%`;
  healerHP.style.width = `${(healerCurHP / healerMaxHP) * 100}%`;
  document.getElementById('text-healer').innerText = `${Math.round(healerCurHP / healerMaxHP * 100)}%`;
}, 100);
//бесконечный цикл для непостоянного дмг
let refreshID2 = setInterval(() => {
  dps1DMG();
  dps2DMG();
  dps3DMG();
  healerDMG();
  if (dps1CurHP <= 0 || dps2CurHP <= 0 || dps3CurHP <= 0 || healerCurHP <=0) {
    clearInterval(refreshID2);
    clearInterval(refreshID);
    alert("You loose");
}
}, 1000);

//target handling

const mouseTargettank = document.getElementById('bar2');
const mouseTargetdps1 = document.getElementById('bar3');
const mouseTargetdps2 = document.getElementById('bar4');
const mouseTargetdps3 = document.getElementById('bar5');
const mouseTargethealer = document.getElementById('bar6');
let mouseTarget = '';

mouseTargettank.addEventListener('mouseenter', e => {
  mouseTargettank.style.outline = '5px solid red';
  mouseTarget='tank';
});
mouseTargettank.addEventListener('mouseleave', e => {
  mouseTargettank.style.outline = '0px brown';
  mouseTarget = '';
});

mouseTargetdps1.addEventListener('mouseenter', e => {
  mouseTargetdps1.style.outline = '5px solid red';
  mouseTarget='dps1';
});
mouseTargetdps1.addEventListener('mouseleave', e => {
  mouseTargetdps1.style.outline = '0px brown';
  mouseTarget = '';
});

mouseTargetdps2.addEventListener('mouseenter', e => {
  mouseTargetdps2.style.outline = '5px solid red';
  mouseTarget='dps2';
});
mouseTargetdps2.addEventListener('mouseleave', e => {
  mouseTargetdps2.style.outline = '0px brown';
  mouseTarget = '';
});

mouseTargetdps3.addEventListener('mouseenter', e => {
  mouseTargetdps3.style.outline = '5px solid red';
  mouseTarget='dps3';
});
mouseTargetdps3.addEventListener('mouseleave', e => {
  mouseTargetdps3.style.outline = '0px brown';
  mouseTarget = '';
});

mouseTargethealer.addEventListener('mouseenter', e => {
  mouseTargethealer.style.outline = '5px solid red';
  mouseTarget='healer';
});
mouseTargethealer.addEventListener('mouseleave', e => {
  mouseTargethealer.style.outline = '0px brown';
  mouseTarget = '';
});

//spell
let spell1cost=20, spell1heal=20
let spell2cost=10, spell2heal=8
let spell3cost=100, spell3heal=40

document.addEventListener("keypress", (event) => {
    if (event.key==='1' && manaCur >= spell1cost) {
        if (mouseTarget === 'tank') {
        tankCurHP = Math.min(tankCurHP + spell1heal, tankMaxHP);
        manaCur = manaCur - spell1cost;
        }
        else if (mouseTarget === 'dps1') {
        dps1CurHP = Math.min(dps1CurHP + spell1heal, dps1MaxHP);
        manaCur = manaCur - spell1cost;
        }
        else if (mouseTarget === 'dps2') {
        dps2CurHP = Math.min(dps2CurHP + spell1heal, dps2MaxHP);
        manaCur = manaCur - spell1cost;
        }
        else if (mouseTarget === 'dps3') {
        dps3CurHP = Math.min(dps3CurHP + spell1heal, dps3MaxHP);
        manaCur = manaCur - spell1cost;
        }
        else if (mouseTarget === 'healer') {
        healerCurHP = Math.min(healerCurHP + spell1heal, healerMaxHP);
        manaCur = manaCur - spell1cost;
        }
        }
    else if (event.key==='2' && manaCur >= spell2cost) {
        tankCurHP = Math.min(tankCurHP + spell2heal, tankMaxHP);
        dps1CurHP = Math.min(dps1CurHP + spell2heal, dps1MaxHP);
        dps2CurHP = Math.min(dps2CurHP + spell2heal, dps2MaxHP);
        dps3CurHP = Math.min(dps3CurHP + spell2heal, dps3MaxHP);
        healerCurHP = Math.min(healerCurHP + spell2heal, healerMaxHP);
        manaCur = manaCur - spell2cost;
    }
    else if (event.key==='3' && manaCur >= spell3cost) {
        if (mouseTarget === 'tank') {
        tankCurHP = Math.min(tankCurHP + spell3heal, tankMaxHP);
        healerCurHP = Math.min(healerCurHP + spell3heal, healerMaxHP);
        dps1CurHP = Math.min(dps1CurHP + spell3heal, dps1MaxHP);
        manaCur = manaCur - spell3cost;
        }
        else if (mouseTarget === 'dps1') {
        tankCurHP = Math.min(tankCurHP + spell3heal, tankMaxHP);
        dps1CurHP = Math.min(dps1CurHP + spell3heal, dps1MaxHP);
        dps2CurHP = Math.min(dps2CurHP + spell3heal, dps2MaxHP);
        manaCur = manaCur - spell3cost;
        }
        else if (mouseTarget === 'dps2') {
        dps1CurHP = Math.min(dps1CurHP + spell3heal, dps1MaxHP);
        dps2CurHP = Math.min(dps2CurHP + spell3heal, dps2MaxHP);
        dps3CurHP = Math.min(dps3CurHP + spell3heal, dps3MaxHP);
        manaCur = manaCur - spell3cost;
        }
        else if (mouseTarget === 'dps3') {
        dps2CurHP = Math.min(dps2CurHP + spell3heal, dps2MaxHP);
        dps3CurHP = Math.min(dps3CurHP + spell3heal, dps3MaxHP);
        healerCurHP = Math.min(healerCurHP + spell3heal, healerMaxHP);
        manaCur = manaCur - spell3cost;
        }
        else if (mouseTarget === 'healer') {
        tankCurHP = Math.min(tankCurHP + spell3heal, tankMaxHP);
        healerCurHP = Math.min(healerCurHP + spell3heal, healerMaxHP);
        dps3CurHP = Math.min(dps3CurHP + spell3heal, dps3MaxHP);
        manaCur = manaCur - spell3cost;
        }
        }

});