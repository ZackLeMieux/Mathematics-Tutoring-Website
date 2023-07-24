import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP, { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";

export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        gsap.registerPlugin(ScrollTrigger);

        this.room.children.forEach((child) => {
            if (child.type === "RectAreaLight") 
            {
                this.rectLight1 = child;
            }
        });

        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        this.circleThird = this.experience.world.floor.circleThird;



        document.querySelector(".page").style.overflow = "visible";

        if(!/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
            {this.setSmoothScroll();
            }

        this.setScrollTrigger();
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.25,
            disableRaf: true
        });
    
        GSAP.ticker.add(asscroll.update);
    
        ScrollTrigger.defaults({
            scroller: asscroll.containerElement
        });
    
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
            },
            fixedMarkers: true
        });
    
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
        
        requestAnimationFrame(() => {
           asscroll.enable({
                newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]")
            }); 
        });
        return asscroll;
    }

    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            /* --------------------------- Desktop ------------------------------ */
            "(min-width: 969px)": () => {
                // console.log("fired desktop");
                this.room.scale.set(0.02, 0.02, 0.02);
                this.rectLight1.width1 = 0.1;
                this.rectLight1.height1 = 0.1;
                this.camera.perspectiveCamera.position.set(0, 6.5, 10);
                this.room.position.set(0, 0, 0);

                /* ------------------------- First Section --------------------------- */
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        //markers: true,
                        invalidateOnRefresh: true,
                    },
                });
                this.firstMoveTimeline.fromTo(
                    this.room.position, 
                    {x: 0, y: 0, z: 0},
                    {
                        x: () => {
                            return this.sizes.width * 0.0012;
                        }
                    }).
                    to(this.rectLight1,
                    {
                    width: 0.1 * 1.5,
                    height: 0.1 * 1.5,
                    },
                    "same"
                );

                /* --------------------- Second Section ------------------------ */
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                })
                    .to(
                        this.room.position,
                        {
                            x: () => {
                                return -2.8;
                            },
                            z: () => {
                                return this.sizes.height * 0.001;
                            },
                            y: () => {
                                return this.sizes.height * 0.001;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.room.scale,
                        {
                            x: 0.07,
                            y: 0.07,
                            z: 0.07,
                            
                        },
                        "same"
                    ).to(
                        this.room.rotation, 
                        {
                            x: Math.PI/6, // Rotate by pi/6 (30 degrees) about the z-axis
                        },
                        "same"
                    ).to(this.camera.orthographicCamera.position, {
                        x: 0.625,
                        z: 3,
                        },
                        "same"
                    ).to(this.rectLight1,
                        {
                            width1: 0.5 * 4,
                            height1: 0.7 * 4,
                        },
                        "same"
                    );

                /* --------------------------- Third Section ------------------------------ */
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(
                    this.room.scale,
                    {
                        x: 0.03,
                        y: 0.03,
                        z: 0.03,
                        
                    },
                    "same"
                ).to(this.room.position, {
                    y: 4,
                    x: 2,
                    z: 2,
                },
                "same"
                ).to(this.room.rotation, {
                    x: -Math.PI/6, // Rotate by pi/6 (30 degrees) about the z-axis
                },
                "same"
                );
            },

/* --------------------------- MOBILE ------------------------------ */

            "(max-width: 968px)": () => {
                // console.log("fired mobile");

                /* ------------------------- Resets ---------------------------- */
                this.room.scale.set(0.02, 0.02, 0.02);
                this.room.position.set(0, 0, 0);
                this.rectLight1.width1 = 0.3;
                this.rectLight1.height1 = 0.4;
                this.camera.perspectiveCamera.position.set(0, 6.5, 10);
                /* ------------------------- First Section ---------------------------- */
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        // invalidateOnRefresh: true,
                    },
                }).to(this.room.scale, {
                    x: 0.04,
                    y: 0.04,
                    z: 0.04,
                },
                    "same"
                ).to(this.room.position, {
                    x: -0.7,
                    z: 0.5,
                },
                    "same"
                );

                /* ------------------------- Second Section ---------------------------- */
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.scale, {
                    x: 0.055,
                    y: 0.055,
                    z: 0.055,
                },
                    "same"
                ).to(this.room.position, {
                    x: -1,
                    y: 2,
                    z: 5,
                },
                    "same"
                
/*                    )
                    .to(
                        this.rectLight,
                        {
                            width: 0.3 * 3.4,
                            height: 0.4 * 3.4,
                        },
                        "same"
                    )
                    .to(
                        this.room.position,
                        {
                            x: 1.5,
                        },
                        "same"
*/                    );

                /* ------------------------- Third Section ---------------------------- */
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.position, {
                    y: 1,
                    x: -1,
                },
                "same"
                ).to(this.room.rotation, {
                    x: -Math.PI/32, // Rotate by pi/6 (30 degrees) about the z-axis
                },
                "same"
                );
            },

            /* ------------------------------ ALL -------------------------------- */
            all: () => {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section) => {
                    this.progressWrapper =
                        section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if (section.classList.contains("right")) {
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    } else {
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }
                        GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        },
                    });
               });

                /* ---------------------- ALL ANIMATIONS ------------------------- */

                /* ---------------------- Circle Animations ----------------------*/


                
                /* ---------------------- First Section ------------------------- */
                this.firstCircle = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.circleFirst.scale, {
                    x: 3,
                    y: 3,
                    z: 3,              
                });
                /* ------------------------- Second Section ---------------------------- */
                this.secondCircle = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(
                    this.circleSecond.scale,
                    {
                        x: 3,
                        y: 3,
                        z: 3,
                    },                      
                    "same"
                );

                /* --------------------- Third Section ------------------------ */
                this.thirdCircle = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.circleThird.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                });

                /* ------------------- MINI PLATFORM ANIMATIONS -------------------- */
                this.secondPartTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "center center",
                    },
                });

                this.room.children.forEach((child) => {
                    if (child.name === "tutorTableObjects") {
                        this.first = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 0.3,
                        });
                    }
                    if (child.name === "centerTableObjects") {
                        this.second = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3,
                        });
                    }
                    if (child.name === "studentTableObjects") {
                        this.third = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3,
                        });
                    }
 
                });
                this.secondPartTimeline.add(this.first);
                this.secondPartTimeline.add(this.second);
                this.secondPartTimeline.add(this.third);
            },
        });
    }
    resize(){}

    update(){}
}