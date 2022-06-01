import { useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import React from 'react'
import { GET_SUBREDDIT_WITH_LIMIT } from '../graphql/queries'
import SubRedditRow from './SubRedditRow'

const TopCommunities = () => {
  const { data: session } = useSession()
  const { data } = useQuery(GET_SUBREDDIT_WITH_LIMIT, {
    variables: {
      limit: 10,
    },
  })

  const subreditList: Subreddit[] = data?.getSubredditListWithLimit

  return (
    <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
      <p className="text-md mb-1 p-4 pb-3 font-bold"> Topc Communities</p>
      {/* list */}
      <div>
        {subreditList?.map((subreddit, i) => (
          <SubRedditRow topic={subreddit?.topic} index={i} />
        ))}
      </div>
    </div>
  )
}

export default TopCommunities
