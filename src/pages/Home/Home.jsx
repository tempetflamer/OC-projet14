import React from 'react'
import CreateEmployee from '../../components/FormCreateEmployee/FormCreateEmployee'
import Layout from '../../components/Layout/Layout'

export default function Home() {
  return (
    <Layout>
      <h2>Create Employee</h2>
      <CreateEmployee />
    </Layout>
  )
}
