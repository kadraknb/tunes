import React from 'react'
import PropTypes from 'prop-types'
import './pages.css'

import Carregando from '../components/caregando'
import { createUser } from '../services/userAPI'

const N3 = 3
class Login extends React.Component {
  constructor () {
    super()

    this.state = {
      id: '',
      buttonOff: true,
      loading: false,
      logado: false
    }
  }

  salvarId = (e) => {
    const { value } = e.target
    if (value.length >= N3) {
      this.setState({
        id: value,
        buttonOff: false
      })
    }
  }

  submitF = (e) => {
    e.preventDefault()
    const { router } = this.props
    const { id } = this.state
    this.setState({ loading: true }, async () => {
      await createUser({ name: id })
      router('Search')
    })
  }

  render () {
    const { buttonOff, loading } = this.state
    return (
      <div id='T-login'>
        { loading && <Carregando /> }
        <form id='T-F_login' className='T_box'>
          <input
            className='T_placeh T_boderStyle_input'
            placeholder='digite seu nome aqui'
            type="text"
            onChange={ this.salvarId }
          />
          <button
            id='T_F_login_button'
            className='T_boderStyle'
            type="submit"
            disabled={ buttonOff }
            onClick={ this.submitF }
          >
            Entrar
          </button>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  router: PropTypes.func.isRequired
}

export default Login
