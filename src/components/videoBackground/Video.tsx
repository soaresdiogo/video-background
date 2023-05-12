import { useEffect, useRef } from 'react';
import skydiving from '../../assets/skydiving.mp4';

export const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    function handleScroll() {
      if (video) {
        video.pause();
        if (scrollTimeoutRef.current !== null) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = window.setTimeout(handleScrollEnd, 200);
      }
    }

    function handleScrollEnd() {
      if (video) {
        video.play();
      }
    }

    if (video) {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current !== null) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [videoRef]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: '#000000cc',
        }}
      ></div>
      <video
        src={skydiving}
        ref={videoRef}
        autoPlay
        loop
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: '0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      ></div>
    </div>
  );
};
