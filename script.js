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

    let randOXY;
    let randValue;

    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;

    const scene = new THREE.Scene();
    {
        const near = 0.01;
        const far = 3.52;
        const color = 'lightblue';
        scene.fog = new THREE.Fog(color, near, far);
        scene.background = new THREE.Color(color);
    }


    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x2f3640);
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

    container.appendChild(renderer.domElement);

    RemoveScene.addEventListener('click', function () {
        removeThreeJS(renderer.domElement);
    })

    container.style.position = 'absolute';
    container.style.left = 700 + 'px';

    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(NASTR.vertices, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(NASTR.colors, 3));
    const material = new THREE.MeshBasicMaterial({ vertexColors: true });
    var cube = new THREE.Mesh(geometry, material); 
    cube.position.z = 3;
    cube.position.y = 0;
    cube.position.x = 0;
    scene.add(cube);


    animate();
    CanvasFrame.addEventListener('click', function () {
        animate();
    })

    function animate() {
        console.log('a');
        rand();

        switch (randOXY) {
            case 0:
                cube.rotation.x += randValue;
                break;
            case 1:
                cube.rotation.y += randValue;
                break;
            case 2:
                cube.rotation.z += randValue;
                break;
        }

        renderer.render(scene, camera);
        //debugger;
    }

    function rand() {
        randOXY = Math.floor(Math.random() * 3);
        randValue = Math.floor(Math.random() * 360);
    }

    function removeThreeJS(scene) {
        scene.remove();
    }

}