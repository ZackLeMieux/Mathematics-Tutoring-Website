import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Environment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        //this.gui = new GUI({ container: document.querySelector(".hero-main") });
        this.obj = {
            colorObj: { r: 0, g: 0, b: 0},
            intensity: 3,
        };

        this.setSunlight();
        //this.setGUI();
    }

/*
    setGUI(){
        const sunlightFolder = this.gui.addFolder("Sunlight");

        // Add controls for adjusting the position of the sunlight
        const positionXControl = sunlightFolder.add(this.sunlight.position, "x", -10, 10).name("X Position");
        const positionYControl = sunlightFolder.add(this.sunlight.position, "y", -10, 10).name("Y Position");
        const positionZControl = sunlightFolder.add(this.sunlight.position, "z", -10, 10).name("Z Position");

          // Create a dot to represent the light position
        const dotGeometry = new THREE.SphereGeometry(0.1);
        const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const dot = new THREE.Mesh(dotGeometry, dotMaterial);

        // Function to update the position of the dot
        const updateDotPosition = () => {
            dot.position.copy(this.sunlight.position);
        };

        // Call the updateDotPosition function whenever the sunlight position is changed
        positionXControl.onChange(updateDotPosition);
        positionYControl.onChange(updateDotPosition);
        positionZControl.onChange(updateDotPosition);

        // Add the dot to the scene
        this.scene.add(dot);


        

        this.gui.addColor(this.obj, "colorObj").onChange(() => {
            this.sunlight.color.copy(this.obj.colorObj);
            //this.ambientLight.color.copy(this.obj.colorObj);
            console.log(this.obj.colorObj);
        });
        this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
            this.sunLight.intensity = this.obj.intensity;
            this.sunLight.ambientLight = this.obj.intensity;
        })
    }
*/

    setSunlight(){
        this.sunlight = new THREE.DirectionalLight("#ffffff", 3);
        this.sunlight.castShadow = true;
        this.sunlight.shadow.camera.far = 20;
        this.sunlight.shadow.mapSize.set(2048,2048);
        this.sunlight.shadow.normalBias = 0.05;


        //const helper = new THREE.CameraHelper(this.sunlight.shadow.camera);
        //this.scene.add(helper);

        this.sunlight.position.set(4, 3, 4);
        this.scene.add(this.sunlight);

        this.ambientLight = new THREE.AmbientLight("#ffffff", 1);

        //light.shadow.enabled = true;
        //light.shadow.castShadow = true;
        //light.shadow.mapSize.set(1024,1024);
        //light.shadow.camera.far = 20;

        this.scene.add(this.ambientLight);
    }

    switchTheme(theme){
        console.log(this.sunLight);
        if (theme === "dark"){
            const finalPosition = new THREE.Vector3(2.88, -0.08, -1.3);

            // Animate the light's position using GSAP
            GSAP.to(this.sunlight.position, {
              x: finalPosition.x,
              y: finalPosition.y,
              z: finalPosition.z,
              duration: 1.25, // Set the duration of the animation in seconds
            });
            GSAP.to(this.sunlight.color,{
                r: 0.158823529411764705,
                g: 0.23549019607843137,
                b: 0.611764705882353,
            });
            GSAP.to(this.ambientLight.color,{
                r: 0.158823529411764705,
                g: 0.23549019607843137,
                b: 0.611764705882353,
            });
            GSAP.to(this.sunLight, {
                intensity: 3,
            });
            GSAP.to(this.ambientLight, {
                intensity: 0.78,
            });

        } else {
            const finalPosition = new THREE.Vector3(4, 3, 4);

            // Animate the light's position using GSAP
            GSAP.to(this.sunlight.position, {
              x: finalPosition.x,
              y: finalPosition.y,
              z: finalPosition.z,
              duration: 1.25, // Set the duration of the animation in seconds
            });
            GSAP.to(this.sunlight.color,{
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.ambientLight.color,{
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });

            GSAP.to(this.sunLight, {
                intensity: 2,
            });
            GSAP.to(this.ambientLight, {
                intensity: 1,
            });
       }
    }

    resize(){
        
    }

    update(){
       
    }
}