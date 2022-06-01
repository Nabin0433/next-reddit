import { LinkIcon, PhotographIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import Avatar from './Avatar'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations'
import client from '../apollo-client'
import { GET_POST_LIST, GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries'
import toast from 'react-hot-toast'
import { type } from 'os'

type FormData = {
  postTitle: string
  postBody: string
  postImage: string
  subreddit: string
}

type Props = {
  subRedditTopic?: string
}

const PostBox = ({ subRedditTopic }: Props) => {
  const { data: session } = useSession()
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_POST_LIST, 'getPostList'],
  })
  const [addSubreddit] = useMutation(ADD_SUBREDDIT)
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async (formData) => {
    const notificaiton = toast.loading('Creating a new post...')
    try {
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: formData.subreddit,
        },
      })
      const subRedditExist = getSubredditListByTopic?.length > 0
      if (!subRedditExist) {
        // create
        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: subRedditTopic ?? formData.subreddit,
          },
        })
        const {
          data: { insertPosts: newPost },
        } = await addPost({
          variables: {
            title: formData.postTitle,
            body: formData.postBody ?? '',
            image: formData.postImage ?? '',
            subreddit_id: newSubreddit.id,
            username: session?.user?.name,
          },
        })
      } else {
        // use
        const {
          data: { insertPosts: newPost },
        } = await addPost({
          variables: {
            title: formData.postTitle,
            body: formData.postBody ?? '',
            image: formData.postImage ?? '',
            subreddit_id: getSubredditListByTopic[0].id,
            username: session?.user?.name,
          },
        })
      }
      setValue('postTitle', '')
      setValue('postBody', '')
      setValue('postImage', '')
      setValue('subreddit', '')
      toast.success('Post created successfully !', { id: notificaiton })
    } catch (error) {
      console.log({ error })
      toast.error('Something went wrong !', { id: notificaiton })
    }
  })

  return (
    <form
      className="sticky top-[3.75rem] z-50 rounded-md border border-gray-300 bg-white p-2 lg:top-16"
      onSubmit={onSubmit}
    >
      <div className="flex items-center space-x-3">
        {/* avatar */}
        <Avatar seed="nabin" />
        {/* input */}
        <input
          {...register('postTitle', { required: true })}
          disabled={!session}
          className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
          type="text"
          placeholder={
            session
              ? subRedditTopic
                ? `Create a post in r ${subRedditTopic}`
                : 'Crate a post by entering a title'
              : 'Sign in to post'
          }
        />

        <PhotographIcon
          className={`h-6 w-6 cursor-pointer text-gray-300 ${
            imageBoxOpen && 'text-blue-300 '
          }`}
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
        />
        <LinkIcon className={`h-6 w-6 cursor-pointer text-gray-300`} />
      </div>
      {!!watch('postTitle') && (
        <div className="flex flex-col py-2">
          {/* body box */}
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body :</p>
            <input
              {...register('postBody')}
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              type="text"
              placeholder="Text (Optional)"
            />
          </div>
          {/* body box */}
          {!subRedditTopic && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Subreddit :</p>
              <input
                {...register('subreddit', { required: true })}
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                type="text"
                placeholder="i.e Next.Js"
              />
            </div>
          )}
          {/* image box */}
          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL :</p>
              <input
                {...register('postImage')}
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                type="text"
                placeholder="Optional"
              />
            </div>
          )}

          {/* error handle */}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === 'required' && (
                <p>Title is required</p>
              )}
              {errors.subreddit?.type === 'required' && (
                <p>Subreddit is required</p>
              )}
            </div>
          )}

          {/* post btn */}
          {!!watch('postTitle') && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 p-2 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  )
}

export default PostBox
