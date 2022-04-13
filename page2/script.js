gsap.registerPlugin(ScrollTrigger);

const bgVvideo = document.querySelector("#bgVideo");
const bgVideoSegments = [0, 10, 30, 60, 80, 90, 100, 120]; // seconds

bgVideo.pause();
bgVideo.currentTime = 0;

let sections = gsap.utils.toArray(".step"),
    videoTweenTmp = gsap.fromTo(bgVideo, {currentTime: bgVideoSegments[0] }, {currentTime: bgVideoSegments[sections.length], duration: bgVideoSegments[sections.length], ease: "none", paused: true}),
    videoTween = gsap.to(videoTweenTmp, {duration: 1, ease: "power2", paused: true});

sections.forEach((step,i) => {
  
    let segmentLength = bgVideoSegments[i+1] - bgVideoSegments[i],
        inc = segmentLength / bgVideoSegments[sections.length];

    step.style.height = segmentLength*20 + "vh";

   	let ST = ScrollTrigger.create({
        trigger: step,
        start: "bottom bottom", 
        end: "+=1000", 
        pin: true,
        anticipatePin: 1,
        // markers: true,
	  });
//     }

    let starting;

    if (i == 0) {
        starting = "top top"
    } else{
        starting = "top bottom"
    }

    ScrollTrigger.create({
        trigger: step,
        start: starting,
        end: "bottom bottom",
        // onToggle: self => console.log("toggled, isActive:", self.isActive),
        onUpdate: self => {
          videoTween.vars.progress = (bgVideoSegments[i] / bgVideoSegments[sections.length]) + (self.progress * inc) ;
          videoTween.invalidate().restart();
          // console.log(100*segmentLength + "  " + i + "  " + self.progress  + "  " + inc + "  " + videoTween.vars.progress);
        },
        // markers: true,
    });

});