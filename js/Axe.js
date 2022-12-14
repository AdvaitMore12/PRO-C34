class Axe {
    constructor(x, y, width, height, playerAngle) {
      var options = {
        isStatic: true,
        density: 0.1
      };
      this.width = width;
      this.height = height;
      this.body = Bodies.rectangle(x, y, this.width, this.height, options);
      this.image = loadImage("./assets/Axe.png");
      axeAn = loadAnimation("./assets/Axe.png","./assets/Axe2.png","./assets/Axe3.png","./assets/Axe4.png");
      this.playerAngle = playerAngle;
      this.velocity = p5.Vector.fromAngle(playerAngle);
      World.add(world, this.body);
    }
  
    remove(index) {
      this.isRemoved = true;
      Matter.World.remove(world, this.body);
      delete axe[index];
    }
  
    shoot(playerAngle) {
      this.velocity = p5.Vector.fromAngle(playerAngle + PI / 2);
      this.velocity.mult(55);
  
      Matter.Body.setVelocity(this.body, {
        x: this.velocity.x,
        y: this.velocity.y
      });
  
      Matter.Body.setStatic(this.body, false);
    }
  
    display() {
      var tmpAngle;
      if (this.body.velocity.y === 0) {
        tmpAngle = this.playerAngle + PI / 2;
      } else {
        tmpAngle = Math.atan(this.body.velocity.y / this.body.velocity.x);
      }
  
      Matter.Body.setAngle(this.body, tmpAngle);
  
      var pos = this.body.position;
      var angle = this.body.angle;
  
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.image, 0, 0, this.width, this.height);
      pop();
  
      if (this.body.velocity.x > 0 && this.body.position.x > 400) {
        var position = [this.body.position.x, this.body.position.y];
        this.trajectory.push(position);
      }
  
      for (var i = 0; i < this.trajectory.length; i++) {
        fill("white");
        ellipse(this.trajectory[i][0], this.trajectory[i][1], 5, 5);
      }
    }
  }