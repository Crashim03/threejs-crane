import * as THREE from "three";
// 'use strict';

let wireframeValue = false;
let collidersVisible = false;
let colliders = [];

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

    this.closeClawsPositive = false;
    this.closeClawsNegative = false;
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
      case "Digit7":
        wireframeValue = !wireframeValue;
        document.dispatchEvent(new CustomEvent("changeWireframe"));
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
        this.dispatchElevateClawsEvent(1, true);
        break;
      case "KeyD":
        this.dispatchElevateClawsEvent(-1, true);
        break;
      case "KeyR":
        this.dispatchCloseClawsEvent(-1, true);
        break;
      case "KeyF":
        this.dispatchCloseClawsEvent(1, true);
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
        this.dispatchElevateClawsEvent(1, false);
        break;
      case "KeyD":
        this.dispatchElevateClawsEvent(-1, false);
        break;
      case "KeyR":
        this.dispatchCloseClawsEvent(-1, false);
        break;
      case "KeyF":
        this.dispatchCloseClawsEvent(1, false);
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

    if ((this.rotateCranePositive && this.rotateCraneNegative) ||
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

    if ((this.moveCartPositive && this.moveCartNegative) ||
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

  dispatchElevateClawsEvent(direction, isPressed) {
    if (direction === 1) {
      this.elevateCranePositive = isPressed;
    } else if (direction === -1) {
      this.elevateCraneNegative = isPressed;
    }

    if ((this.elevateCranePositive && this.elevateCraneNegative) ||
      (!this.elevateCranePositive && !this.elevateCraneNegative)
    ) {
      direction = 0;
    } else if (this.elevateCranePositive) {
      direction = 1;
    } else if (this.elevateCraneNegative) {
      direction = -1;
    }

    const elevateCranteEvent = new CustomEvent("elevateClawsEvent", {
      detail: { direction: direction },
    });
    console.log("Elevate Claws: " + direction);
    document.dispatchEvent(elevateCranteEvent);
  }

  dispatchCloseClawsEvent(direction, isPressed) {
    if (direction === 1) {
      this.closeClawsPositive = isPressed;
    } else if (direction === -1) {
      this.closeClawsNegative = isPressed;
    }

    if ((this.closeClawsPositive && this.closeClawsNegative) ||
      (!this.closeClawsPositive && !this.closeClawsNegative)
    ) {
      direction = 0;
    } else if (this.closeClawsPositive) {
      direction = 1;
    } else if (this.closeClawsNegative) {
      direction = -1;
    }

    const closeClawsEvent = new CustomEvent("closeClawsEvent", {
      detail: { direction: direction },
    });
    console.log("Close Claws: " + direction);
    document.dispatchEvent(closeClawsEvent);
  }
}

class Cameras {
  constructor() {
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
    lateralCamera.position.x = 500;

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

class Claws {
  constructor(camera) {
    const material = new THREE.MeshBasicMaterial({
      color: THREE.Color.NAMES.green,
      wireframe: wireframeValue
    });

    this.clawsGroup = new THREE.Group();

    this.elevateClawsDirection = 0;
    this.elevateClawsSpeed = 50;
    this.elevateClawsMinPosition = -15;
    this.elevateClawsMaxPosition = -80;

    this.closeClawsDirection = 0;
    this.closeClawsSpeed = 1;
    this.closeClawsMinAngle = 0;
    this.closeClawsAngle = this.closeClawsMinAngle;
    this.closeClawsMaxAngle = 1;

    this.collider = new Collider(17, "Claws", this).colliderObject;
    this.collider.position.set(0, -3, 0);

    this.rope = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1), material);
    this.rope.scale.set(1, this.elevateClawsMinPosition, 1);
    this.rope.position.set(this.rope.position.x, this.elevateClawsMinPosition / 2.5 + 1, this.rope.position.z);

    this.clock = new THREE.Clock();

    let height = 4;

    let clawBase = new THREE.Mesh(
      new THREE.CylinderGeometry(6, 6, height),
      material
    );
    clawBase.position.set(0, height, 0);

    this.claws1 = this.createClaws(material);
    this.claws1.position.set(0, 2, 5);
    this.claws1.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 3);

    this.claws2 = this.createClaws(material);
    this.claws2.rotateY(Math.PI / 2);
    this.claws2.position.set(5, 2, 0);
    this.claws2.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 3);

    this.claws3 = this.createClaws(material);
    this.claws3.rotateY(Math.PI);
    this.claws3.position.set(0, 2, -5);
    this.claws3.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 3);

    this.claws4 = this.createClaws(material);
    this.claws4.rotateY(-Math.PI / 2);
    this.claws4.position.set(-5, 2, 0);
    this.claws4.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 3);

    camera.position.set(0, -5, 0);
    camera.lookAt(0, -6, 0);
    this.clawsGroup.add(clawBase, camera, this.claws1, this.claws2, this.claws3, this.claws4, this.collider);
    this.clawsGroup.position.set(this.clawsGroup.position.x, this.elevateClawsMinPosition, this.clawsGroup.position.z);

    document.addEventListener("elevateClawsEvent", this.handleElevateClaws.bind(this));
    document.addEventListener("closeClawsEvent", this.handleCloseClaws.bind(this));
  }

  createClaws(material) {
    let upperClaw = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 10),
      material
    );
    upperClaw.position.set(0, -5, 0);

    let lowerClaw = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 6),
      material
    );
    lowerClaw.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 6);
    lowerClaw.position.set(0, -12, -1);

    let claws = new THREE.Group();
    claws.add(upperClaw, lowerClaw);
    return claws;
  }

  handleElevateClaws(event) {
    this.elevateClawsDirection = event.detail.direction;
  }

  handleCloseClaws(event) {
    this.closeClawsDirection = event.detail.direction;
  }

  elevateClaws(direction, deltaTime) {
    let newPosition = this.clawsGroup.position.y + direction * deltaTime * this.elevateClawsSpeed;

    if (newPosition > this.elevateClawsMinPosition) {
      newPosition = this.elevateClawsMinPosition;
    } else if (newPosition < this.elevateClawsMaxPosition) {
      newPosition = this.elevateClawsMaxPosition;
    }

    this.rope.position.set(this.rope.position.x, newPosition / 2 + 2.5, this.rope.position.z);
    this.rope.scale.set(this.rope.scale.x, newPosition, this.rope.scale.z);
    this.clawsGroup.position.set(this.clawsGroup.position.x, newPosition, this.clawsGroup.position.z);
  }

  closeClaws(direction, deltaTime) {
    let newRotation = direction * deltaTime * this.closeClawsSpeed;

    // Check if the new rotation is within the desired range
    if (this.closeClawsAngle + newRotation < this.closeClawsMaxAngle && this.closeClawsAngle + newRotation > this.closeClawsMinAngle) {
      this.claws1.rotateOnAxis(new THREE.Vector3(1, 0, 0), newRotation);
      this.claws2.rotateOnAxis(new THREE.Vector3(1, 0, 0), newRotation);
      this.claws3.rotateOnAxis(new THREE.Vector3(1, 0, 0), newRotation);
      this.claws4.rotateOnAxis(new THREE.Vector3(1, 0, 0), newRotation);

      // Update the current rotation
      this.closeClawsAngle += newRotation;
    }
  }

  handleCollision(other) {
    if (other.tag !== "Cargo") {
      return;
    }
    other.object.cargoGroup.position.set(0, -5, 0);
    this.clawsGroup.add(other.object.cargoGroup);
  }

  update() {
    let deltaTime = this.clock.getDelta();

    if (this.elevateClawsDirection !== 0) {
      this.elevateClaws(this.elevateClawsDirection, deltaTime);
    }

    if (this.closeClawsDirection !== 0) {
      this.closeClaws(this.closeClawsDirection, deltaTime);
    }
  }
}

class Jib {
  constructor(material) {
    this.jib = new THREE.Mesh(new THREE.CylinderGeometry(3.33, 3.33, 90, 3), material);
    this.jib.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
    this.jib.rotateOnAxis(new THREE.Vector3(-1, 0, 0), -Math.PI / 2);
    this.jib.position.set(71.1, 93.33, 0);
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

class SupportLines {
  constructor(material) {
    this.supportLine_1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 71, 64),
      material
    );
    this.supportLine_1.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
    this.supportLine_1.position.set(77, 89, 0);

    this.supportLine_2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 1, 64),
      material
    );
    this.supportLine_2.position.set(112.5, 89.5, 0);

    this.supportLines = new THREE.Group();
    this.supportLines.add(this.supportLine_1, this.supportLine_2);
  }
}

class Cabine {
  constructor(material) {
    this.cabine = new THREE.Mesh(new THREE.BoxGeometry(8, 5, 8), material);
    this.cabine.position.set(30, 87.5, 0);
  }
}

class TopCrane {
  constructor(camera) {
    const material = new THREE.MeshBasicMaterial({
      color: THREE.Color.NAMES.yellow,
      wireframe: wireframeValue
    });

    this.clock = new THREE.Clock();
    this.rotateDirection = 0;
    this.rotationSpeed = 2;

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
    let supportLines = new SupportLines(material).supportLines;
    supportLines.position.x -= 22.5;
    this.cart = new Cart(camera);

    this.topCraneGroup.add(cabine, counterJib, jib, towerPeak, backLine, mainLine, supportLines, this.cart.cartGroup);

    document.addEventListener(
      "rotateCraneEvent",
      this.handleRotateCrane.bind(this)
    );
  }

  handleRotateCrane(event) {
    this.rotateDirection = event.detail.direction;
  }

  rotateCrane(direction, deltaTime) {
    this.topCraneGroup.rotateOnAxis(
      new THREE.Vector3(0, 1, 0),
      direction * deltaTime * this.rotationSpeed
    );
  }

  update() {
    this.cart.update()

    let deltaTime = this.clock.getDelta();
    if (this.rotateDirection !== 0) {
      this.rotateCrane(this.rotateDirection, deltaTime);
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

class Cargo {
  constructor(mesh, colliderRadius) {
    this.cargoGroup = new THREE.Group();
    let collider = new Collider(colliderRadius, "Cargo", this);
    this.cargoGroup.add(mesh, collider.colliderObject);

    this.spawn();
  }

  spawn() {

  }

  handleCollision(other) {
  }
}

class Exterior {
  constructor() {
    this.exteriorGroup = new THREE.Group();
    const material = new THREE.MeshBasicMaterial({
      color: THREE.Color.NAMES.green,
      wireframe: wireframeValue
    });
    let containerGroup = new THREE.Group();
    let containerSideA = new THREE.Mesh(new THREE.BoxGeometry(20, 10, 1), material);
    let containerSideB = new THREE.Mesh(new THREE.BoxGeometry(20, 10, 1), material);
    let containerSideC = new THREE.Mesh(new THREE.BoxGeometry(1, 10, 20), material);
    let containerSideD = new THREE.Mesh(new THREE.BoxGeometry(1, 10, 20), material);
    let containerBottom = new THREE.Mesh(new THREE.BoxGeometry(20, 1, 20), material);
    containerSideA.position.set(0, 0, -9.5);
    containerSideB.position.set(0, 0, 9.5);
    containerSideC.position.set(9.5, 0, 0);
    containerSideD.position.set(-9.5, 0, 0);
    containerBottom.position.set(0, -4.5, 0);
    containerGroup.add(containerSideA, containerSideB, containerSideC, containerSideD, containerBottom);
    containerGroup.position.set(70, 5, 70);

    let cargo = new Cargo(new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), material), 5).cargoGroup;
    cargo.position.set(10, 0, 40);

    this.exteriorGroup.add(containerGroup, cargo);
  }
}

class Cart {
  constructor(camera) {
    this.cartGroup = new THREE.Group();
    this.clock = new THREE.Clock();
    const material = new THREE.MeshBasicMaterial({
      color: THREE.Color.NAMES.green,
      wireframe: wireframeValue
    });

    let cart = new THREE.Mesh(new THREE.BoxGeometry(5, 2, 5), material);
    this.claws = new Claws(camera);

    this.cartGroup.add(cart, this.claws.clawsGroup, this.claws.rope);

    this.cartDirection = 0;
    this.cartSpeed = 60;
    this.cartMaxPosition = 90;
    this.cartMinPosition = 22;
    this.cartGroup.position.set(this.cartMinPosition, 89, this.cartGroup.position.z);

    document.addEventListener("moveCartEvent", this.handleMoveCart.bind(this));
  }

  handleMoveCart(event) {
    this.cartDirection = event.detail.direction;
  }

  moveCart(direction, deltaTime) {
    let nextPosition = this.cartGroup.position.x + direction * this.cartSpeed * deltaTime;
    if (nextPosition > this.cartMaxPosition) {
      nextPosition = this.cartMaxPosition;
    } else if (nextPosition < this.cartMinPosition) {
      nextPosition = this.cartMinPosition;
    }
    this.cartGroup.position.set(nextPosition, this.cartGroup.position.y, this.cartGroup.position.z);
  }

  update() {
    this.claws.update();
    let deltaTime = this.clock.getDelta();

    if (this.cartDirection !== 0) {
      this.moveCart(this.cartDirection, deltaTime);
    }
  }
}

class Crane {
  constructor(camera) {
    const material = new THREE.MeshBasicMaterial({
      color: THREE.Color.NAMES.grey,
      wireframe: wireframeValue
    });

    this.craneGroup = new THREE.Group();

    let base = new Base(material).base;
    let tower = new Tower(material).tower;

    this.topCrane = new TopCrane(camera);

    this.craneGroup.add(base, tower, this.topCrane.topCraneGroup);
  }

  update() {
    this.topCrane.update();
  }
}

class Collider {
  constructor(radius, tag, object) {
    const material = new THREE.MeshBasicMaterial({
      color: THREE.Color.NAMES.grey,
      visible: collidersVisible
    });

    this.radius = radius;
    this.object = object;
    this.tag = tag;
    this.colliderObject = new THREE.Mesh(new THREE.SphereGeometry(radius), material);

    colliders.push(this);
  }

  handleCollision(other) {
    this.object.handleCollision(other);
  }
}

class ColliderManager {
  update() {
    colliders.forEach(colliderA => {
      colliders.forEach(colliderB => {
        if (colliderA === colliderB) {
          return;
        }
        let worldPositionA = new THREE.Vector3();
        colliderA.colliderObject.getWorldPosition(worldPositionA);
        let worldPositionB = new THREE.Vector3();
        colliderB.colliderObject.getWorldPosition(worldPositionB);

        if (colliderA.radius + colliderB.radius >= worldPositionA.distanceTo(worldPositionB)) {
          colliderA.handleCollision(colliderB);
          colliderB.handleCollision(colliderA);
        }
      })
    });
  }
}

class MainScene {
  constructor(crane, exterior, cameras) {
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
    this.scene.add(exterior.exteriorGroup);
    window.addEventListener("resize", this.resize.bind(this));
    document.addEventListener("changeWireframe", this.handleChangeWireframe.bind(this));

    this.colliderManager = new ColliderManager();
  }
  animate() {
    requestAnimationFrame(this.animate);
    crane.update();
    this.colliderManager.update();
    this.renderer.render(this.scene, this.cameras.currentCamera);
  }

  handleChangeWireframe() {
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.material.wireframe = wireframeValue;
      }
    });
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
let cameras = new Cameras();
let crane = new Crane(cameras.camerasList[5]);
let exterior = new Exterior();
let mainScene = new MainScene(crane, exterior, cameras);
mainScene.animate();