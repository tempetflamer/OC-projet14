import React from 'react'
import PropTypes from 'prop-types'
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

Home.propTypes = {}
