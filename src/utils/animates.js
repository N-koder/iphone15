import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

// use plugin with GSAP
gsap.registerPlugin(ScrollTrigger);



export const animatewithGsap = (target , animationProps , scrollsProps) => {
    console.log(target , animationProps , scrollsProps);
    gsap.to(target , {
        ...animationProps,

        scrollTrigger : {
            trigger : target ,
            toogleActions : 'restart reverse restart reverse',
            start  : 'top 85%',
            ...scrollsProps,
        }
    })
}



export const gsaptimeline = (timeline , rotationRef , rotationState , firstTarget , secondTarget , animationProps) => {

    timeline.to(rotationRef.current.rotation , {
        y : rotationState,
        duration : 1,
        ease : 'Power2.inOut'
    })

    timeline.to(firstTarget , {
        ...animationProps, ease : 'Power2.inOut'
    }
    , '<' // insert the animation at the start to the previous animation

    )

    timeline.to(secondTarget , {
        ...animationProps, ease : 'Power2.inOut'
    }
    , '<' // insert the animation at the start to the previous animation
    )
}


