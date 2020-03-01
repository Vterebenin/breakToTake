import { useState, useEffect } from 'react'
import { useCookieToken } from 'hooks'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { useRouter } from 'next/router'
import {
  saveToken,
  getUser,
  logout
} from 'store/actions/authActions'
import { Layout, Breadcrumb } from 'antd';
import Sidebar from 'components/ui/sidebar'

const { Header, Content, Footer } = Layout;

const saveAndGetUser = (props) => {
  if (props['router']['query']['token'] && !props.user) {
    const { token: accessToken, expiresIn } = props.router.query
    props.dispatch(saveToken({ accessToken, expiresIn }))
    props.dispatch(getUser())
  }
}

const Page = (props) => {
  const router = useRouter()
  useCookieToken(props)
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    saveAndGetUser(props)
  }, [props.accessToken, props.user])

  const loggingOut = async () => {
    await router.push('/')
    props.dispatch(logout())
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ color: 'white' }} >Break to take</Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
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
