import { useQuery } from '@apollo/client'
import { Jelly } from '@uiball/loaders'
import React from 'react'
import { GET_POST_LIST, GET_POST_LIST_BY_TOPIC } from '../graphql/queries'
import Post from './Post'

type Props = {
  topic?: string
}

const Feed = ({ topic }: Props) => {
  const { data, error } = topic
    ? useQuery(GET_POST_LIST_BY_TOPIC, {
        variables: { topic: topic },
      })
    : useQuery(GET_POST_LIST)
  const posts: Post[] = topic
    ? data?.getPostListByTopic
    : data?.getPostList ?? []
  if (!data) {
    return (
      <div className="flex w-full items-center justify-center pt-20 text-xl">
        <Jelly size={50} color="#FF4501" />
      </div>
    )
  }
  return (
    <div className="mx-1 mt-5 space-y-4 lg:mx-0">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Feed
