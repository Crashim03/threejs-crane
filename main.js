import * as THREE from "three";

class Input {
  constructor() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  handleKeyDown(event) {
    switch (event.code) {
      case "Digit1":
        this.dispatchSwitchCameraEvent(0, true);
        break;
      case "Digit2":
        this.dispatchSwitchCameraEvent(1, true);
        break;
      case "Digit3":
        this.dispatchSwitchCameraEvent(2, true);
        break;
      case "Digit4":
        this.dispatchSwitchCameraEvent(3, true);
        break;
      case "Digit5":
        this.dispatchSwitchCameraEvent(4, true);
        break;
      case "Digit6":
        this.dispatchSwitchCameraEvent(5, true);
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
  }

  handleKeyUp(event) {
    switch (event.code) {
      case "Digit1":
        this.dispatchSwitchCameraEvent(0, false);
        break;
      case "Digit2":
        this.dispatchSwitchCameraEvent(1, false);
        break;
      case "Digit3":
        this.dispatchSwitchCameraEvent(2, false);
        break;
      case "Digit4":
        this.dispatchSwitchCameraEvent(3, false);
        break;
      case "Digit5":
        this.dispatchSwitchCameraEvent(4, false);
        break;
      case "Digit6":
        this.dispatchSwitchCameraEvent(5, false);
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

class HUD {
  constructor() {
    this.initializeCameraKeys();
    this.initializeRotateKeys();
    this.initializeMoveKeys();
    this.initializeElevateKeys();
    document.addEventListener(
      "switchCameraEvent",
      this.handleSwitchCamera.bind(this)
    );
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

  // TODO:
  initializeCameraKeys() {
    let numberOfCameras = 6;
    let currentPos = 0;
    this.cameraSprites = [];
  }

  // TODO:
  initializeRotateKeys() {}

  // TODO:
  initializeMoveKeys() {}

  // TODO:
  initializeElevateKeys() {}

  // TODO:
  handleSwitchCamera(event) {
    if (event.detail.isPressed) {
    } else {
    }
  }

  // TODO:
  handleRotateCrane(event) {
    if (event.detail.isPressed) {
    } else {
    }
  }

  // TODO:
  handleMoveCart(event) {
    // TODO
    if (event.detail.isPressed) {
    } else {
    }
  }

  // TODO:
  handleElevateCrane(event) {
    // TODO
    if (event.detail.isPressed) {
    } else {
    }
  }
}

class Crane {
  // TODO
  constructor() {
    this.clock = new THREE.Clock();
    this.crane = new THREE.Group();

    const material = new THREE.MeshBasicMaterial({
      color: THREE.Color.NAMES.green,
    });

    let base = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 20), material);
    base.position.set(22.5, -5, 0);

    this.tower = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 90, 3),
      material
    );
    this.tower.position.set(22.5, 45, 0);

    this.topCrane = new THREE.Group();
    let topBackCrane = new THREE.Group();

    let counterWeight = new THREE.Mesh(
      new THREE.BoxGeometry(10, 15, 5),
      material
    );
    counterWeight.position.set(5, 93, 0);

    let counterJib = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 50, 3),
      material
    );
    counterJib.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
    counterJib.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
    counterJib.position.set(15, 90, 0);

    topBackCrane.add(counterJib);

    this.topCrane.add(topBackCrane);
    this.crane.add(base, this.tower, this.topCrane);

    document.addEventListener(
      "rotateCraneEvent",
      this.handleRotateCrane.bind(this)
    );
  }

  handleRotateCrane(event) {
    if (!event.detail.isPressed) {
      return;
    }

    console.log("Rotating crane...");
    this.topCrane.rotateOnAxis(
      new THREE.Vector3(0, 1, 0),
      1 * event.detail.direction * this.clock.getDelta()
    );
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
      event.detail.camera === this.cameras.indexOf(this.currentCamera)
    ) {
      return;
    }

    this.currentCamera = this.cameras[event.detail.camera];
    console.log("Switched to camera: " + (event.detail.camera + 1));
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
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.cameras.currentCamera);
  }
}

// TODO: macros for crane sizes and positions

new Input();
new HUD();
let crane = new Crane();
let cameras = new Cameras(crane);
let mainScene = new MainScene(crane, cameras);
mainScene.animate();
