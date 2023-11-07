
import gsap from "gsap";

const ele = document.getElementById('AddScene');
ele.addEventListener('click', function () {
  loadThreeJS(document.getElementById('RemoveScene'));
})

setTimeout(x => document.getElementById('AddScene').click(), 555);

async function loadThreeJS(btn) {
  const THREE = await import('three');
  //const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
  const NASTR = await import('./colorsAndVertices.js');
  const container = document.getElementById('CanvasFrame');

  const scene = new THREE.Scene();

  let randOXY;
  let randValue;

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  {
    const near = 0.01;
    const far = 3.52;
    const color = 'lightblue';
    scene.fog = new THREE.Fog(color, near, far);
    scene.background = new THREE.Color(color);
  }

  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x2f3640);
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

  container.appendChild(renderer.domElement);
  container.style.position = 'absolute';
  container.style.left = 300 + 'px';

  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const material = new THREE.ShaderMaterial({
    vertexShader: `
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec3 vColor;
    
      void main() {
        // Получение глобальной координаты вершины
        vec4 globalPosition = modelMatrix * vec4(position, 1.0);
        vec3 globalPositionXYZ = globalPosition.xyz;
        
        // Вычисление цвета в зависимости от глобальных координат
        vColor = mix(color1, color2, globalPositionXYZ);
        
        // Позиция вершины
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
    
      void main() {
        // Устанавливаем цвет фрагмента
        gl_FragColor = vec4(vColor, 1.0);
      }
    `
  });

  RemoveScene.addEventListener('click', function () {
    removeThreeJS(renderer.domElement);
  })

  var cube = new THREE.Mesh(geometry, material);
  cube.position.z = 3;
  cube.position.y = 0;
  cube.position.x = 0;
  scene.add(cube);

  material.uniforms = {
    color1: { value: new THREE.Vector3(1, 0, 0) }, // Красный цвет
    color2: { value: new THREE.Vector3(0, 1, 0) } // Зеленый цвет
  };  

  animate();
  CanvasFrame.addEventListener('click', function () {
    animate();
  })

  function animate() {
    console.log('a');
    rand();
    switch (randOXY) {
      case 0:
        console.log('123');
        //cube.rotation.x += randValue;
        gsap.to(cube.rotation, { x: randOXY });
        break;
      case 1:
        cube.rotation.y += randValue;
        break;
      case 2:
        cube.rotation.z += randValue;
        break;
    }

    renderer.render(scene, camera);
  }

  function rand() {
    randOXY = Math.floor(Math.random() * 3);
    randValue = Math.floor(Math.random() * 360);
  }

  function removeThreeJS(scene) {
    scene.remove();
  }

}