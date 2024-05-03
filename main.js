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
    const elevateCranteEvent = new CustomEvent("elevateCranteEvent", {
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
}

class Cameras {
  constructor() {
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
    frontalCamera.position.z = 100;
    frontalCamera.lookAt(0, 0, 0);

    const lateralCamera = new THREE.OrthographicCamera(
      (-frustumSize * aspect) / 2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      1000
    );
    lateralCamera.position.x = 100;
    lateralCamera.lookAt(0, 0, 0);

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
    fixedOrtCamera.position.set(100, 100, 100);
    fixedOrtCamera.lookAt(0, 0, 0);

    const fixedPersCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    fixedPersCamera.position.set(100, 100, 100);
    fixedPersCamera.lookAt(0, 0, 0);

    const movableCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    movableCamera.position.set(100, 100, 100);
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
  constructor(cameras) {
    this.cameras = cameras;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("lightblue");

    let SCREEN_WIDTH = window.innerWidth;
    let SCREEN_HEIGHT = window.innerHeight;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    document.body.appendChild(this.renderer.domElement);

    // TODO: remove cube
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    // cube.position.set(50, 50, 50);
    this.scene.add(cube);
    this.scene.add(new THREE.AxesHelper(100000));
    this.animate = this.animate.bind(this);
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.cameras.currentCamera);
  }
}

new Input();
new HUD();
let mainScene = new MainScene(new Cameras());
mainScene.animate();
