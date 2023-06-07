import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import './Error404.scss'

export default function Error404() {
  return (
    <Layout>
      <div className="error">
        <div className="error__content">
          <p className="error__content__number">404</p>
          <p className="error__content__text">Oups! La page que vous demandez n'existe pas.</p>
        </div>
        <Link to="/" className="error__link">
          Retourner sur le tableau de bord / page de connexion
        </Link>
      </div>
    </Layout>
  )
}
