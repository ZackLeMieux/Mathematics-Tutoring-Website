import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };
        
        //console.log(this.room);
        //console.log(this.actualRoom);
        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }

    setModel(){
        this.actualRoom.children.forEach((child)=>{
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;


                });
            }

            //console.log(child);

        if(child.name === "tableLanternGlass"){
            child.material = new THREE.MeshPhysicalMaterial();
            child.material.roughness = 0;
            child.material.color.set(0x549dd2);
            child.material.ior = 3;
            child.material.transmission = 1;
            child.material.opacity = 1;
            child.material.depthWrite = false;
            child.material.depthTest = false;
        } 

           if(child.name === "windows"){
            child.material = new THREE.MeshPhysicalMaterial();
            child.material.roughness = 0;
            child.material.color.set(0x549dd2);
            child.material.ior = 3;
            child.material.transmission = 1;
            child.material.opacity = 1;
       }

            if(child.name === "timeClockScreen"){
            child.material = new THREE.MeshPhysicalMaterial();
            child.material.roughness = 0;
            child.material.color.set(0x549dd2);
            child.material.ior = 3;
            child.material.transmission = 1;
            child.material.opacity = 1;
       } 

            if(child.name === "laptopScreen"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }

            child.scale.set(0,0,0);

            if (child.name === "introCube") {
                child.position.set(0, -1 , 0);
                child.rotation.y = Math.PI / 4;
            }
            this.roomChildren[child.name] = child;

        });

        //Lower Lantern Light for illuminanses of the lantern
        const width1 = 0.1;
        const height1 = 0.1;
        const intensity1 = 100;
        const rectLight1 = new THREE.RectAreaLight(
            0xffffff,
            intensity1,
            width1,
            height1
        );
    

        //rectLight.position.set(0.72412406921, 0.33919704437, -0.87813941955);
        rectLight1.position.set(36.20620346069336, 20.95985221862793, -43.9069709777832);
        rectLight1.rotation.x = -Math.PI / 2;
        rectLight1.rotation.z = Math.PI / 4;
        this.actualRoom.add(rectLight1);

        this.roomChildren["rectLight1"] = rectLight1;

        //const rectLightHelper1 = new RectAreaLightHelper(rectLight1);
        //rectLight1.add(rectLightHelper1);


        //Upper Lantern Light for large light
/*
        const width2 = 0.3;
        const height2 = 0.3;
        const intensity2 = 10;
        const rectLight2 = new THREE.RectAreaLight(
            0xffffff,
            intensity2,
            width2,
            height2
        );
       

        //rectLight.position.set(0.72412406921, 0.33919704437, -0.87813941955);
        rectLight2.position.set(36.20620346069336, 30.95985221862793, -43.9069709777832);
        rectLight2.rotation.x = -Math.PI / 2;
        rectLight2.rotation.z = Math.PI / 4;
        this.actualRoom.add(rectLight2);

        //const rectLightHelper2 = new RectAreaLightHelper(rectLight2);
        //rectLight2.add(rectLightHelper2);


        //Passing in the children
 
        this.roomChildren["rectLight2"] = rectLight2;
*/

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.02, 0.02, 0.02);
        //this.actualRoom.rotation.x = Math.PI/2;

    }
 
    setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom);
    const animations = this.room.animations;
    const animationNames = [
        'badgeMiddle1',
        'badgeMiddle2',
        'badgeMiddle3',
        'badgeMiddle4',
        'badgeMiddle5',
        'badgeMiddle6',
        'badgeMiddle7',
        'badgeMiddle8',
        'badgeMiddle9',
        'badgeMiddle10',
        'badgeMiddle11',
        'badgeMiddle12',
        'badgeMiddle13',
        'badgeMiddle14',
        'badgeMiddle15',
        'badgeTop1',
        'badgeTop2',
        'badgeTop3',
        'badgeTop4',
        'badgeTop5',
        'badgeTop6',
        'badgeTop7',
        'badgeTop8',
        'badgeTop9',
        'badgeTop10',
        'badgeTop11',
        'badgeTop12'
    ];
    // Load animations and create animation actions
    const animationActions = animationNames.map(name => this.mixer.clipAction(animations.find(animation => animation.name === name)));
    // Play animation actions
    animationActions.forEach(action => action.play());
    }

    onMouseMove(){
        window.addEventListener("mousemove", (e) =>{
            //console.log(e);
            this.rotation = (
                (e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
                this.lerp.target = this.rotation * 0.05;
        });
    }

    resize(){
        
    }

    update(){
        //Room "Wiggle" Update
       this.lerp.current = GSAP.utils.interpolate(
        this.lerp.current,
        this.lerp.target,
        this.lerp.ease
    );

    this.actualRoom.rotation.y = this.lerp.current;

    //Animation Update
    this.mixer.update(this.time.delta * 0.0009);
    }
}