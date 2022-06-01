import NextAuth from 'next-auth'
import RedditProvider from 'next-auth/providers/reddit'

export default NextAuth({
  providers: [
    RedditProvider({
      clientId: 'K0bMvC5xZkOa_kCfUmDag',
      clientSecret: '2-YFAtYU-7kXHIw1-1tO-N6XjVCoGA',
    }),
  ],
  secret: process.env.NEXTAUTH_MY_APP_SECRET,
})
