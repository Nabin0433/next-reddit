import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@apollo/client'
import { GET_VOTES_BY_POST_ID } from '../graphql/queries'
import { ADD_VOTE } from '../graphql/mutations'

type Props = {
  post: Post
}

const Post = ({ post }: Props) => {
  const [vote, setVote] = useState<boolean>()
  const { data: session } = useSession()

  // get votes
  const { data, loading } = useQuery(GET_VOTES_BY_POST_ID, {
    variables: { post_id: post?.id },
  })

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_VOTES_BY_POST_ID, 'getVoteByPostId'],
  })

  const upVote = async (isUpVote: boolean) => {
    const notification = toast.loading('Voting ...')
    if (!session) {
      toast.error("You'll need to  sign in to Vote !", { id: notification })
      return
    }
    if (vote && isUpVote) {
      toast.success('You already voted !', { id: notification })
      return
    }
    if (vote === false && !isUpVote) {
      toast.success('You already voted !', { id: notification })
      return
    }

    await addVote({
      variables: {
        post_id: post?.id,
        username: session?.user?.name,
        upvote: isUpVote,
      },
    })
    toast.success('Successlully voted !', { id: notification })
  }

  useEffect(() => {
    const votes: Vote[] = data?.getVoteByPostId
    const vote = votes?.find(
      (vote) => vote.username == session?.user?.name
    )?.upvote
    setVote(vote)
  }, [data])

  const displayVote = (data: any) => {
    const votes: Vote[] = data?.getVoteByPostId
    const voteNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    )
    if (votes?.length === 0) return 0
    if (voteNumber === 0) {
      return votes[0]?.upvote ? 1 : -1
    }
    return voteNumber
  }

  return (
    <Link href={`/post/${post.id}`}>
      <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-md hover:shadow-xl">
        {/* votes */}
        <div className="relative flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 px-1 py-4 text-gray-400 lg:p-4">
          <ArrowUpIcon
            className={`voteButton hover:text-green-400 ${
              vote && 'text-red-400'
            }`}
            onClick={() => upVote(true)}
          />
          <p className="text-xs font-bold text-black">{displayVote(data)}</p>
          <ArrowDownIcon
            className={`voteButton hover:text-red-400 ${
              vote === false && 'text-blue-400'
            }`}
            onClick={() => upVote(false)}
          />
        </div>
        {/* body */}
        <div className="p-3 pb-1">
          {/* header */}
          <div className="flex items-center space-x-2">
            <Avatar seed={post.subreddit[0]?.topic} />
            <p className="text-xs text-gray-400">
              <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                <span className="font-bold text-black hover:text-blue-400 hover:underline">
                  r/{post.subreddit[0]?.topic}
                </span>
              </Link>
              <span> • Posted by u/{post.username} ⏳ </span>
              <TimeAgo date={post.created_at} />
            </p>
          </div>
          {/* body */}
          <div className="py-4">
            <h2 className="text-sm font-semibold lg:text-xl">{post.title}</h2>
            <p className="mt-2 text-xs font-light lg:text-sm">{post.body}</p>
          </div>
          {/* image */}
          <img className="w-[100%]" src={post.image} alt={post.title} />
          {/* fotter */}
          <div className="my-2 flex space-x-2 text-gray-400 lg:space-x-4">
            <div className="postIconBtn">
              <ChatAltIcon className="h-4 w-4 lg:h-6 lg:w-6" />
              <p className="text-xs lg:text-sm">
                {post.comment?.length ?? 0} Comments
              </p>
            </div>
            <div className="postIconBtn">
              <GiftIcon className="h-4 w-4 lg:h-6 lg:w-6" />
              <p className="hidden sm:inline">Award</p>
            </div>
            <div className="postIconBtn">
              <ShareIcon className="h-4 w-4 lg:h-6 lg:w-6" />
              <p className="hidden sm:inline">Share</p>
            </div>
            <div className="postIconBtn">
              <BookmarkIcon className="h-4 w-4 lg:h-6 lg:w-6" />
              <p className="hidden sm:inline">Save</p>
            </div>
            <div className="postIconBtn">
              <DotsHorizontalIcon className="h-4 w-4 lg:h-6 lg:w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Post
