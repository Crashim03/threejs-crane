import * as THREE from "three";
// 'use strict';

let wireframe_value = true;

class Input {
  constructor() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));

    this.rotateCranePositive = false;
    this.rotateCraneNegative = false;

    this.moveCartPositive = false;
    this.moveCartNegative = false;

    this.elevateCranePositive = false;
    this.elevateCraneNegative = false;
  }

  handleKeyDown(event) {
    switch (event.code) {
      case "Digit1":
      case "Digit2":
      case "Digit3":
      case "Digit4":
      case "Digit5":
      case "Digit6":
        this.dispatchSwitchCameraEvent(parseInt(event.key), true);
        break;
      case "KeyQ":
        this.dispatchRotateCraneEvent(1, true);
        break;
      case "KeyA":
        this.dispatchRotateCraneEvent(-1, true);
        break;
      case "KeyW":
        this.dispatchMoveCartEvent(1, true);
        break;
      case "KeyS":
        this.dispatchMoveCartEvent(-1, true);
        break;
      case "KeyE":
        this.dispatchElevateCraneEvent(1, true);
        break;
      case "KeyD":
        this.dispatchElevateCraneEvent(-1, true);
        break;
      default:
        break;
    }

    const imgElement = document.getElementById(event.code);
    if (imgElement) {
      imgElement.src = `./${event.code}-KeyPressed.png`;
    }
  }

  handleKeyUp(event) {
    switch (event.code) {
      case "Digit1":
      case "Digit2":
      case "Digit3":
      case "Digit4":
      case "Digit5":
      case "Digit6":
        this.dispatchSwitchCameraEvent(parseInt(event.key), false);
        break;
      case "KeyQ":
        this.dispatchRotateCraneEvent(1, false);
        break;
      case "KeyA":
        this.dispatchRotateCraneEvent(-1, false);
        break;
      case "KeyW":
        this.dispatchMoveCartEvent(1, false);
        break;
      case "KeyS":
        this.dispatchMoveCartEvent(-1, false);
        break;
      case "KeyE":
        this.dispatchElevateCraneEvent(1, false);
        break;
      case "KeyD":
        this.dispatchElevateCraneEvent(-1, false);
        break;
      default:
        break;
    }

    const imgElement = document.getElementById(event.code);
    if (imgElement) {
      imgElement.src = `./${event.code}-KeyNotPressed.png`;
    }
  }

  dispatchSwitchCameraEvent(camera, isPressed) {
    const switchCameraEvent = new CustomEvent("switchCameraEvent", {
      detail: { camera: camera, isPressed: isPressed },
    });

    document.dispatchEvent(switchCameraEvent);
  }

  dispatchRotateCraneEvent(direction, isPressed) {
    if (direction === 1) {
      this.rotateCranePositive = isPressed;
    } else if (direction === -1) {
      this.rotateCraneNegative = isPressed;
    }

    if (
      (this.rotateCranePositive && this.rotateCraneNegative) ||
      (!this.rotateCranePositive && !this.rotateCraneNegative)
    ) {
      direction = 0;
    } else if (this.rotateCranePositive) {
      direction = 1;
    } else if (this.rotateCraneNegative) { 
      direction = -1;
    }

    const rotateCraneEvent = new CustomEvent("rotateCraneEvent", {
      detail: { direction: direction },
    });

    console.log("Rotate Crane: " + direction);
    document.dispatchEvent(rotateCraneEvent);
  }

  dispatchMoveCartEvent(direction, isPressed) {
    if (direction === 1) {
      this.moveCartPositive = isPressed;
    } else if (direction === -1) {
      this.moveCartNegative = isPressed;
    }

    if (
      (this.moveCartPositive && this.moveCartNegative) ||
      (!this.moveCartPositive && !this.moveCartNegative)
    ) {
      direction = 0;
    } else if (this.moveCartPositive) {
      direction = 1;
    } else if (this.moveCartNegative) { 
      direction = -1;
    }

    const moveCartEvent = new CustomEvent("moveCartEvent", {
      detail: { direction: direction },
    });
    console.log("Move Cart: " + direction);
    document.dispatchEvent(moveCartEvent);
  }

  dispatchElevateCraneEvent(direction, isPressed) {
    if (direction === 1) {
      this.elevateCranePositive = isPressed;
    } else if (direction === -1) {
      this.elevateCraneNegative = isPressed;
    }

    if (
      (this.elevateCranePositive && this.elevateCraneNegative) ||
      (!this.elevateCranePositive && !this.elevateCraneNegative)
    ) {
      direction = 0;
    } else if (this.elevateCranePositive) {
      direction = 1;
    } else if (this.elevateCraneNegative) { 
      direction = -1;
    }

    const elevateCranteEvent = new CustomEvent("elevateCraneEvent", {
      detail: { direction: direction },
    });
    console.log("Elevate Crane: " + direction);
    document.dispatchEvent(elevateCranteEvent);
  }
}

class Cameras {
  constructor(crane) {
    let SCREEN_WIDTH = window.innerWidth;
    let SCREEN_HEIGHT = window.innerHeight;
    
    const aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    const frustumSize = 200;
    
    const frontalCamera = new THREE.OrthographicCamera(
      (-frustumSize * aspect) / 2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      1000
    );
    frontalCamera.position.z = 500;
    frontalCamera.lookAt(0, 0, 0);
    frontalCamera.position.y = 50;
    
    const lateralCamera = new THREE.OrthographicCamera(
      (-frustumSize * aspect) / 2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      1000
    );
    lateralCamera.position.x = 50;
    
    lateralCamera.lookAt(0, 0, 0);
    lateralCamera.position.y = 50;
    
    const topCamera = new THREE.OrthographicCamera(
      (-frustumSize * aspect) / 2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      1000
    );
    topCamera.position.y = 100;
    topCamera.lookAt(0, 0, 0);
    
    const fixedOrtCamera = new THREE.OrthographicCamera(
      (-frustumSize * aspect) / 2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      1000
    );
    fixedOrtCamera.position.set(150, 150, 150);
    fixedOrtCamera.lookAt(0, 0, 0);
    
    const fixedPersCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    fixedPersCamera.position.set(150, 150, 150);
    fixedPersCamera.lookAt(0, 0, 0);
    
    const movableCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    movableCamera.position.set(150, 150, 150);
    movableCamera.lookAt(0, 0, 0);
    
    this.camerasList = [
      frontalCamera,
      lateralCamera,
      topCamera,
      fixedOrtCamera,
      fixedPersCamera,
      movableCamera,
    ];
    this.currentCamera = frontalCamera;
    document.addEventListener(
      "switchCameraEvent",
      this.handleSwitchCamera.bind(this)
    );
    
  }
  
  handleSwitchCamera(event) {
    if (
      !event.detail.isPressed ||
      event.detail.camera - 1 === this.camerasList.indexOf(this.currentCamera)
    ) {
      return;
    }
    
    this.currentCamera = this.camerasList[event.detail.camera - 1];
    console.log("Switched to camera: " + event.detail.camera);
  }
}

class UpperClaws {
  constructor() {
    this.upperClaws = new THREE.Group();

    let upper_claw_1 = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 10),
      material
    );
    upper_claw_1.position.set(5, -2, 5);
    upper_claw_1.rotateOnAxis(new THREE.Vector3(-1, 0, 1), Math.PI / 8); // Rotate 45 degrees around X axis

    let upper_claw_2 = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 10),
      material
    );
    upper_claw_2.position.set(-5, -2, -5);
    upper_claw_2.rotateOnAxis(new THREE.Vector3(-1, 0, 1), -Math.PI / 8); // Rotate 45 degrees around X axis

    let upper_claw_3 = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 10),
      material
    );
    upper_claw_3.position.set(-5, -2, 5);
    upper_claw_3.rotateOnAxis(new THREE.Vector3(1, 0, 1), -Math.PI / 8); // Rotate 45 degrees around X axis

    let upper_claw_4 = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 10),
      material
    );
    upper_claw_4.position.set(5, -2, -5);
    upper_claw_4.rotateOnAxis(new THREE.Vector3(-1, 0, -1), -Math.PI / 8); // Rotate 45 degrees around X axis

    this.upperClaws.add(upper_claw_1, upper_claw_2, upper_claw_3, upper_claw_4);
  }
}

class BottomClaws {
  constructor() {

    this.bottomClaws = new THREE.Group();

    let lower_claw_1 = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 5),
      material
    );
    lower_claw_1.position.set(5, -8, 5);
    lower_claw_1.rotateOnAxis(new THREE.Vector3(-1, 0, 1), -Math.PI / 4); // Rotate 45 degrees around X axis
    
    let lower_claw_2 = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 5),
      material
    );
    lower_claw_2.position.set(-5, -8, -5);
    lower_claw_2.rotateOnAxis(new THREE.Vector3(-1, 0, 1), Math.PI / 4); // Rotate 45 degrees around X axis

    let lower_claw_3 = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 5),
      material
    );
    lower_claw_3.position.set(-5, -8, 5);
    lower_claw_3.rotateOnAxis(new THREE.Vector3(1, 0, 1), Math.PI / 4); // Rotate 45 degrees around X axis

    let lower_claw_4 = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 5),
      material
    );
    lower_claw_4.position.set(5, -8, -5);
    lower_claw_4.rotateOnAxis(new THREE.Vector3(-1, 0, -1), Math.PI / 4); // Rotate 45 degrees around X axis
    
    this.bottomClaws.add(lower_claw_1, lower_claw_2, lower_claw_3, lower_claw_4);
  }
}

class Claws {
  constructor() {
    const material = new THREE.MeshBasicMaterial({
      color: THREE.Color.NAMES.green,
      wireframe: true
    });
    
    this.clawsGroup = new THREE.Group();

    this.clawsDirection = 0;
    this.clawsSpeed = 10;

    this.clock = new THREE.Clock();
    
    let upper_claws = new UpperClaws(material).upperClaws;
    let lower_claws = new THREE.Group();

    let height = 4;

    let claw_base = new THREE.Mesh(
      new THREE.CylinderGeometry(6, 6, height),
      material
    );
    claw_base.position.set(0, height, 0);

    
    //------------------------------------------------------------------------------------------------------------

    let lower_claw_1 = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 5),
      material
    );
    lower_claw_1.position.set(5, -8, 5);
    lower_claw_1.rotateOnAxis(new THREE.Vector3(-1, 0, 1), -Math.PI / 4); // Rotate 45 degrees around X axis
    
    let lower_claw_2 = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 5),
      material
    );
    lower_claw_2.position.set(-5, -8, -5);
    lower_claw_2.rotateOnAxis(new THREE.Vector3(-1, 0, 1), Math.PI / 4); // Rotate 45 degrees around X axis

    let lower_claw_3 = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 5),
      material
    );
    lower_claw_3.position.set(-5, -8, 5);
    lower_claw_3.rotateOnAxis(new THREE.Vector3(1, 0, 1), Math.PI / 4); // Rotate 45 degrees around X axis

    let lower_claw_4 = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 5),
      material
    );
    lower_claw_4.position.set(5, -8, -5);
    lower_claw_4.rotateOnAxis(new THREE.Vector3(-1, 0, -1), Math.PI / 4); // Rotate 45 degrees around X axis

    lower_claws.add(lower_claw_1, lower_claw_2, lower_claw_3, lower_claw_4);

    this.clawsGroup.add(upper_claws, lower_claws, claw_base);
  }
  
  handleElevateCrane(event) {
    this.clawsDirection = event.detail.direction;
  }

  update() {
    let deltaTime = this.clock.getDelta();

    if (this.clawsDirection === 0) {
      return;
    }

    let newPosition = this.clawsGroup.position.y + this.clawsDirection * deltaTime * this.clawsSpeed;
    this.clawsGroup.position.set(this.clawsGroup.position.x, newPosition, this.clawsGroup.position.z);
  }
}

class Jib {
  constructor(material) {
    this.jib = new THREE.Mesh(new THREE.CylinderGeometry(3.33, 3.33, 90, 3), material);
    this.jib.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
    this.jib.rotateOnAxis(new THREE.Vector3(-1, 0, 0), -Math.PI / 2);
    this.jib.position.set(70.1, 93.33, 0);
  }
}

class CounterJib {
  constructor(material) {
    this.backJib = new THREE.Mesh(new THREE.BoxGeometry(35, 5, 5), material);
    this.backJib.position.set(8.650, 92.5, 0);

    this.counterWeight = new THREE.Mesh(
      new THREE.BoxGeometry(10, 15, 5),
      material
    );
    this.counterWeight.position.set(0, 87.5, 0);

    this.counterJib = new THREE.Group();
    this.counterJib.add(this.backJib, this.counterWeight);
  }
}

class TowerPeak {
  constructor(material) {
    this.towerPeak = new THREE.Mesh(
      new THREE.CylinderGeometry(0, 5, 12, 3),
      material
    );
    this.towerPeak.position.set(23.5, 101, 0);
    this.towerPeak.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 6);
  }
}

class BackLine {
  constructor(material) {
    this.backLine = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 30, 64),
      material
    );
    this.backLine.rotateOnAxis(new THREE.Vector3(0, 0, -11), Math.PI / 32);
    this.backLine.position.set(7.4, 101, 0);
  }
}

class MainLine {
  constructor(material) {
    this.mainLine = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 93.275, 64),
      material
    );
    this.mainLine.rotateOnAxis(new THREE.Vector3(0, 0, -1), -82.608 * Math.PI / 180);
    this.mainLine.position.set(70, 101, 0);
  }
}

class Cabine {
  constructor(material) {
    this.cabine = new THREE.Mesh(new THREE.BoxGeometry(8, 5, 8), material);
    this.cabine.position.set(30, 87.5, 0);
  }
}

class TopCrane {
  constructor() {
    const material = new THREE.MeshBasicMaterial({
      color: THREE.Color.NAMES.yellow,
      wireframe: wireframe_value
    });

    this.clock = new THREE.Clock();
    this.rotateDirection = 0;
    this.rotationSpeed = 10;

    this.topCraneGroup = new THREE.Group();

    this.topCraneGroup.position.set(22.5, 0, 0);

    let cabine = new Cabine(material).cabine;
    cabine.position.x -= 15;
    let counterJib = new CounterJib(material).counterJib;
    counterJib.position.x -= 22.5;
    let jib = new Jib(material).jib;
    jib.position.x -= 22.5;
    let towerPeak = new TowerPeak(material).towerPeak;
    towerPeak.position.x -= 22.5;
    let backLine = new BackLine(material).backLine;
    backLine.position.x -= 22.5;
    let mainLine = new MainLine(material).mainLine;
    mainLine.position.x -= 22.5;
    this.cart = new Cart();
    
    this.topCraneGroup.add(cabine, counterJib, jib, towerPeak, backLine, mainLine, this.cart.cartModel);

    document.addEventListener(
      "rotateCraneEvent",
      this.handleRotateCrane.bind(this)
    );
  }

  handleRotateCrane(event) {
    this.rotateDirection = event.detail.direction;
  }

  rotateCrane(deltaTime) {
    this.topCraneGroup.rotateOnAxis(
      new THREE.Vector3(0, 1, 0),
      this.rotateDirection * deltaTime * this.rotationSpeed
    );
  }

  update() {
    this.cart.update()

    let deltaTime = this.clock.getDelta();
    if (this.rotateDirection !== 0) {
      this.rotateCrane(deltaTime);
    }
  }
}

class Base {
  constructor(material) {
    this.base = new THREE.Mesh(new THREE.BoxGeometry(20, 10, 20), material);
    this.base.position.set(22.5, -5, 0);
  }
}

class Tower {
  constructor(material) {
    this.tower = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 90, 3),
      material
    );
    this.tower.position.set(23.5, 45, 0);
    this.tower.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 6);
  }
}

class Exterior {
  constructor() {
    this.exteriorModels = new THREE.Group();
    const material = new THREE.MeshBasicMaterial({
      color: THREE.Color.NAMES.green,
      wireframe: true
    });
    this.container = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), material);
    this.container.position.set(0, 0, 25);
    this.exteriorModels.add(this.container);
  }
}

class Cart {
  constructor() {
    this.cartModel = new THREE.Group();
    this.clock = new THREE.Clock();
    const material = new THREE.MeshBasicMaterial({
      color: THREE.Color.NAMES.green,
      wireframe: true
    });
    this.cartModel.add(new THREE.Mesh(new THREE.BoxGeometry(5, 2, 5), material));
    
    this.cartDirection = 0;
    this.cartSpeed = 10;
    this.cartMaxPosition = 10;
    
    document.addEventListener("moveCartEvent", this.handleMoveCart.bind(this));
  }

  handleMoveCart(event) {
    this.cartVelocity = event.detail.direction;
    console.log(this.cartModel.rotation);
  }

  update() {
    let deltaTime = this.clock.getDelta();
    
    if (this.cartDirection === 0) {
      return;
    }
    
    let nextPosition = this.cartModel.position.x + this.cartDirection * this.cartSpeed * deltaTime;
    if (nextPosition > this.cartMaxPosition) {
      nextPosition = this.cartMaxPosition;
    } else if (nextPosition < 0) {
      nextPosition = 0;
    }
    this.cartModel.position.set(nextPosition, this.cartModel.position.y, this.cartModel.position.z);
  }
}
class Crane {
  constructor() {
    const material = new THREE.MeshBasicMaterial({
      color: THREE.Color.NAMES.grey,
      wireframe: wireframe_value
    });

    this.craneGroup = new THREE.Group();

    this.claws = new Claws();

    let base = new Base(material).base;
    let tower = new Tower(material).tower;
    this.topCrane = new TopCrane();

    this.craneGroup.add(base, tower, this.topCrane.topCraneGroup);
  }

  update() {
    this.topCrane.update();
  }
}

class MainScene {
  constructor(crane, cameras) {
    this.cameras = cameras;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("lightblue");
    
    let SCREEN_WIDTH = window.innerWidth;
    let SCREEN_HEIGHT = window.innerHeight;
    
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    document.body.appendChild(this.renderer.domElement);
    
    this.scene.add(new THREE.AxesHelper(100000));
    this.animate = this.animate.bind(this);
    
    this.scene.add(crane.craneGroup);
    window.addEventListener("resize", this.resize.bind(this));
  }
  animate() {
    requestAnimationFrame(this.animate);
    crane.update();
    this.renderer.render(this.scene, this.cameras.currentCamera);
  }
  
  resize() {
    console.log("Update window");
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setSize(width, height);
    
    this.cameras.camerasList.forEach(camera => {
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
      else {
        const aspect = width / height;
        const frustumHeight = camera.top - camera.bottom;
        
        const newWidth = aspect * frustumHeight;
        const newHeight = frustumHeight;
        
        camera.left = -newWidth / 2;
        camera.right = newWidth / 2;
        camera.top = newHeight / 2;
        camera.bottom = -newHeight / 2;
        camera.updateProjectionMatrix();
      }
    });
  }
}

new Input();
let crane = new Crane();
let cameras = new Cameras(crane);
let mainScene = new MainScene(crane, cameras);
mainScene.animate();
