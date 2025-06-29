import React from 'react';
import { motion } from "motion/react"
import team1 from '../../assets/team/group-six-indian-businessman-suits-posed-outdoor-winter-day-europe-looking-laptop.jpg'
import team2 from '../../assets/team/man-checked-t-shirt-looking-laptop-half-turn-holding-opened-laptop-working-emotion-indoors-studio-waist-up-profile.jpg'


const Banner = () => {
    return (
        <div className="hero bg-base-200  max-w-5xl mx-auto">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className='flex-1'>
      <motion.img 
      animate={{y:[100,150,100]}}
      transition={{duration:6,repeat:Infinity}}
      
      src={team1}
      className="max-w-sm w-96 border-blue-600 border-l-8 border-b-8  rounded-t-4xl rounded-br-4xl shadow-2xl object-cover"
    />
      <motion.img 
      animate={{x:[100,150,100]}}
      transition={{duration:10 ,delay:3,repeat:Infinity}}
      src={team2}
      className="max-w-sm w-80 border-blue-600 border-l-8 border-b-8  rounded-t-4xl rounded-br-4xl shadow-2xl object-cover"
    />
  
    </div>
    <div className='flex-1'>
      <motion.h1
      initial={{scale:0}}
      animate={{scale:1,transition:{duration:5}}}
      className="text-5xl font-bold">Letest <motion.span animate={{
        color:["#6ade12","#db1d6f",'#0f1ebf'],
        transition:{duration:3,repeat:Infinity}
      }}
      > jobs</motion.span> for you</motion.h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
    );
};

export default Banner;