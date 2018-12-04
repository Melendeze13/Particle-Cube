var camera, scene, renderer;
var geometry, material, mesh, cameraControl;
var particleSystem,particleCount,particles, particle;


init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 2000 );
    camera.position.z = 1;



    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh( geometry, material );

    var texture = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/Melendeze13/Particle-Cube/master/images/particle.png' );


     particleCount = 500;
     particles = new THREE.Geometry();
    var pMaterial = new THREE.PointsMaterial({
        color: 0xFFFFF,
        size: 20,
        map: texture,
        blending: THREE.AdditiveBlending,
        transparent: true,
        alphaTest: 0.5,
        sizeAttenuation: true,
        transparent: false
    });

    for (var i = 0; i < particleCount; i++)
    {
        particle = new THREE.Vector3();
        particle.x = Math.random() * 500 - 250;
        particle.y = Math.random() * 500 - 250;
        particle.z = Math.random() * 500 - 250;

            // create a velocity vector
        particle.velocity = new THREE.Vector3(
        0,              // x
        -Math.random(), // y: random vel
        0);             // z
    
        particles.vertices.push( particle );
        }

    particleSystem = new THREE.Points(particles, pMaterial);
    particleSystem.sortParticles = true;

    scene.add(particleSystem);
    scene.add( mesh );


    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );


    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 2.0;
    controls.zoomSpeed = 5;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;

    controls.dynamicDampingFactor = 0.3;
    controls.keys = [ 65, 83, 68 ];
    controls.addEventListener( 'change', render );

}

function rotateSystem()
{
    // particleSystem.rotation.y += .01;
}

function animate() {

    rotateSystem();
    for (let i = 0; i < particles.vertices.length; i++)
    {

    }

    particleSystem.rotation.y += .01;

    mesh.rotation.y += .01;
    mesh.rotation.x += .01;
    mesh.rotation.z += .01;




    var pCount = particleCount;
    while (pCount--) {
  
      // get the particle
      var particle =
        particles.vertices[pCount];

  
      // check if we need to reset
      if (particle.y < -200) {
        particle.y = 200;
        particle.velocity.y = 0;
      }
  
      // update the velocity with
      // a splat of randomniz
      particle.velocity.y -= Math.random() * .1;
  
      // and the position
      particle.add(particle.velocity);
    //   particle.y = particle.y + particle.velocity.y;

    //   console.log(particle.add(particle.velocity));

    }
  
    // flag to the particle system
    // that we've changed its vertices.
    particleSystem.
      geometry.
      verticesNeedUpdate = true;


    requestAnimationFrame( animate );
    controls.update();
    render();

}


function render() {
    renderer.render( scene, camera );
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    controls.handleResize();
    render();
}

function particleInit() {
    var particleCount = 500;
    var particles = new THREE.Geometry();
    var pMaterial = new THREE.ParticleBasicMaterial({
        color: 0xFFFFF,
        size: 20
    });

    for (var i = 0; i < particleCount; i++)
    {
        var px = Math.random() * 500 - 250,
            py = Math.random() * 500 - 250,
            pz = Math.random() * 500 - 250,
            particle = new THREE.Vertex(
                new THREE.Vector3(px , py, pz)
            );
            particles.vertices.push(particle);
        }

    var particleSystem = new THREE.ParticleSystem(particles, pMaterial);

    scene.addChild(particleSystem);

}