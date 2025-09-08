// app/page.tsx
'use client';

import { useEffect, useRef } from 'react';

interface ConfettiParticle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    rotation: number;
    rotationSpeed: number;
    image: HTMLImageElement;
}

const confettiImages = [
    'images/chip.jpg',
    'images/chip.jpg',
    'images/chip.jpg',
];

const ConfettiCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<ConfettiParticle[]>([]);
    const loadedImagesRef = useRef<HTMLImageElement[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Load images
        let imagesLoaded = 0;
        confettiImages.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                imagesLoaded++;
                if (imagesLoaded === confettiImages.length) {
                    loadedImagesRef.current = confettiImages.map(url => {
                        const image = new Image();
                        image.src = url;
                        return image;
                    });
                }
            };
        });

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const spawnConfetti = (x: number, y: number, count = 100) => {
        const particles = particlesRef.current;
        const images = loadedImagesRef.current;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI - Math.PI / 2; // spread
            const speed = Math.random() * 6 + 4;
            particles.push({
                x,
                y,
                size: Math.random() * 20 + 10,
                speedX: speed * Math.cos(angle),
                speedY: speed * Math.sin(angle) * -1,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5,
                image: images[Math.floor(Math.random() * images.length)],
            });
        }
        animate();
    };

    const animate = () => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        const particles = particlesRef.current;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const p of particles) {
            p.x += p.speedX;
            p.y += p.speedY;
            p.speedY += 0.1; // gravity
            p.rotation += p.rotationSpeed;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.drawImage(p.image, -p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
        }

        // Remove offscreen particles
        particlesRef.current = particles.filter(p => p.y < canvas.height + 50);

        if (particlesRef.current.length > 0) {
            requestAnimationFrame(animate);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spawnConfetti(x, y, 100);
    };

    return <canvas ref={canvasRef} onClick={handleClick} style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'auto', zIndex: 9999 }} />;
};

export default function Page() {
    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
            <h1 style={{ cursor: 'pointer' }}>Click anywhere for confetti 🎉</h1>
            <ConfettiCanvas />
        </div>
    );
}
