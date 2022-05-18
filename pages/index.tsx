import CommentForm from 'components/CommentForm'
import CommentsBlock from 'components/CommentsBlock'
import Layout from 'components/Layout'

const Home = () => {
  return (
    <Layout>
      <p>Its home page</p>
      <CommentsBlock/>
      <CommentForm />
    </Layout>
  )
}

export default Home
