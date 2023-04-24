import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import React components
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Logo from './assets/mmlogo.png';

// import antd components & css AFTER antd
import { Layout } from 'antd';
import './app.css'; 
// import apollo components
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const { Sider, Content } = Layout;

const authLink = setContext((_, { headers }) => { 
  const token = localStorage.getItem('id_token');
  return { 
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql'
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Router>
          <Sider theme="light" breakpoint="lg" collapsedWidth="0">
            <div className="logo"><a href="/"><img alt="MM Logo" src={Logo} /></a></div>
            <Navbar/>
          </Sider>
            <Content style={{
                padding: '0 50px',
              }}>
              <Routes>
                <Route index element={<Home/>} />
                <Route path='/signup' element={<Signup/>} />
                <Route path='/login' element={<Login/>} />
              </Routes>
            </Content>
        </Router>
      </Layout>
    </ApolloProvider>
  );
}

export default App;
