import React from 'react'
import { Layout } from 'antd';
const { Footer } = Layout;


const MainFooter = (props) => {
  return <Footer style={{ textAlign: 'center' }}>{props.children}</Footer>
}




export default MainFooter
