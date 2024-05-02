import * as THREE from 'three';

class Input {
    constructor() {
        document.addEventListener("keydown",  this.handleKeyDown.bind(this));
        document.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    handleKeyDown(event) {
        switch (event.code) {
            case "Digit1":
                this.dispatchSwitchCameraEvent(0);
                break;
            case "Digit2":
                this.dispatchSwitchCameraEvent(1);
                break;
            case "Digit3":
                this.dispatchSwitchCameraEvent(2);
                break;
            case "Digit4":
                this.dispatchSwitchCameraEvent(3);
                break;
            case "Digit5":
                this.dispatchSwitchCameraEvent(4);
                break;
            case "Digit6":
                this.dispatchSwitchCameraEvent(5);
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

    dispatchSwitchCameraEvent(camera) {
        const switchCameraEvent = new CustomEvent("switchCameraEvent", { detail: camera} );
        document.dispatchEvent(switchCameraEvent);
    }

    dispatchRotateCraneEvent(direction, isPressed) {
        const rotateCraneEvent = new CustomEvent("rotateCraneEvent", { detail: { direction: direction, isPressed: isPressed } } );
        document.dispatchEvent(rotateCraneEvent);
    }

    dispatchMoveCartEvent(direction, isPressed) {
        const moveCartEvent = new CustomEvent("moveCartEvent", { detail: { direction: direction, isPressed: isPressed } } );
        document.dispatchEvent(moveCartEvent);
    }

    dispatchElevateCraneEvent(direction, isPressed) {
        const elevateCranteEvent = new CustomEvent("elevateCranteEvent", { detail: { direction: direction, isPressed: isPressed } } );
        document.dispatchEvent(elevateCranteEvent);
    }
}

// TODO: MORE CLASSES ;)

let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
const aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
const frustumSize = 600;

const scene = new THREE.Scene();
scene.background = new THREE.Color('lightblue');

const renderer = new THREE.WebGLRenderer();
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
document.body.appendChild(renderer.domElement);

const frontalCamera = new THREE.OrthographicCamera(-frustumSize * aspect / 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 1, 1000);
frontalCamera.position.z = 100;
frontalCamera.lookAt(0, 0, 0);

const lateralCamera = new THREE.OrthographicCamera(-frustumSize * aspect / 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 1, 1000);
lateralCamera.position.x = 100;
lateralCamera.lookAt(0, 0, 0);

const topCamera = new THREE.OrthographicCamera(-frustumSize * aspect / 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 1, 1000);
topCamera.position.y = 100;
topCamera.lookAt(0, 0, 0);

const fixedOrtCamera = new THREE.OrthographicCamera(-frustumSize * aspect / 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 1, 1000);
fixedOrtCamera.position.set(new THREE.Vector3(100, 100, 100));
fixedOrtCamera.lookAt(0, 0, 0);

const fixedPersCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
fixedOrtCamera.position.set(new THREE.Vector3(100, 100, 100));
fixedPersCamera.lookAt(0, 0, 0);

const movableCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

const cameras = [frontalCamera, lateralCamera, topCamera, fixedOrtCamera, fixedPersCamera, movableCamera];

// TODO: remove cube
const geometry = new THREE.BoxGeometry(100, 100, 100); // Adjusted size for better visibility
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const input = new Input();
let currentCamera = cameras[0];

document.addEventListener("switchCameraEvent", switchCamera);

function switchCamera(camera) {
    console.log("Switched to camera " + (camera.detail + 1));
    currentCamera = cameras[camera.detail];
}

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, currentCamera);
}

animate();

