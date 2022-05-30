import CommentForm from 'components/CommentForm'
import CommentsBlock from 'components/CommentsBlock'
import Layout from 'components/Layout'
import { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Layout>
      <CommentForm />
      <CommentsBlock />
    </Layout>
  )
}

export default Home
