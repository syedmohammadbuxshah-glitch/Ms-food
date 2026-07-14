/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import burgerImg from './assets/images/levitating_burger_1783257934904.jpg';
import cheesyDoubleImg from './assets/images/cheesy_double_burger_1783260299740.jpg';
import gourmetArugulaImg from './assets/images/gourmet_arugula_burger_1783260314319.jpg';
import toweringBaconImg from './assets/images/towering_bacon_burger_1783260332285.jpg';
import flameChiliImg from './assets/images/flame_grilled_chili_burger_1783260349838.jpg';
import { Flame, Beef, Droplet, Star } from 'lucide-react';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imgLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Word reveal
    if (headlineRef.current) {
      headlineRef.current.innerHTML = '';
      const text = "Taste a burger that defies the laws of physics.";
      const words = text.split(' ');
      words.forEach((word, i) => {
        const span = document.createElement('span');
        span.className = 'word-reveal';
        span.textContent = word;
        span.style.animationDelay = `${1 + i * 0.05}s`;
        headlineRef.current?.appendChild(span);
        // Add a space after each word
        headlineRef.current?.appendChild(document.createTextNode(' '));
      });
    }

    // Spotlight logic
    const SPOTLIGHT_R = 300;
    const smooth = { x: -999, y: -999 };
    const mouse = { x: -999, y: -999 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const loop = () => {
      smooth.x += (mouse.x - smooth.x) * 0.1;
      smooth.y += (mouse.y - smooth.y) * 0.1;

      if (imgLayerRef.current) {
        imgLayerRef.current.style.setProperty('--spotlight-x', `${smooth.x}px`);
        imgLayerRef.current.style.setProperty('--spotlight-y', `${smooth.y}px`);
        imgLayerRef.current.style.setProperty('--spotlight-r', `${SPOTLIGHT_R}px`);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* SPLASH */}
      <div className="splash" id="splash">
        <div className="splash-row splash-row-top">
          <div className="splash-box"></div><div className="splash-box"></div><div className="splash-box"></div><div className="splash-box"></div><div className="splash-box"></div>
        </div>
        <div className="splash-row splash-row-bottom">
          <div className="splash-box"></div><div className="splash-box"></div><div className="splash-box"></div><div className="splash-box"></div><div className="splash-box"></div>
        </div>
      </div>

      {/* LOGO */}
      <div className="logo-wrapper">
        <div className="inner">
          <a href="/" aria-label="Home" style={{ textDecoration: 'none', fontWeight: 800 }}>
            <span style={{ color: '#FFCC00' }}>MS</span> <span style={{ color: '#E60000' }}>FOOD</span>
          </a>
        </div>
      </div>

      {/* BURGER */}
      <div className="burger-wrapper">
        <div className="inner">
          <button 
            className={`burger-btn ${menuOpen ? 'open' : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>

      {/* MENU PANEL */}
      <div className={`menu-panel ${menuOpen ? 'open' : ''}`} id="menu-panel">
        <nav>
          <a href="#menu" onClick={() => setMenuOpen(false)}>Our Menu</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>The Story</a>
          <a href="#locations" onClick={() => setMenuOpen(false)}>Locations</a>
        </nav>
        <div className="menu-contact">
          <a href="mailto:hello@msfood.com" className="menu-email">hello@msfood.com</a>
          <div className="menu-socials">
            <a href="#">Instagram</a>
            <a href="#">TikTok</a>
            <a href="#">Twitter</a>
          </div>
        </div>
        <div style={{ marginTop: '32px' }}>
          <button className="menu-cta-btn">
            <span className="menu-cta-bg"></span>
            <span className="menu-cta-text">Order Now</span>
            <span className="menu-cta-circle">
              <Flame className="w-4 h-4 text-white" />
            </span>
          </button>
        </div>
      </div>

      {/* HERO */}
      <main className="hero">
        {/* Big text behind image */}
        <div className="hero-big-text creator-text-animate">
          <h2>MS FOOD</h2>
        </div>

        {/* Base image */}
        <div 
          className="hero-base-img hero-image-animate"
          style={{ backgroundImage: `url(${burgerImg})` }}
        >
        </div>

        {/* Reveal layer with CSS mask */}
        <div 
          className="hero-reveal-img" 
          ref={imgLayerRef}
          style={{ backgroundImage: `url(${burgerImg})` }}
        >
        </div>

        {/* Content */}
        <div className="hero-content">
          <div className="hero-content-inner">
            <h1 className="hero-headline" ref={headlineRef}></h1>
            <button className="cta-btn cta-animate">
              <span className="cta-btn-bg"></span>
              <span className="cta-btn-text">Order the Impossible</span>
              <span className="cta-btn-circle">
                <Flame className="w-5 h-5 text-white" />
              </span>
            </button>
          </div>
        </div>
      </main>

      {/* MARQUEE */}
      <div className="marquee-container">
        <div className="marquee-content">
          100% WAGYU BEEF • TRIPLE MELTED CHEESE • FRESH CRISP LETTUCE • TOASTED BRIOCHE • MS FOOD QUALITY • 100% WAGYU BEEF • TRIPLE MELTED CHEESE • FRESH CRISP LETTUCE • TOASTED BRIOCHE • MS FOOD QUALITY • 
        </div>
      </div>

      {/* CONTENT SECTIONS WITH SCROLL ANIMATIONS */}
      <section className="content-section" id="story">
        <div className="content-grid">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="section-tag">The MS Food Difference</div>
            <h2 className="section-title">We don't just stack ingredients. We engineer perfection.</h2>
            <p className="section-desc">
              Every MS Food Burger is assembled with absolute precision. From the custom-blend 
              Wagyu patties seared to a perfect crust, to the proprietary melty cheese formulation, 
              we ensure every bite is an out-of-this-world experience. 
            </p>
          </motion.div>
          
          <div className="flex flex-col gap-6">
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="feature-icon"><Beef /></div>
              <h3 className="text-xl font-bold text-gray-900">Prime Cut Wagyu</h3>
              <p className="text-gray-600">Our signature blend is ground fresh daily from prime cuts, ensuring maximum flavor and juiciness.</p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              <div className="feature-icon"><Droplet /></div>
              <h3 className="text-xl font-bold text-gray-900">Liquid Gold Cheese</h3>
              <p className="text-gray-600">A proprietary blend of aged cheddars and fontina that melts like an absolute dream.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="content-section" id="menu">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-tag">Our Menu</div>
          <h2 className="section-title">Featured Burgers</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1400px] w-full">
          {[
            {
              name: "The MS Classic Double",
              description: "Two prime Wagyu patties, triple melted cheddar cheese, fresh crisp lettuce, and our secret sauce on a toasted brioche bun.",
              price: "599",
              image: cheesyDoubleImg
            },
            {
              name: "Gourmet Arugula Bistro",
              description: "Toasted sesame bun, flame-grilled premium beef patty, melted cheddar, red onion rings, fresh wild rocket arugula lettuce, served with rustic fries.",
              price: "649",
              image: gourmetArugulaImg
            },
            {
              name: "The Towering Bacon Stack",
              description: "A massive, towering triple beef patty burger stacked with melted Swiss, crispy double-smoked bacon strips, fresh tomatoes, and garden lettuce.",
              price: "799",
              image: toweringBaconImg
            },
            {
              name: "The Fiery Chili Flame",
              description: "A dynamic, hot-tempered flame-grilled patty topped with fresh red chili peppers, melted pepper jack, crisp lettuce, and a spicy chipotle infusion.",
              price: "699",
              image: flameChiliImg
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#E60000] shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="aspect-[4/3] w-full mb-6 overflow-hidden rounded-xl bg-gray-50 relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex justify-between items-start mb-3 gap-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#E60000] transition-colors line-clamp-1">{item.name}</h3>
                <span className="text-[#E60000] font-bold text-lg whitespace-nowrap">Rs {item.price}</span>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm mb-6 flex-grow">{item.description}</p>
              <button className="w-full py-3 rounded-lg bg-gray-900 text-white font-bold text-xs uppercase tracking-wider group-hover:bg-[#E60000] transition-colors">
                Add to Order
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="content-section pb-32" id="reviews">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-tag">Cult Following</div>
          <h2 className="section-title">Don't take our word for it.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] w-full">
          {[
            { name: "Alex R.", review: "Honestly, it ruined all other burgers for me. The cheese pull alone is worth the trip." },
            { name: "Sarah K.", review: "I didn't believe the hype until I tried it. The flavors are perfectly balanced and the crust on the patty is insane." },
            { name: "Mike T.", review: "Best burger I've had in my life. Hands down. The ambiance is just a bonus." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              className="bg-[#F9F9F9] p-8 rounded-2xl border border-[#E5E5E5] shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <div className="flex gap-1 text-[#FFCC00] mb-4">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">"{item.review}"</p>
              <p className="text-gray-900 font-bold tracking-wide uppercase text-sm">{item.name}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
