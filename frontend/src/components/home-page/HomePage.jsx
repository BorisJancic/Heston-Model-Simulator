import React from 'react'
import { Link } from 'react-router-dom';
import './home-page.css'

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const HomePage = () => {
  const particlesInit = useCallback(async engine => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
      await console.log(container);
  }, []);
  
  return (
    <div>
      <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "#000000",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        directions: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 6,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        />
      <h1>Home Page</h1>
      <div>
        <div class="split left1">
          <div class="black-scholes">
            <Link to='/graphs'>
              <h1>Black Sholes Model</h1>
              <p className='p'>Closed form solution for option price</p>
              <p className='p'>and derivatives</p>
            </Link>
          </div>
        </div>
        <div class="split right1">
          <div class="random-walk">
            <Link to='/random-walk'>
              <h1>Random Walk</h1>
              <p className='p'>Simulate option prices using</p>
              <p className='p'>Brownian motion</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="info-page">
        <Link to='/info-page'>
          <h1>Info Page</h1>
        </Link>
      </div>

    </div>
  )
}

export default HomePage