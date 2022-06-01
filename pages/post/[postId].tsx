import { useMutation, useQuery } from '@apollo/client'
import { Jelly } from '@uiball/loaders'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { type } from 'os'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Timeago from 'react-timeago'
import Avatar from '../../components/Avatar'
import Post from '../../components/Post'
import { ADD_COMMENT } from '../../graphql/mutations'
import { GET_POST_BY_POST_ID } from '../../graphql/queries'

type FormData = {
  comment: string
}

const PostPage = () => {
  const {
    query: { postId },
  } = useRouter()
  const { data: session } = useSession()
  // get
  const { data, error } = useQuery(GET_POST_BY_POST_ID, {
    variables: { post_id: postId },
  })
  // add
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, 'getPostListByPostId'],
  })

  const post: Post = data?.getPostListById

  // form hanndle
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>()
  // post a comment
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const notification = toast.loading('Posting your comment ...')
    await addComment({
      variables: {
        post_id: postId,
        username: session?.user?.name,
        text: data.comment,
      },
    })
    setValue('comment', '')
    toast.success('Comment successfully posted !', { id: notification })
  }

  if (!data) {
    return (
      <div className="flex w-full items-center justify-center pt-20 text-xl">
        <Jelly size={50} color="#FF4501" />
      </div>
    )
  }

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />
      <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 lg:pl-16">
        <p className="mb-1 text-sm">
          Comment as <span className="text-red-500">{session?.user?.name}</span>
        </p>

        {/*  */}
        <form
          className="flex flex-col space-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            {...register('comment', { required: true })}
            disabled={!session}
            className="h-24 rounded-md border border-gray-200 bg-gray-50 p-2 pl-4 outline-none disabled:bg-gray-50"
            placeholder={
              session ? 'What are your thoughts' : 'Please sign in to comment'
            }
          />
          <button
            className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200"
            type="submit"
          >
            Comment
          </button>
        </form>
      </div>
      <div className="-my-5 rounded-b-md border-t-0 border-gray-300 bg-white py-5 px-10">
        <hr className="py-2" />
        {post?.comment?.map((i) => (
          <div
            key={i.id}
            className="relative flex items-center space-x-2 space-y-5"
          >
            <div className="z-50">
              <hr className="absolute top-10 left-5 z-0 h-16 border" />

              <Avatar seed={i.username} />
            </div>

            <div className="flex flex-col">
              <p className="py-2 text-xs text-gray-400">
                <span className="font-semibold text-gray-600">
                  {i.username}
                </span>{' '}
                ・ <Timeago date={i.created_at} />
              </p>
              <p className="">{i.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostPage
