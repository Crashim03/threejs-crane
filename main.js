import * as THREE from "three";

class Input {
  constructor() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
    this.dict = {};
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
    const rotateCraneEvent = new CustomEvent("rotateCraneEvent", {
      detail: { direction: direction, isPressed: isPressed },
    });
    document.dispatchEvent(rotateCraneEvent);
  }

  dispatchMoveCartEvent(direction, isPressed) {
    const moveCartEvent = new CustomEvent("moveCartEvent", {
      detail: { direction: direction, isPressed: isPressed },
    });
    document.dispatchEvent(moveCartEvent);
  }

  dispatchElevateCraneEvent(direction, isPressed) {
    const elevateCranteEvent = new CustomEvent("elevateCraneEvent", {
      detail: { direction: direction, isPressed: isPressed },
    });
    document.dispatchEvent(elevateCranteEvent);
  }
}

class Claws {
  // TODO
  constructor() {
    const material = new THREE.MeshBasicMaterial({
      color: THREE.Color.NAMES.red,
    });

    this.claws = new THREE.Group();

    this.claw1 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 10), material);
    this.claw1.position.set(4, 0, 4);

    this.claw2 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 10), material);
    this.claw2.position.set(-4, 0, -4);

    this.claw3 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 10), material);
    this.claw3.position.set(-4, 0, 4);

    this.claw4 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 10), material);
    this.claw4.position.set(4, 0, -4);

    this.claws.add(this.claw1, this.claw2, this.claw3, this.claw4);
  }
}

class Crane {
  constructor() {
    this.clock = new THREE.Clock();
    this.crane = new THREE.Group();

    this.rotateCranePositive = false;
    this.rotateCraneNegative = false;
    this.rotationSpeed = 10;

    this.moveCartPositive = false;
    this.moveCartNegative = false;
    this.moveSpeed = 1;

    this.elevateCranePositive = false;
    this.elevateCraneNegative = false;
    this.elevateSpeed = 1;

    this.claws = new Claws();

    const material = new THREE.MeshBasicMaterial({
      color: THREE.Color.NAMES.green,
    });

    let base = new THREE.Mesh(new THREE.BoxGeometry(20, 10, 20), material);
    base.position.set(22.5, -5, 0);

    this.tower = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 90, 3),
      material
    );
    this.tower.position.set(22.5, 45, 0);

    this.topCrane = new THREE.Group();
    let topBackCrane = new THREE.Group();

    this.topCrane.position.set(22.5, 0, 0);

    let counterWeight = new THREE.Mesh(
      new THREE.BoxGeometry(10, 15, 5),
      material
    );
    counterWeight.position.set(5, 95, 0);

    topBackCrane.add(counterWeight);

    let counterJib = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 50, 3),
      material
    );
    counterJib.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
    counterJib.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
    counterJib.position.set(15, 90, 0);

    topBackCrane.add(counterJib);

    // Then add the pivot to topCrane
    this.topCrane.add(topBackCrane);
    this.crane.add(base, this.tower, this.topCrane);

    document.addEventListener(
      "rotateCraneEvent",
      this.handleRotateCrane.bind(this)
    );
    document.addEventListener("moveCartEvent", this.handleMoveCart.bind(this));
    document.addEventListener(
      "elevateCraneEvent",
      this.handleElevateCrane.bind(this)
    );
  }

  handleRotateCrane(event) {
    if (event.detail.direction === 1) {
      this.rotateCranePositive = event.detail.isPressed;
    } else if (event.detail.direction === -1) {
      this.rotateCraneNegative = event.detail.isPressed;
    }
  }

  handleMoveCart(event) {
    if (event.detail.direction === 1) {
      this.moveCartPositive = event.detail.isPressed;
    } else if (event.detail.direction === -1) {
      this.moveCartNegative = event.detail.isPressed;
    }
  }

  handleElevateCrane(event) {
    if (event.detail.direction === 1) {
      this.elevateCranePositive = event.detail.isPressed;
    } else if (event.detail.direction === -1) {
      this.elevateCraneNegative = event.detail.isPressed;
    }
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

    if (this.rotateCranePositive && !this.rotateCraneNegative) {
      this.rotateCrane(1, deltaTime);
    } else if (this.rotateCraneNegative && !this.rotateCranePositive) {
      this.rotateCrane(-1, deltaTime);
    }

    if (this.moveCartPositive && !this.moveCartNegative) {
      this.moveCart(1, deltaTime);
    } else if (this.moveCartNegative && !this.moveCartPositive) {
      this.moveCart(-1, deltaTime);
    }

    if (this.elevateCranePositive && !this.elevateCraneNegative) {
      this.elevateCrane(1, deltaTime);
    } else if (this.elevateCraneNegative && !this.elevateCranePositive) {
      this.elevateCrane(-1, deltaTime);
    }
  }
}

class Cameras {
  constructor(crane) {
    let SCREEN_WIDTH = window.innerWidth;
    let SCREEN_HEIGHT = window.innerHeight;

    const aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    const frustumSize = 600;

    const frontalCamera = new THREE.OrthographicCamera(
      (-frustumSize * aspect) / 2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      1000
    );
    frontalCamera.position.z = 150;
    frontalCamera.lookAt(0, 0, 0);

    const lateralCamera = new THREE.OrthographicCamera(
      (-frustumSize * aspect) / 2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      1000
    );
    lateralCamera.position.x = 150;
    lateralCamera.lookAt(0, 0, 0);

    const topCamera = new THREE.OrthographicCamera(
      (-frustumSize * aspect) / 2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      1000
    );
    topCamera.position.y = 150;
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

    this.cameras = [
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
      event.detail.camera - 1 === this.cameras.indexOf(this.currentCamera)
    ) {
      return;
    }

    this.currentCamera = this.cameras[event.detail.camera - 1];
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

    this.scene.add(crane.crane);
    this.scene.add(crane.claws.claws);
  }

  animate() {
    requestAnimationFrame(this.animate);
    crane.update();
    this.renderer.render(this.scene, this.cameras.currentCamera);
  }
}

// TODO: macros for crane sizes and positions
// TODO: fix deltaTime

new Input();
let crane = new Crane();
let cameras = new Cameras(crane);
let mainScene = new MainScene(crane, cameras);
mainScene.animate();
