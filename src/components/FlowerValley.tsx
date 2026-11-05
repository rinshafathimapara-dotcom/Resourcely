import { useEffect, useRef } from 'react';

interface Flower { x: number; z: number; height: number; hue: number; size: number; phase: number }
// Original procedural artwork: no third-party compiled engine or assets.
export default function FlowerValley({ paused }: { paused: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, frame = 0, previous = 0, travel = 0, pointerX = 0;
    let seed = 1937;
    const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const flowers: Flower[] = Array.from({ length: 1050 }, () => ({
      x: (random() - .5) * 20, z: random() * 26 + 1,
      height: .12 + random() * .75, hue: random() > .35 ? 215 + random() * 65 : 25 + random() * 30,
      size: .025 + random() * .055, phase: random() * Math.PI * 2,
    }));
    const stars = Array.from({ length: 90 }, () => ({ x: random(), y: random() * .62, size: random() + .2 }));
    function resize() {
      width = canvas!.clientWidth; height = canvas!.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas!.width = Math.round(width * ratio); canvas!.height = Math.round(height * ratio);
      ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);
      cancelAnimationFrame(frame); frame=requestAnimationFrame(draw);
    }
    const observer = new ResizeObserver(resize); observer.observe(canvas); resize();
    const pointer = (event: PointerEvent) => { pointerX = (event.clientX / width - .5); };
    const wheel = (event: WheelEvent) => { if (!motion.matches && !pausedRef.current) travel += Math.max(-.4, Math.min(.4, event.deltaY * .0009)); };
    window.addEventListener('pointermove', pointer, { passive: true });
    canvas.addEventListener('wheel', wheel, { passive: true });
    function draw(time: number) {
      const dt = Math.min((time - previous) / 1000 || 0, .05); previous = time;
      if (!motion.matches && !pausedRef.current && !document.hidden) travel += dt * .24;
      const sway = motion.matches || pausedRef.current ? 0 : Math.sin(time * .00023);
      const horizon = height * .46;
      ctx!.fillStyle = '#050b12'; ctx!.fillRect(0, 0, width, height);
      const atmosphere = ctx!.createRadialGradient(width * .52, horizon, 0, width * .52, horizon, width * .7);
      atmosphere.addColorStop(0, '#1b2931'); atmosphere.addColorStop(.4, '#101b25'); atmosphere.addColorStop(1, '#03070d');
      ctx!.fillStyle = atmosphere; ctx!.fillRect(0, 0, width, height);
      for (const star of stars) {
        ctx!.fillStyle = 'rgba(216,221,227,.36)';ctx!.beginPath();ctx!.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2);ctx!.fill();
      }
      // Layered valley ridges leave a quiet corridor behind the headline.
      for (let layer = 0; layer < 3; layer++) {
        ctx!.fillStyle = ['#0c1620','#09131a','#071015'][layer];
        ctx!.beginPath();ctx!.moveTo(0,height);
        for(let i=0;i<=70;i++) {const x=i/70;const edge=Math.pow(Math.abs(x-.5)*2, .7);const y=horizon-height*edge*(.17+layer*.06)+Math.sin(x*19+layer)*height*.014;ctx!.lineTo(x*width,y);}
        ctx!.lineTo(width,height);ctx!.closePath();ctx!.fill();
      }
      const sorted = flowers.map(f => ({...f, depth: 1 + ((f.z - travel) % 26 + 26) % 26})).sort((a,b)=>b.depth-a.depth);
      ctx!.globalCompositeOperation='screen';
      for (const flower of sorted) {
        const scale = Math.min(width,height) * .88 / flower.depth;
        const bend = Math.sin(flower.depth*.15 + travel*.06)*1.7;
        const side = Math.abs(flower.x);
        const ground = .85 + Math.pow(side*.2,1.8)*.9;
        let x = width*.5 + (flower.x+bend)*scale + (motion.matches?0:pointerX*14);
        let y = horizon + ground*scale;
        if(x < -60 || x > width+60 || y > height+100) continue;
        const tipY = y - flower.height*scale;
        const radius = Math.max(.5,flower.size*scale);
        const alpha = Math.min(1,(28-flower.depth)/17)*.85;
        const wind = sway*Math.sin(flower.phase)*Math.min(10,scale*.045);
        x += wind;
        ctx!.strokeStyle=`rgba(72,111,112,${alpha*.28})`;ctx!.lineWidth=Math.max(.4,radius*.12);
        ctx!.beginPath();ctx!.moveTo(x-wind,y);ctx!.quadraticCurveTo(x+radius,tipY+scale*.12,x,tipY);ctx!.stroke();
        const glow=ctx!.createRadialGradient(x,tipY,0,x,tipY,radius*5);
        glow.addColorStop(0,`hsla(${flower.hue},70%,72%,${alpha*.22})`);glow.addColorStop(1,`hsla(${flower.hue},70%,55%,0)`);
        ctx!.fillStyle=glow;ctx!.fillRect(x-radius*5,tipY-radius*5,radius*10,radius*10);
        for(let petal=0;petal<5;petal++) {const angle=petal*Math.PI*2/5+flower.phase;ctx!.fillStyle=`hsla(${flower.hue},55%,${68+flower.depth*.3}%,${alpha*.8})`;ctx!.beginPath();ctx!.ellipse(x+Math.cos(angle)*radius*.75,tipY+Math.sin(angle)*radius*.65,radius*.74,radius*.38,angle,0,Math.PI*2);ctx!.fill();}
        ctx!.fillStyle=`rgba(249,222,168,${alpha})`;ctx!.beginPath();ctx!.arc(x,tipY,radius*.24,0,Math.PI*2);ctx!.fill();
      }
      ctx!.globalCompositeOperation='source-over';
      const shade=ctx!.createRadialGradient(width*.5,height*.48,height*.1,width*.5,height*.5,Math.max(width,height)*.7);
      shade.addColorStop(0,'rgba(2,6,10,.06)');shade.addColorStop(1,'rgba(2,6,10,.87)');ctx!.fillStyle=shade;ctx!.fillRect(0,0,width,height);
      // Keep static artwork under reduced motion or pause, without a busy render loop.
      if(!motion.matches && !pausedRef.current && !document.hidden) frame=requestAnimationFrame(draw);
    }
    const resume = () => { cancelAnimationFrame(frame); previous=0;frame=requestAnimationFrame(draw); };
    motion.addEventListener('change',resume);document.addEventListener('visibilitychange',resume);
    // React pause updates dispatch this event without rebuilding the generated field.
    window.addEventListener('valley-motion-change',resume);
    cancelAnimationFrame(frame); frame=requestAnimationFrame(draw);
    return () => {cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('pointermove',pointer);canvas.removeEventListener('wheel',wheel);motion.removeEventListener('change',resume);document.removeEventListener('visibilitychange',resume);window.removeEventListener('valley-motion-change',resume);};
  }, []);
  useEffect(() => { window.dispatchEvent(new Event('valley-motion-change')); }, [paused]);
  return <canvas className="flower-valley" ref={canvasRef} aria-hidden="true"/>;
}
