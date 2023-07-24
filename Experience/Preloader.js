import { EventEmitter } from "events";
import Experience from "./Experience";
import gsap from "gsap";
import convert from "./Utils/convertDivsToSpans.js";

export default class Preloader extends EventEmitter {
    constructor() {
        super();

        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        this.world.on("worldready", ()=> {
            this.setAssets();
            this.playIntro();
        });

    }

    setAssets(){
        
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".hero-second-subheading"));
        convert(document.querySelector(".second-sub"));
        

        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        console.log(this.roomChildren);
    }

    firstIntro(){
        return new Promise ((resolve) => { 
            this.timeline = new gsap.timeline();
            this.timeline.set(".animatedis", { y: 0, yPercent: 100});
            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 1,
                onComplete: () => {
                    document
                        .querySelector(".preloader")
                        .classList.add("hidden");
                },
            });
            if(this.device === "desktop") {
                this.timeline.to(this.roomChildren.cubeIntro.scale, {
                    x: 14,
                    y: 14,
                    z: 14,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }
                ).to(this.room.position, {
                    x: -1,
                    ease: "power1.out",
                    duration: 0.7,
                }
                );
            } else {
                this.timeline.to(this.roomChildren.cubeIntro.scale, {
                    x: 14,
                    y: 14,
                    z: 14,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    z: -1,
                    ease: "power1.out",
                    duration: 0.7,
                });
            }
            this.timeline.to(".intro-text .animatedis", {
                yPercent: 0,
                stagger: 0.05,
                ease: "back.out(1.7)",
                }
                ).to(".arrow-svg-wrapper", {
                    opacity: 1,
                },
                "same"
                ).to(".toggle-bar", {
                    opacity: 1,
                    onComplete: resolve,
                },
                "same"
            );
        });
    }



    secondIntro(){
        return new Promise((resolve) => {

            this.secondTimeline = new gsap.timeline();

            this.secondTimeline.to(".intro-text .animatedis", {
                yPercent: 100,
                stagger: 0.05,
                ease: "back-in(1.7)",
            },
            "fadeout"
            )
            .to(".arrow-svg-wrapper", {
                opacity: 0,
            },
            "fadeout"
            )
            .to(this.room.position, {
                x: 0,
                y: 0,
                z: 0,
                ease: "power1.out",
            },
            "same"
            )
            .to(this.roomChildren.cubeIntro.rotation, {
                y: 2 * Math.PI + Math.PI / 4,
            },
            "same"
            ).to(this.camera.orthographicCamera.position, {
                y: 6,
                z: 9,
            },
            "same"
            ).to(this.roomChildren.cubeIntro.scale, {
                x: 65,
                y: 32.5,
                z: 34.6,
            }, 
            "same"
            ).to(this.roomChildren.cubeIntro.position, {
                x: 40.8716,
                y: 30.331,
                z: -43.238,
            },
            "same"
            ).set(this.roomChildren.body.scale, {
                x: 1,
                y: 1,
                z: 1,
            }
            ).to(this.roomChildren.cubeIntro.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1,
            },
            "introtext"
            ).to(".hero-main-title .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back-out(1.7)",
            },
            "introtext"
            ).to(".hero-main-description .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back-out(1.7)",
            },
            "introtext"
            ).to(".first-sub .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back-out(1.7)",
            },
            "introtext"
            ).to(".second-sub .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back-out(1.7)",
            },
            "introtext"
            )
/* -------------------- Intro Animation Groups ------------------------- */

/* -------------------- Intro Animation Table to Shelves Groups ------------------------- */
            
            .to(this.roomChildren.floor.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5,
            },
            ">-0.5"
            ).to(this.roomChildren.windows.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5,
            },
            ">-0.5"
            ).to(this.roomChildren.Table.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5,
            },
            ">-0.5"
            ).to(this.roomChildren.tableLantern.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5,
            },
            ">0.02"
            ).to(this.roomChildren.tableLanternGlass.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5,
            },
            ">0.02"
            ).to(this.roomChildren.laptop.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5,
            },
            ">0.02"
            ).to(this.roomChildren.laptopScreen.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5,
            }
            ).to(this.roomChildren.chairs.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5,
            },
            ">-0.5"
            ).to(this.roomChildren.timeClockScreen.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5,
            },
            ">0.02"
            )
            
    /* --------- Rest of Groups----------- */ 
            .to(this.roomChildren.leftBookShelfAndWindow.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5,
            },
            ">-0.5"
            ).to(this.roomChildren.bookGroupA1.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupA2.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupA3.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupA4.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupA5.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupA6.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupA7.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupA8.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupA9.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupA10.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupA11.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupA12.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupA13.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupA14.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupA15.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.middleBookShelfandClock.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5,
            },
            ">-0.5"
            ).to(this.roomChildren.bookGroupB1.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupB2.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupB3.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupB4.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupB5.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupB6.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupB7.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupB8.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupB9.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupB10.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupB11.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupB12.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.rightBookShelfAndWindow.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5,
            },
            ">-0.5"
            ).to(this.roomChildren.bookGroupC1.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupC2.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupC3.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupC4.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupC5.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupC6.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupC7.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupC8.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupC9.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupC10.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupC11.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupC12.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.soloRightBookShelfAndWindow.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5,
            },
            ">-0.5"
            ).to(this.roomChildren.bookGroupD1.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupD2.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupD3.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupD4.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupD5.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupD6.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupD7.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupD8.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupD9.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupD10.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.bookGroupD11.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.05,
            },
            ">0.02"
            ).to(this.roomChildren.badgeTop1.scale, {
                x: 6,
                y: 6,
                z: 6,
                ease: "back-out(2.2)",
                duration: 0.1,
            },
            ">0.02"
            ).to(this.roomChildren.badgeTop2.scale, {
                x: 6,
                y: 6,
                z: 6,
                ease: "back-out(2.2)",
                duration: 0.1,
            },
            ">0.02"
            ).to(this.roomChildren.badgeTop3.scale, {
                x: 6,
                y: 6,
                z: 6,
                ease: "back-out(2.2)",
                duration: 0.1,
            },
            ">0.02"
            ).to(this.roomChildren.badgeTop4.scale, {
                x: 6,
                y: 6,
                z: 6,
                ease: "back-out(2.2)",
                duration: 0.1,
            },
            ">0.02"
            ).to(this.roomChildren.badgeTop5.scale, {
                x: 6,
                y: 6,
                z: 6,
                ease: "back-out(2.2)",
                duration: 0.1,
            },
            ">0.02"
            ).to(this.roomChildren.badgeTop6.scale, {
                x: 6,
                y: 6,
                z: 6,
                ease: "back-out(2.2)",
                duration: 0.1,
            },
            ">0.02"
            ).to(this.roomChildren.badgeTop7.scale, {
                x: 6,
                y: 6,
                z: 6,
                ease: "back-out(2.2)",
                duration: 0.1,
            },
            ">0.02"
            ).to(this.roomChildren.badgeTop8.scale, {
                x: 6,
                y: 6,
                z: 6,
                ease: "back-out(2.2)",
                duration: 0.1,
            },
            ">0.02"
            ).to(this.roomChildren.badgeTop9.scale, {
                x: 6,
                y: 6,
                z: 6,
                ease: "back-out(2.2)",
                duration: 0.1,
            },
            ">0.02"
            ).to(this.roomChildren.badgeTop10.scale, {
                x: 6,
                y: 6,
                z: 6,
                ease: "back-out(2.2)",
                duration: 0.1,
            },
            ">0.02"
            ).to(this.roomChildren.badgeTop11.scale, {
                x: 6,
                y: 6,
                z: 6,
                ease: "back-out(2.2)",
                duration: 0.1,
            },
            ">0.02"
            ).to(this.roomChildren.badgeTop12.scale, {
                x: 6,
                y: 6,
                z: 6,
                ease: "back-out(2.2)",
                duration: 0.1,
            },
            ">0.02"
            ).to(this.roomChildren.groundObjects.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5,
            },
            ">0.02"
            ).to([this.roomChildren.badgeMiddle1.scale, this.roomChildren.badgeMiddle2.scale, this.roomChildren.badgeMiddle3.scale, this.roomChildren.badgeMiddle4.scale, this.roomChildren.badgeMiddle5.scale, this.roomChildren.badgeMiddle6.scale, this.roomChildren.badgeMiddle7.scale, this.roomChildren.badgeMiddle8.scale, this.roomChildren.badgeMiddle9.scale, this.roomChildren.badgeMiddle10.scale, this.roomChildren.badgeMiddle11.scale, this.roomChildren.badgeMiddle12.scale, this.roomChildren.badgeMiddle13.scale, this.roomChildren.badgeMiddle14.scale, this.roomChildren.badgeMiddle15.scale], {
                x: 1,
                y: 1,
                z: 1,
                ease: "back-out(2.2)",
                duration: 0.5,
            },
            ">0.02"
            ).to(".arrow-svg-wrapper", {
                opacity: 1,
                onComplete: resolve,
            }) ;
        });
    }

    onScroll(e) {
        if(e.deltaY > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e) {
        this.initialY = e.touches[0].clientY;
    } 
    
    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if (difference > 0) {
            console.log("swipped up");
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.initialY = null;
    }
    
    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro() {
        this.scaleFlag = true;
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }

    async playSecondIntro(){
        this.moveFlag = false;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("enablecontrols");
    }

    move() {
        if (this.device === "desktop") {
            this.room.position.set(-1,0,0);
        } else {
            this.room.position.set(0,0,-1);
        }
    }
    
    scale() {
        this.roomChildren.rectLight1.width1 = 0;
        this.roomChildren.rectLight1.height2 = 0;

        if (this.device === "desktop") {
            this.room.scale.set(0.02, 0.02, 0.02);
        } else {
            this.room.scale.set(0.02, 0.02, 0.02);
        }
    }

    update() {
        if (this.moveFlag) {
            this.move();
        }

        if (this.scaleFlag) {
            this.scale();
        }
    }

}