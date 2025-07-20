import React from 'react';
import type { CollectionEntry } from 'astro:content';

interface Props {
  posts: CollectionEntry<'noticias'>[];
}

export default function FeaturedNews({ posts }: Props) {
  // Si no hay posts, no renderizamos nada.
  if (!posts || posts.length === 0) {
    return null; 
  }

  // Si hay posts, renderizamos esta caja de prueba.
  return (
    <div style={{ 
      padding: '2rem', 
      margin: '2rem', 
      backgroundColor: 'cyan', 
      border: '4px dashed blue',
      color: 'black'
    }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
        PRUEBA DE COMPONENTE DE NOTICIAS
      </h2>
      <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
        El componente se está renderizando y recibió {posts.length} noticia(s).
      </p>
      <ul style={{ listStyle: 'disc', marginLeft: '2rem', marginTop: '1rem' }}>
        {posts.map(post => (
          <li key={post.id}>{post.data.title}</li>
        ))}
      </ul>
    </div>
  );
}