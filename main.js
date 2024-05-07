import * as THREE from "three";
'use strict';

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

class Claws {
  // TODO
  constructor() {
    const material = new THREE.MeshBasicMaterial({
      color: THREE.Color.NAMES.green,
      wireframe: true
    });
    
    this.upper_claws = new THREE.Group();
    this.lower_claws = new THREE.Group();
    this.clawsModels = new THREE.Group();

    let height = 4;

    this.claw_base = new THREE.Mesh(
      new THREE.CylinderGeometry(6, 6, height),
      material
    );
    this.claw_base.position.set(0, height, 0);

    this.upper_claw_1 = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 10),
      material
    );
    this.upper_claw_1.position.set(5, -2, 5);
    this.upper_claw_1.rotateOnAxis(new THREE.Vector3(-1, 0, 1), Math.PI / 8); // Rotate 45 degrees around X axis

    this.upper_claw_2 = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 10),
      material
    );
    this.upper_claw_2.position.set(-5, -2, -5);
    this.upper_claw_2.rotateOnAxis(new THREE.Vector3(-1, 0, 1), -Math.PI / 8); // Rotate 45 degrees around X axis

    this.upper_claw_3 = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 10),
      material
    );
    this.upper_claw_3.position.set(-5, -2, 5);
    this.upper_claw_3.rotateOnAxis(new THREE.Vector3(1, 0, 1), -Math.PI / 8); // Rotate 45 degrees around X axis

    this.upper_claw_4 = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 10),
      material
    );
    this.upper_claw_4.position.set(5, -2, -5);
    this.upper_claw_4.rotateOnAxis(new THREE.Vector3(-1, 0, -1), -Math.PI / 8); // Rotate 45 degrees around X axis

    this.upper_claws.add(this.upper_claw_1, this.upper_claw_2, this.upper_claw_3, this.upper_claw_4);
    
    //------------------------------------------------------------------------------------------------------------

    this.lower_claw_1 = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 5),
      material
    );
    this.lower_claw_1.position.set(5, -8, 5);
    this.lower_claw_1.rotateOnAxis(new THREE.Vector3(-1, 0, 1), -Math.PI / 4); // Rotate 45 degrees around X axis
    
    this.lower_claw_2 = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 5),
      material
    );
    this.lower_claw_2.position.set(-5, -8, -5);
    this.lower_claw_2.rotateOnAxis(new THREE.Vector3(-1, 0, 1), Math.PI / 4); // Rotate 45 degrees around X axis

    this.lower_claw_3 = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 5),
      material
    );
    this.lower_claw_3.position.set(-5, -8, 5);
    this.lower_claw_3.rotateOnAxis(new THREE.Vector3(1, 0, 1), Math.PI / 4); // Rotate 45 degrees around X axis

    this.lower_claw_4 = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 5),
      material
    );
    this.lower_claw_4.position.set(5, -8, -5);
    this.lower_claw_4.rotateOnAxis(new THREE.Vector3(-1, 0, -1), Math.PI / 4); // Rotate 45 degrees around X axis

    this.lower_claws.add(this.lower_claw_1, this.lower_claw_2, this.lower_claw_3, this.lower_claw_4);

    this.clawsModels.add(this.upper_claws, this.lower_claws, this.claw_base);
  }
}

class Crane {
  constructor() {
    this.clock = new THREE.Clock();
    this.craneModels = new THREE.Group();

    this.rotateVelocity = 0;
    this.rotationSpeed = 10;

    this.moveCartVelocity = 0;
    this.moveCartSpeed = 10;

    this.elevateVelocity = 0;
    this.elevateSpeed = 10;

    this.claws = new Claws();

    const material = new THREE.MeshBasicMaterial({
      color: THREE.Color.NAMES.green,
      wireframe: true
    });

    let base = new THREE.Mesh(new THREE.BoxGeometry(20, 10, 20), material);
    base.position.set(22.5, -5, 0);

    this.tower = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 90, 3),
      material
    );
    this.tower.position.set(23.5, 45, 0);
    this.tower.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 6);

    this.cabine = new THREE.Mesh(new THREE.BoxGeometry(8, 5, 8), material);
    this.cabine.position.set(30, 87.5, 0);

    this.topCrane = new THREE.Group();
    let topBackCrane = new THREE.Group();

    let counterWeight = new THREE.Mesh(
      new THREE.BoxGeometry(10, 15, 5),
      material
    );
    counterWeight.position.set(0, 87.5, 0);

    topBackCrane.add(counterWeight);

    let counterJib = new THREE.Mesh(new THREE.BoxGeometry(35, 5, 5), material);
    counterJib.position.set(8.650, 92.5, 0);

    topBackCrane.add(counterJib);

    this.spear_holder = new THREE.Mesh(
      new THREE.CylinderGeometry(0, 5, 12, 3),
      material
    );
    this.spear_holder.position.set(23.5, 101, 0);
    this.spear_holder.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 6);

    topBackCrane.add(this.spear_holder);

    this.stay_rod_1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 30, 64),
      material
    );
    this.stay_rod_1.rotateOnAxis(new THREE.Vector3(0, 0, -11), Math.PI / 32);
    this.stay_rod_1.position.set(7.4, 101, 0);
    
    topBackCrane.add(this.stay_rod_1);

    this.stay_rod_2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 93.275, 64),
      material
    );
    this.stay_rod_2.rotateOnAxis(new THREE.Vector3(0, 0, -1), -82.608 * Math.PI / 180);
    this.stay_rod_2.position.set(70, 101, 0);
    
    topBackCrane.add(this.stay_rod_2);

    let Jib = new THREE.Mesh(new THREE.CylinderGeometry(3.33, 3.33, 90, 3), material);
    Jib.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
    Jib.rotateOnAxis(new THREE.Vector3(-1, 0, 0), -Math.PI / 2);
    Jib.position.set(71.1, 93.33, 0);

    topBackCrane.add(Jib);
    
    // Then add the pivot to topCrane
    this.topCrane.add(topBackCrane);
    this.topCrane.add(this.cabine);
    this.craneModels.add(base, this.tower, this.topCrane);

    document.addEventListener(
      "rotateCraneEvent",
      this.handleRotateCrane.bind(this)
    );
    document.addEventListener(
      "moveCartEvent",
      this.handleMoveCart.bind(this)
    );
    document.addEventListener(
      "elevateCraneEvent",
      this.handleElevateCrane.bind(this)
    );
  }

  handleRotateCrane(event) {
    this.rotateVelocity = event.detail.direction;
  }

  handleMoveCart(event) {
    this.moveCartVelocity = event.detail.direction;
  }

  handleElevateCrane(event) {
    this.elevateCrane = event.detail.direction;
  }

  rotateCrane(direction, deltaTime) {
    // Rotate the pivot, which will rotate topCrane around its edge
    this.topCrane.children[0].rotateOnAxis(
      new THREE.Vector3(0, 1, 0),
      direction * deltaTime * this.rotationSpeed
    );
  }

  moveCart(direction, deltaTime) {}

  elevateCrane(direction, deltaTime) {}

  update() {
    let deltaTime = this.clock.getDelta();

    if (this.rotateVelocity !== 0) {
      this.rotateCrane(this.rotateVelocity, deltaTime);
    }
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

    this.scene.add(crane.craneModels);
    this.scene.add(crane.claws.clawsModels);
    this.scene.add(new Exterior().exteriorModels);
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

// TODO: macros for crane sizes and positions

new Input();
let crane = new Crane();
let cameras = new Cameras(crane);
let mainScene = new MainScene(crane, cameras);
mainScene.animate();
