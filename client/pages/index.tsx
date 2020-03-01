import { NextPage } from 'next'
import {Fragment, useEffect} from 'react'
// @ts-ignore
import axios from 'axios'
import Cookie from 'js-cookie'
import { withRouter } from 'next/router'
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

const Page: NextPage<Props> = (props) => {
  useEffect(() => {
    (async () => {
      if (props) {
        console.log(props['router']['query']['token'])
      }
    })()
  })

  return (
    <Fragment>
      <main>Your user agent: {props.userAgent} </main>
      <Button as="a" href={`${base_url}/login/google-oauth2/`} primary>login</Button>
      <Button as="a" href={`${base_url}/logout`} primary>logout</Button>
    </Fragment>
  )
}


Page.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { userAgent }
}

export default withRouter(Page)
