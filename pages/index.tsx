import CommentForm from 'components/CommentForm'
import CommentsBlock from 'components/CommentsBlock'
import Layout from 'components/Layout'

const Home = () => {
  return (
    <Layout>
      <CommentForm />
      <CommentsBlock/>
    </Layout>
  )
}

export default Home
