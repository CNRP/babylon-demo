window.addEventListener('DOMContentLoaded', function () {

    var canvas = document.getElementById('canvas');
    var engine = new BABYLON.Engine(canvas, true);

    var createScene = function () {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.FromHexString("#121838");

        var animationsOver = false;

        var camera = new BABYLON.FreeCamera('camera1', new BABYLON.
            Vector3(0, 0, -50), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        
        camera.attachControl(canvas, true);

        camera.keysUp.push(87);
        camera.keysDown.push(83);
        camera.keysLeft.push(65);
        camera.keysRight.push(68);


        var keys = [];

        var animationCamera = new BABYLON.Animation(
            "myAnimationcamera",
            "position",
            30,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );

        keys.push({
            frame: 0,
            value: new BABYLON.Vector3(10, 20, -50),
            // outTangent: new BABYLON.Vector3(1, 0, 0)
        });

        keys.push({
            frame: 30,
            value: new BABYLON.Vector3(10, 0, -50),
            // outTangent: new BABYLON.Vector3(1, 0, 0)
        });

        keys.push({
            frame: 100,
            value: new BABYLON.Vector3(0, 0, -10.2),
        });

        keys.push({
            frame: 130,
            // inTangent: new BABYLON.Vector3(-1, 0, 0),
            value: new BABYLON.Vector3(0, 0, -8.2),
        });
        animationCamera.setKeys(keys);

        camera.animations = [];
        camera.animations.push(animationCamera);

        scene.beginAnimation(camera, 0, 100, true);


        scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
        //scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        //BABYLON.Scene.FOGMODE_NONE;
        //BABYLON.Scene.FOGMODE_EXP;
        //BABYLON.Scene.FOGMODE_EXP2;
        //BABYLON.Scene.FOGMODE_LINEAR;

        scene.fogColor = new BABYLON.Color3(139/255, 223/255, 255/255);
        scene.fogDensity = 0.01;

    //Only if LINEAR
    scene.fogStart = 120.0;
    scene.fogEnd = 290.0;

        var woodPlank = BABYLON.MeshBuilder.CreateBox("plane", { width: 615, height: 1, depth: 405 }, scene);
        woodPlank.translate(new BABYLON.Vector3(0, 0, -1), -90);
        woodPlank.rotate(BABYLON.Axis.X, 1.5, BABYLON.Space.LOCAL);

        var material = new BABYLON.StandardMaterial("material", scene);
        material.diffuseTexture = new BABYLON.Texture("static/images/bg.png", scene);


        material.diffuseTexture.uScale = 10;
        material.diffuseTexture.vScale = 10;

        woodPlank.material = material;

        var woodPlank2 = BABYLON.MeshBuilder.CreateBox("plane", { width: 615, height: 1, depth: 150 }, scene);
        woodPlank2.translate(new BABYLON.Vector3(0, 0.15, 0), -90);

        var material2 = new BABYLON.StandardMaterial("material2", scene);
        material2 = new BABYLON.GridMaterial("groundMaterial2", scene);
        material2.opacity = 0.5;
        material2.majorUnitFrequency = 300;

        material2.gridRatio = 0.2;

        material2.lineColor = new BABYLON.Color4.FromHexString("#f1f1f1");

        woodPlank2.material = material2;

        // Setup environment
        //var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 2, 12), scene);
        var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
        light.diffuse = new BABYLON.Color3.FromHexString("#121838");
        light.intensity= 100;

        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", { diameter: 4, segments: 7 }, scene);
        sphere.material = new BABYLON.StandardMaterial("myMaterial", scene);
        sphere.material.wireframe = true;
        sphere.material.alpha = 0.03;
        sphere.material.ambientColor = BABYLON.Color3.Blue();


        var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", { diameter: 1.5, segments: 3 }, scene);
        sphere2.material = new BABYLON.StandardMaterial("myMaterial2", scene);
        sphere2.material.wireframe = true;
        sphere2.material.alpha = 0.03;
        sphere2.material.ambientColor = BABYLON.Color3.Blue();
        sphere2.position.x = 2.5;
        sphere2.position.y = 2.5;
        sphere2.position.z = 1.5;

        var sphere3 = BABYLON.MeshBuilder.CreateSphere("sphere3", { diameter: 1.5, segments: 3 }, scene);
        sphere3.material = new BABYLON.StandardMaterial("myMaterial2", scene);
        sphere3.material.wireframe = true;
        sphere3.material.alpha = 0.03;
        sphere3.material.ambientColor = BABYLON.Color3.Blue();

        sphere3.position.x = -2.5;
        sphere3.position.y = -1.5;
        sphere3.position.z = -1.5;

        /***************************************************************/

        /*************************World Axis for Rotation**********************/
        var angle = 0.001;
        var axis = new BABYLON.Vector3(1, 0, 1);

        scene.registerAfterRender(function () {
            sphere.rotate(axis, angle, BABYLON.Space.WORLD);
            sphere2.rotate(axis, angle * -1, BABYLON.Space.WORLD);
            sphere3.rotate(axis, angle + (0.001), BABYLON.Space.WORLD);
        });
        /***************************************************************/

        scene.registerAfterRender(function () {

            camera.setTarget(BABYLON.Vector3.Zero());

            console.log(camera.position.z * -1 >= 10.2);
            console.log(camera.position.z * -1);

            label4.text = "X:" + Math.round(camera.position.x) + " Y:" + Math.round(camera.position.y) + " Z:" + Math.round(camera.position.z);

            if (camera.position.z * -1 <=10.3) {
                animationsOver = true;
            }
        });

        // Create a particle system
        var particleSystem = new BABYLON.ParticleSystem("particles", 1000, scene);

        //Texture of each particle
        particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_MULTIPLYADD;
        // Where the particles come from
        particleSystem.emitter = BABYLON.Vector3.Zero(); // the starting location

        particleSystem.emitter.y = 0;

        // Colors of all particles
        particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
        particleSystem.color2 = new BABYLON.Color4.FromHexString("#29d4ff");
        particleSystem.colorDead = new BABYLON.Color4.FromHexString("#c2f3ff");

        // Size of each particle (random between...
        particleSystem.minSize = 0.1;
        particleSystem.maxSize = 0.2;

        // Life time of each particle (random between...
        particleSystem.minLifeTime = 5;
        particleSystem.maxLifeTime = 10;

        // Emission rate
        particleSystem.emitRate = 150;


        /******* Emission Space ********/
        particleSystem.createSphereEmitter(2);

        // Speed
        particleSystem.minEmitPower = 1;
        particleSystem.maxEmitPower = 3;
        particleSystem.updateSpeed = 0.0005;
        particleSystem.preWarmCycles = 400;
        particleSystem.preWarmStepOffset = 5;
        // Start the particle system
        particleSystem.start();

        var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "textures/heightMap2.png", 100, 100, 100, 0, 10, scene, false);
        ground.position.x = 0;
        ground.position.y = -12;
        ground.position.z = 20;

        ground.material = new BABYLON.GridMaterial("groundMaterial", scene);
        ground.material.opacity = 0.5;
        ground.material.majorUnitFrequency = 40;
        
        ground.material.gridRatio = 0.2;
       
        ground.material.lineColor = new BABYLON.Color4.FromHexString("#f1f1f1");

        var myLink = document.getElementById('mylink');

        console.log(camera.position.z);

        myLink.onclick = function () {
           // var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1, segments: 20 }, scene);
            //sphere.material = new BABYLON.StandardMaterial("myMaterial", scene);

            var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

            var image = new BABYLON.GUI.Image("but", "textures/site1.png");
            image.width = "576px"; 
            image.height = "324px"; 

            var image2 = new BABYLON.GUI.Image("img2", "images/logo.png");
            image2.width = "631px";
            image2.height = "200px"; 
            image2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            image2.left = 350;


            console.log(image2);

            advancedTexture.addControl(image);
            advancedTexture.addControl(image2);


            var text1 = new BABYLON.GUI.TextBlock();
            text1.text = "Hello world";
            text1.color = "white";
            text1.fontSize = 24;
            advancedTexture.addControl(text1);  

            return true;

        }

        var mouseOverUnit = function (unit_mesh) {
            if (unit_mesh.meshUnderPointer !== null) {
                if (unit_mesh.meshUnderPointer.id == "sphere1" && animationsOver) {
                    rect1.alpha = 1;
                    target1.alpha = 1;
                    line1.alpha = 1;
                    sphere.material.alpha = 0.3;
                }
                if (unit_mesh.meshUnderPointer.id == "sphere2" && animationsOver) {
                    rect2.alpha = 1;
                    target2.alpha = 1;
                    line2.alpha = 1;
                    sphere2.material.alpha = 0.3;
                }
                if (unit_mesh.meshUnderPointer.id == "sphere3" && animationsOver) {
                    rect3.alpha = 1;
                    target3.alpha = 1;
                    line3.alpha = 1;
                    sphere3.material.alpha = 0.3;
                }
            }
        }

        var mouseOutUnit = function (unit_mesh) {
            if (unit_mesh.meshUnderPointer !== null) {
                if (unit_mesh.meshUnderPointer.id == "sphere1" && animationsOver) {
                    rect1.alpha = 0;
                    target1.alpha = 0;
                    line1.alpha = 0;
                    sphere.material.alpha = 0.03;
                }
                if (unit_mesh.meshUnderPointer.id == "sphere2" && animationsOver) {
                    rect2.alpha = 0;
                    target2.alpha = 0;
                    line2.alpha = 0;
                    sphere2.material.alpha = 0.03;
                }
                if (unit_mesh.meshUnderPointer.id == "sphere3" && animationsOver) {
                    rect3.alpha = 0;
                    target3.alpha = 0;
                    line3.alpha = 0;
                    sphere3.material.alpha = 0.03;
                }
            }
        }

        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

//////////////////// GUI
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        var rect1 = new BABYLON.GUI.Rectangle();
        rect1.width = 0.06;
        rect1.height = "40px";
        rect1.color = "white";
        rect1.thickness = 2;
        advancedTexture.addControl(rect1);
        rect1.linkWithMesh(sphere);
        rect1.linkOffsetY = -150;
        rect1.linkOffsetX = -350;

        var label1 = new BABYLON.GUI.TextBlock();
        label1.text = "My Work";
        label1.fontFamily = "Courier";
        label1.fontSize = 20;
        rect1.addControl(label1);

        var target1 = new BABYLON.GUI.Ellipse();
        target1.width = "40px";
        target1.height = "40px";
        target1.color = "White";
        target1.thickness = 1;
        advancedTexture.addControl(target1);
        target1.linkWithMesh(sphere);

        var line1 = new BABYLON.GUI.Line();
        line1.lineWidth = 1;
        line1.color = "white";
        line1.y2 = 20;
        line1.linkOffsetY = -20;
        advancedTexture.addControl(line1);
        line1.linkWithMesh(sphere);
        line1.connectedControl = rect1;  

        rect1.alpha = 0;
        target1.alpha = 0;
        line1.alpha = 0;

        ////
        var rect2 = new BABYLON.GUI.Rectangle();
        rect2.width = 0.06;
        rect2.height = "40px";
        rect2.color = "white";
        rect2.thickness = 1;
        advancedTexture.addControl(rect2);
        rect2.linkWithMesh(sphere2);
        rect2.linkOffsetY = -150;
        rect2.linkOffsetX = 150;

        var label2 = new BABYLON.GUI.TextBlock();
        label2.text = "About";
        label2.fontFamily = "Courier";
        label2.fontSize = 20;
        rect2.addControl(label2);

        var target2 = new BABYLON.GUI.Ellipse();
        target2.width = "40px";
        target2.height = "40px";
        target2.color = "White";
        target2.thickness = 2;
        advancedTexture.addControl(target2);
        target2.linkWithMesh(sphere2);

        var line2 = new BABYLON.GUI.Line();
        line2.lineWidth = 1;
        line2.color = "white";
        line2.y2 = 20;
        line2.linkOffsetY = -20;
        advancedTexture.addControl(line2);
        line2.linkWithMesh(sphere2);
        line2.connectedControl = rect2;

        rect2.alpha = 0;
        target2.alpha = 0;
        line2.alpha = 0;
        ////
        ////
        var rect3 = new BABYLON.GUI.Rectangle();
        rect3.width = 0.06;
        rect3.height = "40px";
        rect3.color = "white";
        rect3.thickness = 1;
        advancedTexture.addControl(rect3);
        rect3.linkWithMesh(sphere3);
        rect3.linkOffsetY = -150;
        rect3.linkOffsetX = -150;

        var label3 = new BABYLON.GUI.TextBlock();
        label3.text = "Contact";
        label3.fontFamily = "Courier";
        label3.fontSize = 20;
        rect3.addControl(label3);

        var target3 = new BABYLON.GUI.Ellipse();
        target3.width = "40px";
        target3.height = "40px";
        target3.color = "White";
        target3.thickness = 2;
        advancedTexture.addControl(target3);
        target3.linkWithMesh(sphere3);

        var line3 = new BABYLON.GUI.Line();
        line3.lineWidth = 1;
        line3.color = "white";
        line3.y2 = 20;
        line3.linkOffsetY = -20;
        advancedTexture.addControl(line3);
        line3.linkWithMesh(sphere3);
        line3.connectedControl = rect3;

        rect3.alpha = 0;
        target3.alpha = 0;
        line3.alpha = 0;

        var label4 = new BABYLON.GUI.TextBlock();
        label4.text = "x:0y:0z:0";
        label4.fontFamily = "Courier";
        label4.fontSize = 20;
        label4.color = "white";

        var createRectangle = function () {
            var rect5 = new BABYLON.GUI.Rectangle();
            rect5.width = 0.1;
            rect5.height = "40px";
            rect5.thickness = 1;
            advancedTexture.addControl(rect5);
            rect5.addControl(label4);
            rect5.paddingBottom = "10px";
            rect5.paddingRight = "10px";
            rect5.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            return rect5;
        }


        createRectangle().horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        //////
        /////
        var action = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, mouseOverUnit);
        var action2 = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, mouseOutUnit);

        sphere.actionManager = new BABYLON.ActionManager(scene);
        sphere.actionManager.registerAction(action);
        sphere.actionManager.registerAction(action2);

        sphere2.actionManager = new BABYLON.ActionManager(scene);
        sphere2.actionManager.registerAction(action);
        sphere2.actionManager.registerAction(action2);

        sphere3.actionManager = new BABYLON.ActionManager(scene);
        sphere3.actionManager.registerAction(action);
        sphere3.actionManager.registerAction(action2);

//////////////////////////////////////////       

        return scene;
    }

    var scene = createScene();
    engine.runRenderLoop(function () {
        scene.render();
    });

});