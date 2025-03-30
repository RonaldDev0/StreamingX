'use client'
import { Card, CardHeader, CardBody, Avatar, Button, Textarea } from '@heroui/react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { useState } from 'react'
import { useUser } from '@/store'

export function Comments () {
  const { user } = useUser()
  const initialComments = [
    {
      author: 'Juan',
      text: '¡Excelente contenido! Realmente me ayudó a entender conceptos complejos y ahora me siento más seguro de mis habilidades. ¡Gracias! 😊👍',
      likes: 12,
      dislikes: 1
    },
    {
      author: 'María',
      text: 'Este video es increíble. La explicación fue muy detallada y clara, me motivó a seguir aprendiendo cada día. ¡Fantástico trabajo! 📚✨',
      likes: 8,
      dislikes: 0
    },
    {
      author: 'Pedro',
      text: 'Muy informativo y claro, el contenido está bien estructurado y me abrió la mente a nuevas ideas. Definitivamente vale la pena verlo. 😄👌',
      likes: 5,
      dislikes: 2
    },
    {
      author: 'Ana',
      text: 'Me encantó la forma en que se presenta la información, es entretenido y educativo a la vez. ¡Sigan así! 🤩👏',
      likes: 15,
      dislikes: 0
    },
    {
      author: 'Luis',
      text: 'Una gran explicación, muy completa y fácil de entender. Se notó el esfuerzo puesto en la producción del video. ¡Excelente trabajo! 🚀💡',
      likes: 10,
      dislikes: 1
    }
  ]

  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState('')

  const handleAddComment = (e: any) => {
    e.preventDefault()
    if (newComment.trim().length === 0) return

    const newCommentObj = {
      author: user?.user_name as string,
      text: newComment,
      likes: 0,
      dislikes: 0
    }

    setComments([newCommentObj, ...comments])
    setNewComment('')
  }

  return (
    <div>
      <div className='w-96 mx-auto my-4'>
        <Card className='w-full'>
          <CardBody className='p-4'>
            <form onSubmit={handleAddComment}>
              <Textarea
                placeholder='Agrega un nuevo comentario...'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className='mb-2'
                minRows={5}
              />
              <Button type='submit' size='sm' className='w-full'>
                Enviar comentario
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
      {comments.map((comment, index) => (
        <Card key={index} className='w-96 my-4'>
          <CardHeader className='p-4 flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <Avatar name={comment.author} />
              <h3 className='text-lg font-bold'>{comment.author}</h3>
            </div>
            <div className='flex items-center gap-2'>
              <Button variant='ghost' size='sm' className='flex items-center gap-1'>
                <ThumbsUp size={16} /> <span>{comment.likes}</span>
              </Button>
              <Button variant='ghost' size='sm' className='flex items-center gap-1'>
                <ThumbsDown size={16} /> <span>{comment.dislikes}</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className='p-4'>
            <p className='text-gray-500'>{comment.text}</p>
            <div className='mt-4'>
              <Button variant='ghost' size='sm'>
                Responder
              </Button>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
