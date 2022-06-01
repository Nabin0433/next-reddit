import { gql } from '@apollo/client'

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`

export const GET_SUBREDDIT_WITH_LIMIT = gql`
  query MyQuery($limit: Int!) {
    getSubredditListWithLimit(limit: $limit) {
      id
      topic
      created_at
    }
  }
`

export const GET_POST_LIST = gql`
  query MyQuery {
    getPostList {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      subreddit {
        id
        topic
        created_at
      }
      comment {
        id
        post_id
        username
        created_at
        text
      }
      vote {
        id
        created_at
        post_id
        upvote
        username
      }
    }
  }
`

export const GET_POST_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getPostListById(post_id: $post_id) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      subreddit {
        id
        topic
        created_at
      }
      comment {
        id
        post_id
        username
        created_at
        text
      }
      vote {
        id
        created_at
        post_id
        upvote
        username
      }
    }
  }
`

export const GET_POST_LIST_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getPostListByTopic(topic: $topic) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      subreddit {
        id
        topic
        created_at
      }
      comment {
        id
        post_id
        username
        created_at
        text
      }
      vote {
        id
        created_at
        post_id
        upvote
        username
      }
    }
  }
`

export const GET_VOTES_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getVoteByPostId(post_id: $post_id) {
      id
      created_at
      post_id
      upvote
      username
    }
  }
`
