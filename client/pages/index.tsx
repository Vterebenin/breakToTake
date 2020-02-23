import { NextPage } from 'next'
import { Fragment } from 'react'
// @ts-ignore
import axios from '/plugins/axios'
// @ts-ignore
import { base_url } from '/plugins/settings'
import styled from 'styled-components'

interface Props {
  userAgent?: string
}
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
`

const login = async (props) => {
    const { data } = await axios.get('/login/google-oauth2/')
    console.log(data)
}

const Page: NextPage<Props> = ({ userAgent }) => {
  return (
    <Fragment>
      <main>Your user agent: {`plugins/axios`} </main>
      <Button as="a" href={`${base_url}/login/google-oauth2/`} primary>login</Button>
      <Button as="a" href={`${base_url}/logout`} primary>logout</Button>
    </Fragment>
  )
}


Page.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { userAgent }
}

export default Page
