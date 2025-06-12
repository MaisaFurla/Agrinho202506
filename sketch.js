// use as teclas setas para se mover, uso do chat gpt escritas usadas: açoes do p5.j como let e etc, me explique os erros do meu projeto me ajude a arrumar,como fazer para os predios parecerem que estão pulando,por algum motivo quando se da play a bola amarela só e move quando se aperta como maue no jogo.//
let player;
let fruits = [];
let frutasColetadas = 0;
let jogoFinalizado = false;

function setup() {
  createCanvas(800, 400);
  player = new Player(100, height / 2);
  // Criar 15 frutas espalhadas no campo (lado esquerdo)
  for (let i = 0; i < 15; i++) {
    fruits.push(new Fruit(random(20, width / 2 - 30), random(height / 2 + 20, height - 30)));
  }
}

function draw() {
  background(135, 206, 235); // céu azul claro

  // Divisão entre campo e cidade
  stroke(0);
  strokeWeight(2);
  line(width / 2, 0, width / 2, height);
  noStroke();

  // ------------------ CAMPO ------------------
  fill(34, 139, 34);
  rect(0, height / 2, width / 2, height / 2);

  // Sol
  fill(255, 204, 0);
  ellipse(100, 100, 80, 80);

  // Árvores
  for (let i = 50; i < width / 2; i += 100) {
    drawTree(i, height / 2);
  }

  // ------------------ CIDADE ------------------
  fill(50);
  rect(width / 2, height / 2, width / 2, height / 2);

  // Prédios
  for (let x = width / 2 + 20; x < width; x += 80) {
    let h = random(100, 200);
    fill(100);
    rect(x, height / 2 - h, 60, h);

    // Janelas
    fill(255, 255, 0);
    for (let y = height / 2 - h + 10; y < height / 2; y += 20) {
      rect(x + 10, y, 10, 10);
      rect(x + 35, y, 10, 10);
    }
  }

  // Mercado na cidade (ponto de entrega)
  fill(255, 204, 0);
  rect(width - 100, height / 2 + 50, 70, 50);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Mercado", width - 65, height / 2 + 75);

  // Desenhar frutas no campo
  for (let i = fruits.length - 1; i >= 0; i--) {
    fruits[i].show();
    if (player.coleta(fruits[i])) {
      fruits.splice(i, 1);
      frutasColetadas++;
    }
  }

  // Atualizar e mostrar jogador
  player.move();
  player.show();

  // Se coletou 10 frutas, mostrar mensagem para ir ao mercado
  if (frutasColetadas >= 10 && !jogoFinalizado) {
    fill(0);
    textSize(20);
    textAlign(CENTER);
    text("Vá até o mercado na cidade para entregar!", width / 2, 50);

    // Verificar se jogador está no mercado (área do mercado)
    if (
      player.x > width - 100 &&
      player.x < width - 30 &&
      player.y > height / 2 + 50 &&
      player.y < height / 2 + 100
    ) {
      jogoFinalizado = true;
    }
  }

  if (jogoFinalizado) {
    fill(0, 200, 0, 150);
    rect(0, 0, width, height);
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Parabéns!\nVocê entregou 10 maracujás !\nLucrando cada maracujá azedo 6,49 cada 1", width / 2, height / 2);
    noLoop();
  }

  // HUD
  fill(0);
  textSize(18);
  textAlign(LEFT);
  text("Frutas coletadas: " + frutasColetadas + " / 10", 10, 30);
}

// Player com movimentação básica
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 30;
    this.speed = 4;
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.speed;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.speed;
    if (keyIsDown(UP_ARROW)) this.y -= this.speed;
    if (keyIsDown(DOWN_ARROW)) this.y += this.speed;

    // Limitar dentro do canvas
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  show() {
    fill(255, 255, 0);
    ellipse(this.x, this.y, this.size);
  }

  coleta(fruit) {
    let d = dist(this.x, this.y, fruit.x, fruit.y);
    return d < (this.size / 2 + fruit.size / 2);
  }
}

// Fruta para colher no campo
class Fruit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
  }

  show() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size);
  }
}

function drawTree(x, y) {
  fill(139, 69, 19);
  rect(x - 5, y - 40, 10, 40);
  fill(34, 139, 34);
  ellipse(x, y - 50, 40, 40);
}
