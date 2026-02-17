'use client';

import Image from 'next/image';

interface Book3DProps {
  coverSrc: string;
  alt: string;
  width?: number;
  height?: number;
}

export function Book3D({ coverSrc, alt, width = 240, height = 340 }: Book3DProps) {
  return (
    <div
      className="mx-auto"
      style={{
        perspective: '1200px',
        width: width,
        height: height,
      }}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-18deg)',
        }}
      >
        {/* Front cover */}
        <div
          className="absolute inset-0 rounded-sm overflow-hidden"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(12px)',
            backfaceVisibility: 'hidden',
          }}
        >
          <Image
            src={coverSrc}
            alt={alt}
            width={width * 2}
            height={height * 2}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Spine */}
        <div
          className="absolute top-0 h-full"
          style={{
            width: '24px',
            left: 0,
            transform: 'rotateY(90deg) translateZ(0px) translateX(-12px)',
            transformOrigin: 'left center',
            background: 'linear-gradient(to right, #d4d4d4, #e5e5e5, #d4d4d4)',
          }}
        />

        {/* Back cover */}
        <div
          className="absolute inset-0 rounded-sm"
          style={{
            transform: 'translateZ(-12px)',
            background: '#f5f5f5',
            backfaceVisibility: 'hidden',
          }}
        />

        {/* Page edges (top) */}
        <div
          className="absolute w-full"
          style={{
            height: '24px',
            top: 0,
            transform: 'rotateX(90deg) translateZ(0px) translateY(-12px)',
            transformOrigin: 'top center',
            background: 'linear-gradient(to bottom, #f0f0f0, #e8e8e8)',
          }}
        />

        {/* Page edges (bottom) */}
        <div
          className="absolute w-full"
          style={{
            height: '24px',
            bottom: 0,
            transform: 'rotateX(-90deg) translateZ(0px) translateY(12px)',
            transformOrigin: 'bottom center',
            background: 'linear-gradient(to top, #f0f0f0, #e8e8e8)',
          }}
        />

        {/* Page edges (right side — visible open pages) */}
        <div
          className="absolute top-0 h-full"
          style={{
            width: '24px',
            right: 0,
            transform: 'rotateY(-90deg) translateZ(0px) translateX(12px)',
            transformOrigin: 'right center',
            background: `repeating-linear-gradient(
              to right,
              #fafafa 0px,
              #f0f0f0 1px,
              #fafafa 2px
            )`,
          }}
        />

        {/* Drop shadow */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2"
          style={{
            width: '85%',
            height: '20px',
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, transparent 70%)',
            filter: 'blur(4px)',
            transform: 'translateX(-50%) translateZ(-14px)',
          }}
        />
      </div>
    </div>
  );
}
