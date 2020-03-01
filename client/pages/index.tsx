import {Fragment, useEffect} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { useRouter } from 'next/router'
// @ts-ignore
import { base_url } from '/plugins/settings'
import styled from 'styled-components'
import {
  saveToken,
  getUser,
  logout
// @ts-ignore
} from 'store/actions/authActions'


const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  display: inline-block;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  text-decoration: none;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
  }
`
const saveAndGetUser = (props) => {
  if (props['router']['query']['token'] && !props.user) {
    const { token: accessToken, expiresIn } = props['router']['query']
    props.dispatch(saveToken({ accessToken, expiresIn }))
    props.dispatch(getUser())
  }
}

const Page = (props) => {
  const router = useRouter()

  saveAndGetUser(props)
  useEffect(() => {
    console.log(props)
  })

  const loggingOut = async () => {
    await router.push('/')
    props.dispatch(logout())
  }

  return (
    <Fragment>
      <main>Your user agent: {props.user && props.user.email} </main>
      <Button as="a" href={`${base_url}/login/google-oauth2/`} primary>login</Button>
      <Button onClick={loggingOut} primary>logout</Button>
    </Fragment>
  )
}


Page.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { userAgent }
}


const mapStateToProps = (state) => {
  const { accessToken, user } = state.authReducer
  return { accessToken, user }
}
const mapDispatchToProps = dispatch => {
  return { dispatch }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Page))
