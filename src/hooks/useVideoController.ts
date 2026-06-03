import { useEffect, RefObject } from "react";

/**
 * Hook personnalisé permettant de contrôler intelligemment la lecture/pause d'une vidéo
 * en fonction de sa visibilité dans le viewport (seuil de 10%).
 * Améliore drastiquement l'autonomie et les performances CPU/GPU.
 *
 * @param videoRef Référence vers l'élément HTMLVideoElement
 */
export default function useVideoController(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reprendre la lecture si la vidéo est visible à plus de 10%
            video.play().catch(() => {
              // Gère gracieusement le blocage éventuel de l'auto-play par le navigateur
            });
          } else {
            // Mettre en pause dès qu'elle sort à moins de 10%
            video.pause();
          }
        });
      },
      {
        threshold: 0.1, // Seuil de 10% de visibilité dans le viewport
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [videoRef]);
}
