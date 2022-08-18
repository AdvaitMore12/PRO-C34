const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var player;
var playerAxe;
var axe = [];
var target1, target2;
var numberOfAxe = 10;

var score = 0;

function preload(){
 bgImg = loadImage("./assets/background.png");
 
}
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
  
    engine = Engine.create();
    world = engine.world;
  
   
    player = new Player(285, 153, 50, 180);
    playerAxe = new PlayerAxe( 340,180,120,120);
  
    target1 = new target(width - 300, 330, 50, 200);
    target2 = new target(width - 550, height - 300, 50, 200);
  }

  function draw() {
    background(backgroundImg);
  
    Engine.update(engine);
  
    player.display();
    playerAxe.display();
  
    target1.display();
    target2.display();
  
    for (var i = 0; i < axe.length; i++) {
      if (axe[i] !== undefined) {
        axe[i].display();
  
        var target1Collision = Matter.SAT.collides(
          target1.body,
          axe[i].body
        );
  
        var target2Collision = Matter.SAT.collides(
          target2.body,
          axe[i].body
        );
  
        if (target1Collision.collided || target2Collision.collided) {
         score += 5;
        }
  
    
  
        
        var posX = axe[i].body.position.x;
        var posY = axe[i].body.position.y;
  
        if (posX > width || posY > height) {
          if (!axe[i].isRemoved) {
            axe[i].remove(i);
          } else {
            axe[i].trajectory = [];
          }
        }
      }
    }

  
    // Score
    fill("#FFFF");
    textAlign("center");
    textSize(30);
    text("Score " + score, width - 200, 100);
  
    // Axe Count
    fill("#FFFF");
    textAlign("center");
    textSize(30);
    text("Remaining Axe : " + numberOfAxe, 200, 100);

  
    if (numberOfAxe == 0) {
      gameOver();
    }

  }
  
  function keyPressed() {
    if (keyCode === 32) {
      if (numberOfAxe > 0) {
        var posX = playerAxe.body.position.x;
        var posY = playerAxe.body.position.y;
        var angle = playerAxe.body.angle;
  
        var axe = new axe(posX, posY, 100, 10, angle);
  
        axe.trajectory = [];
        Matter.Body.setAngle(axe.body, angle);
        axe.push(axe);
        numberOfAxe -= 1;

        axe.changeAnimation('axeAn');
      }
    }
  }
  
  function keyReleased() {
    if (keyCode === 32) {
      if (axe.length) {
        var angle = playerAxe.body.angle;
        axe[axe.length - 1].shoot(angle);
      }
    }
  }
  
  function gameOver() {
    swal(
      {
        title: `Game Over!!!`,
        text: "Thanks for playing!!",
        imageUrl:
          "https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/target.png",
        imageSize: "150x150",
        confirmButtonText: "Play Again"
      },
      function(isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
  }
  
  