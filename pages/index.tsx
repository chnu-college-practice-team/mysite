import Dashboard from 'components/Dashboard'
import Layout from 'components/Layout'
import { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  )
}

export default Home
