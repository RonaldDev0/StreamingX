import { VideoCard } from '@/components'

export function Videos () {
  const videos = [
    {
      id: 1,
      title: 'Introducción a Next.js',
      description: 'Aprende Next.js desde cero con este video introductorio.'
    },
    {
      id: 2,
      title: 'Tutorial de React',
      description: 'Descubre cómo usar React para construir interfaces dinámicas.'
    },
    {
      id: 3,
      title: 'Mastering HeroUI',
      description: 'Domina la creación de interfaces modernas con HeroUI.'
    },
    {
      id: 4,
      title: 'Construyendo APIs con Node.js',
      description: 'Crea APIs robustas utilizando Node.js y Express.'
    },
    {
      id: 5,
      title: 'Introducción a TypeScript',
      description: 'Aprende los fundamentos de TypeScript para mejorar tus proyectos en JavaScript.'
    },
    {
      id: 6,
      title: 'React Hooks en Profundidad',
      description: 'Explora el uso avanzado de hooks en React para gestionar el estado y el ciclo de vida.'
    },
    {
      id: 7,
      title: 'Next.js y Renderizado del Lado del Servidor',
      description: 'Descubre cómo Next.js permite la renderización del lado del servidor para mejorar el rendimiento.'
    },
    {
      id: 8,
      title: 'Diseño de Interfaces con Tailwind CSS',
      description: 'Aprende a diseñar interfaces modernas y responsivas utilizando Tailwind CSS.'
    },
    {
      id: 9,
      title: 'GraphQL para Principiantes',
      description: 'Introducción a GraphQL y cómo implementarlo en tus proyectos.'
    },
    {
      id: 10,
      title: 'Deploy de Aplicaciones en Vercel',
      description: 'Aprende a desplegar tus aplicaciones Next.js en Vercel de forma sencilla.'
    }
  ]

  return (
    videos.map(video => (
      <VideoCard
        key={video.id}
        id={video.id.toString()}
        title={video.title}
      />
    ))
  )
}
