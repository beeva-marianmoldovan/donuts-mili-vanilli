
var camera, scene, renderer, mesh, mouse, controls,
	width = window.innerWidth,
	height = window.innerHeight;

var clock = new THREE.Clock();
var mouse = new THREE.Vector2();

init();
animate();

function init() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true, alpha: true } );
	renderer.setSize( width, height );
	renderer.shadowMapEnabled = true;
	renderer.shadowMapType = THREE.PCFSoftShadowMap;
	renderer.setViewport( 0,0,width, height );
	renderer.getMaxAnisotropy();

	var container = document.getElementById('container');
	container.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera( 50, (width/height), 0.1, 10000000 );
	camera.position.set( 250, 300, 300 );

	mouse = new THREE.Vector2();

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = true;
	controls.target.set( 0,0,0 );

	buildShape();

	var directionalLight = new THREE.SpotLight(0xeeeeee, 1.5);
		directionalLight.position.set(2000, 3500,2500);
		//directionalLight.target.position.set( 0, 0, 0 );
		//directionalLight.shadowCameraVisible = true;
		directionalLight.castShadow = true;
		directionalLight.shadowCameraFar = 10000;
		directionalLight.shadowDarkness = 0.5;
		directionalLight.shadowMapWidth = 2048;
		directionalLight.shadowMapHeight = 2048;
		directionalLight.name = 'luzDireccional'

	scene.add( directionalLight );

	//
	window.addEventListener( 'resize', onWindowResize, false );

}


function buildShape(){
	paintFloor();
	paintWalls();

	var boxes = 4;

	//paintSky();
	paintOnlyBox();
	paintBoxes(boxes);
	paintTopBox(boxes * 25 + 1);
	paintDonuts(boxes * 25 + 1);
	paintSolitaryDonut();
}

function paintFloor(){
	//-----------------------------------------------
	//-----------------Suelo-------------------------
	var planexAxis = 1000;//dimensiones x
	var planeyAxis = 1000;//dimensiones y
	var planezAxis = 300;//dimensiones z

	var woodMaterial  = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/woodx.png'),color: 0xFFFFFF, side: THREE.DoubleSide  } );
	var PLANEmaterial = new THREE.MeshLambertMaterial( {color: 0x655643, side: THREE.DoubleSide} );

	var PLANEgeometry = new THREE.PlaneGeometry( planexAxis, planeyAxis, planezAxis );
	var plane = new THREE.Mesh( PLANEgeometry, woodMaterial );
	//	plane.castShadow = true;	//emitir sombras
	plane.receiveShadow = true;	//recibir sombras
	plane.position.set(0,0,0);	//position del objeto(x,y,z)
	plane.rotation.set(Math.PI/2,0,0);	//rotacion del objeto(x,y,z)
	plane.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( plane );
}

function paintWalls(){
	var planexAxis = 1000;//dimensiones x
	var planeyAxis = 1000;//dimensiones y
	var planezAxis = 300;//dimensiones z

	var woodMaterial  = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/room.png'),color: 0xFFFFFF, side: THREE.DoubleSide  } );
	var PLANEmaterial = new THREE.MeshLambertMaterial( {color: 0x655643, side: THREE.DoubleSide} );
	var PLANEgeometry = new THREE.PlaneGeometry( planexAxis, planeyAxis, planezAxis );

	var plane = new THREE.Mesh( PLANEgeometry, woodMaterial );
	//	plane.castShadow = true;	//emitir sombras
	plane.receiveShadow = true;	//recibir sombras
	plane.position.set(0,500,-500);	//position del objeto(x,y,z)
	plane.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	plane.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( plane );


	var plane = new THREE.Mesh( PLANEgeometry, woodMaterial );
	//	plane.castShadow = true;	//emitir sombras
	plane.receiveShadow = true;	//recibir sombras
	plane.position.set(-500,500,0);	//position del objeto(x,y,z)
	plane.rotation.set(0,Math.PI/2,0);	//rotacion del objeto(x,y,z)
	plane.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( plane );


	var plane = new THREE.Mesh( PLANEgeometry, woodMaterial );
	//	plane.castShadow = true;	//emitir sombras
	plane.receiveShadow = true;	//recibir sombras
	plane.position.set(500,500,0);	//position del objeto(x,y,z)
	plane.rotation.set(0,Math.PI/2,0);	//rotacion del objeto(x,y,z)
	plane.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( plane );
}

function paintSky(){
	//-------------CIELO-------------------------------

	var SKYmaterial  = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/bck.jpg'),color: 0xFFFFFF, side: THREE.DoubleSide  } );

	var SKYradius = 500; //dimensiones del cielo
	var SKYwidthSegments = 32;
	var SKYheigthSegments = 32;
	var SKYangleStart = 0;
	var SKYangleLenght = 6.3;

	var SKYgeometry = new THREE.SphereGeometry( SKYradius, SKYwidthSegments, SKYheigthSegments, SKYangleStart, SKYangleLenght );
	var sky = new THREE.Mesh( SKYgeometry, SKYmaterial );
		sky.position.set(0,500,0);
		sky.rotation.set(0,0,0);
		sky.scale.set(1,1,1);
	scene.add( sky );
}

function paintBoxes(boxes){
	var xAxis = 100;//dimensiones x
	var yAxis = 25;//dimensiones y
	var zAxis = 100;//dimensiones z

	var tapTexture = THREE.ImageUtils.loadTexture( "images/tapa.jpg" );
	var tapaMaterial = new THREE.MeshLambertMaterial( { map: tapTexture, color: 0xFFFFFF, side: THREE.DoubleSide, inverse:true  } );

	var cartonTexture = THREE.ImageUtils.loadTexture( "images/carton.jpg" );
	var cartonMaterial = new THREE.MeshLambertMaterial( { map: cartonTexture, color: 0xFFFFFF, side: THREE.DoubleSide  } );

	var cartonFace = new THREE.MeshFaceMaterial( [cartonMaterial, cartonMaterial,tapaMaterial, cartonMaterial, cartonMaterial,cartonMaterial] );

	for(var i = 0; i < boxes;i++){

		var cubegeometry = new THREE.BoxGeometry( xAxis, yAxis, zAxis );
		var cube = new THREE.Mesh( cubegeometry, cartonFace );
			cube.castShadow = true; //emitir sombras
			cube.receiveShadow = true; //recibir sombras
			cube.position.set(0,12.5 + i * 25 + 0.5,0); //position del objeto(x,y,z)
			cube.rotation.set(0,Math.random()/3,0); //rotacion del objeto(x,y,z)
			cube.scale.set(1,1,1); //escala del objeto(x,y,z)
		scene.add( cube );
	}
}

function paintOnlyBox(){

		var xAxis = 100;//dimensiones x
		var yAxis = 25;//dimensiones y
		var zAxis = 100;//dimensiones z

		var tapTexture = THREE.ImageUtils.loadTexture( "images/tapa.jpg" );
		var tapaMaterial = new THREE.MeshLambertMaterial( { map: tapTexture, color: 0xFFFFFF, side: THREE.DoubleSide, inverse:true  } );

		var cartonTexture = THREE.ImageUtils.loadTexture( "images/carton.jpg" );
		var cartonMaterial = new THREE.MeshLambertMaterial( { map: cartonTexture, color: 0xFFFFFF, side: THREE.DoubleSide  } );

		var cartonFace = new THREE.MeshFaceMaterial( [cartonMaterial, cartonMaterial,tapaMaterial, cartonMaterial, cartonMaterial,cartonMaterial] );


		var cubegeometry = new THREE.BoxGeometry( xAxis, yAxis, zAxis );
		var cube = new THREE.Mesh( cubegeometry, cartonFace );
		cube.castShadow = true; //emitir sombras
		cube.receiveShadow = true; //recibir sombras
		cube.position.set(150,12.5,15); //position del objeto(x,y,z)
		cube.rotation.set(0,Math.PI/8,0); //rotacion del objeto(x,y,z)
		cube.scale.set(1,1,1); //escala del objeto(x,y,z)
		scene.add( cube );

}

function paintTopBox(offsetX){
	var offset = 10;
	if(offsetX)
		offset = offsetX;

	// Base
	var planexAxis = 100;//dimensiones x
	var planeyAxis = 100;//dimensiones y
	var planezAxis = 100;//dimensiones z

	var PLANEgeometry = new THREE.PlaneGeometry( planexAxis, planeyAxis, planezAxis );
	var planeBaseBox = new THREE.Mesh( PLANEgeometry, getCartonFace(true) );
	planeBaseBox.castShadow = true;	//emitir sombras
	planeBaseBox.position.set(0,offset,0);	//position del objeto(x,y,z)
	planeBaseBox.rotation.set(Math.PI/2,0,0);	//rotacion del objeto(x,y,z)
	planeBaseBox.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( planeBaseBox );

	// Plano lateral fondo
	var planexAxis = 100;//dimensiones x
	var planeyAxis = 25;//dimensiones y
	var planezAxis = 100;//dimensiones z


	var PLANEgeometry = new THREE.PlaneGeometry( planexAxis, planeyAxis, planezAxis );
	var planeBaseBox = new THREE.Mesh( PLANEgeometry, getCartonFace(true) );
	planeBaseBox.receiveShadow = true;	//recibir sombras
	planeBaseBox.position.set(0,offset + 12.5,-50);	//position del objeto(x,y,z)
	planeBaseBox.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	planeBaseBox.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( planeBaseBox );

	// Plano lateral frente
	var planexAxis = 100;//dimensiones x
	var planeyAxis = 25;//dimensiones y
	var planezAxis = 100;//dimensiones z

	var PLANEgeometry = new THREE.PlaneGeometry( planexAxis, planeyAxis, planezAxis );
	var planeBaseBox = new THREE.Mesh( PLANEgeometry, getCartonFace() );
	planeBaseBox.receiveShadow = true;	//recibir sombras
	planeBaseBox.position.set(0,offset + 12.5,50);	//position del objeto(x,y,z)
	planeBaseBox.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	planeBaseBox.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( planeBaseBox );

	// Plano lateral izquierda
	var planexAxis = 100;//dimensiones x
	var planeyAxis = 25;//dimensiones y
	var planezAxis = 100;//dimensiones z

	var PLANEgeometry = new THREE.PlaneGeometry( planexAxis, planeyAxis, planezAxis );
	var planeBaseBox = new THREE.Mesh( PLANEgeometry, getCartonFace(true) );
	planeBaseBox.receiveShadow = true;	//recibir sombras
	planeBaseBox.position.set(-50,offset + 12.5,0);	//position del objeto(x,y,z)
	planeBaseBox.rotation.set(0,Math.PI/2,0);	//rotacion del objeto(x,y,z)
	planeBaseBox.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( planeBaseBox );

	// Plano lateral derecha
	var planexAxis = 100;//dimensiones x
	var planeyAxis = 25;//dimensiones y
	var planezAxis = 100;//dimensiones z


	var PLANEgeometry = new THREE.PlaneGeometry( planexAxis, planeyAxis, planezAxis );
	var planeBaseBox = new THREE.Mesh( PLANEgeometry, getCartonFace() );
	planeBaseBox.receiveShadow = true;	//recibir sombras
	planeBaseBox.position.set(50,offset + 12.5,0);	//position del objeto(x,y,z)
	planeBaseBox.rotation.set(0,Math.PI/2,0);	//rotacion del objeto(x,y,z)
	planeBaseBox.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( planeBaseBox );

	// Tapa
	var planexAxis = 100;//dimensiones x
	var planeyAxis = 100;//dimensiones y
	var planezAxis = 100;//dimensiones z

	var PLANEmaterial = new THREE.MeshLambertMaterial( {color: 0xEE8788, side: THREE.DoubleSide} );

	var Texture = THREE.ImageUtils.loadTexture( "images/tapa.jpg" );
	var material = new THREE.MeshLambertMaterial( { map: Texture, color: 0xFFFFFF, side: THREE.DoubleSide, inverse:true  } );
	var cartonFace = new THREE.MeshFaceMaterial( [material, PLANEmaterial] );


	var PLANEgeometry = new THREE.PlaneGeometry( planexAxis, planeyAxis, planezAxis );
	var planeBaseBox = new THREE.Mesh( PLANEgeometry, cartonFace );
	planeBaseBox.castShadow = true;	//emitir sombras
	planeBaseBox.position.set(0,offset + 25 + 50 - 15,-15);	//position del objeto(x,y,z)
	planeBaseBox.rotation.set( Math.PI/4,Math.PI,Math.PI);	//rotacion del objeto(x,y,z)
	planeBaseBox.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( planeBaseBox );

	// Cierre Tapa
	var planexAxis = 100;//dimensiones x
	var planeyAxis = 10;//dimensiones y
	var planezAxis = 10;//dimensiones z
	//material con textura sin reflejos
	var Texture = THREE.ImageUtils.loadTexture( "images/carton.jpg" );
	var material = new THREE.MeshBasicMaterial( { map: Texture,color: 0xFFFFFF, side: THREE.DoubleSide, transparent: true, opacity: 1  } );

	var PLANEgeometry = new THREE.PlaneGeometry( planexAxis, planeyAxis, planezAxis );
	var planeBaseBox = new THREE.Mesh( PLANEgeometry, material );
	planeBaseBox.castShadow = true;	//emitir sombras
	planeBaseBox.position.set(0,offset + 92.1,23.75);	//position del objeto(x,y,z)
	planeBaseBox.rotation.set( Math.PI/4 + Math.PI/2,0,0);	//rotacion del objeto(x,y,z)
	planeBaseBox.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( planeBaseBox );
}
function paintDonuts(offset){
	var offsetX = 10;
	if(offset)
		offsetX = offset;
	//material con textura y reflejos
	var DonutTexture = THREE.ImageUtils.loadTexture( "images/donut.jpg" );

	var DONUTmaterial = new THREE.MeshPhongMaterial( { map: DonutTexture,color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 1, side: THREE.DoubleSide } );

	var DONUTradius = 10; //radio del anillo
	var DONUTtubeWidth = 6;	//ancho del anillo
	var DONUTradialSegments = 16;	//segmentos usados para dibujar el anillo
	var DONUTtubularSegments = 100;	//segmentos utilizados para dibujar el tubo que forma el anillo
	var DONUTarcLength = 2 * Math.PI;	//grados que abarca el anillo(360, solo 180...)

	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 7; j++){
			var DONUTgeometry = new THREE.TorusGeometry(DONUTradius, DONUTtubeWidth, DONUTradialSegments, DONUTtubularSegments, DONUTarcLength );
			var donut = new THREE.Mesh( DONUTgeometry, DONUTmaterial );
				donut.castShadow = true;	//emitir sombras
				donut.receiveShadow = true;	//recibir sombras
				donut.position.set(-32 + 32 * i,offsetX + 15,-38 + 13 * j);	//position del objeto(x,y,z)
				donut.rotation.set(-Math.random()/2.5,0,0);	//rotacion del objeto(x,y,z)
				donut.scale.set(1,1,1);		//escala del objeto(x,y,z)
			scene.add( donut );
		}
	}
	//------------------------------------------------
	//--------------DONUT 3D--------------------------
}

function paintSolitaryDonut(){
	var DonutTexture = THREE.ImageUtils.loadTexture( "images/donut.jpg" );

	var DONUTmaterial = new THREE.MeshPhongMaterial( { map: DonutTexture,color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 1, side: THREE.DoubleSide } );

	var DONUTradius = 10; //radio del anillo
	var DONUTtubeWidth = 6;	//ancho del anillo
	var DONUTradialSegments = 16;	//segmentos usados para dibujar el anillo
	var DONUTtubularSegments = 100;	//segmentos utilizados para dibujar el tubo que forma el anillo
	var DONUTarcLength = 2 * Math.PI;	//grados que abarca el anillo(360, solo 180...)

	var DONUTgeometry = new THREE.TorusGeometry(DONUTradius, DONUTtubeWidth, DONUTradialSegments, DONUTtubularSegments, DONUTarcLength );
	var donut = new THREE.Mesh( DONUTgeometry, DONUTmaterial );
		donut.castShadow = true;	//emitir sombras
		donut.receiveShadow = true;	//recibir sombras
		donut.position.set(150,15,80);	//position del objeto(x,y,z)
		donut.rotation.set(-Math.PI/8,Math.PI/12,0);	//rotacion del objeto(x,y,z)
		donut.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( donut );

}

function getCartonFace(inverse){
	var PLANEmaterial = new THREE.MeshLambertMaterial( {color: 0xD9CEB2, side: THREE.DoubleSide} );

	var Texture = THREE.ImageUtils.loadTexture( "images/carton.jpg" );
	var material = new THREE.MeshLambertMaterial( { map: Texture, color: 0xFFFFFF, side: THREE.DoubleSide  } );
	var cartonFace = new THREE.MeshFaceMaterial( [material, PLANEmaterial] );
	if(inverse) cartonFace = new THREE.MeshFaceMaterial( [PLANEmaterial, material] );
	return cartonFace;
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function movement(value, object, delay, duration){
          var tween = new TWEEN.Tween(object).to(
          	value
          	,duration).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
          	/*camera.position.x = valueX;
          	camera.position.y = valueY;
          	camera.position.z = valueZ;*/
          }).delay(delay).start();
}

function animate() {

	setTimeout( function() {
		requestAnimationFrame( animate );
	}, 1000/30 );

  TWEEN.update();

	render();

	//if(controls) controls.update( clock.getDelta() );
}

function render(){
	renderer.render(scene,camera);
}
