import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import React components
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Chat from './components/Chat';
import Logo from './assets/mmlogo.png';
import FourOhFour from './components/404';

import Auth from './utils/auth';

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
            <div className="logo"><a href="/"><img alt="MM Logo" src={Logo} /></a></div> {/* This `a href=` (rather than `Link to=`) ensures that the window.location fires and Home is selected in the menu. May be a better React way to handle this, performance-wise, but it seems to reduce code needed for this small use case? */}
            <Navbar/>
          </Sider>
            <Content style={{
                padding: '0 50px',
              }}>
              <Routes> {/* This Routes Auth.loggedIn() logic handles not serving particular component routes to non-logged-in users. This might not be a best practice? But it works. */}
                <Route index element={<Home/>} />
                { Auth.loggedIn() ? (
                <Route path='/chat' element={<Chat/>} /> 
                ) : (
                <>
                <Route path='/signup' element={<Signup/>} />
                <Route path='/login' element={<Login/>} />
                </>
                )}
                <Route path='*' element={<FourOhFour />} />
              </Routes>
            </Content>
        </Router>
      </Layout>
    </ApolloProvider>
  );
}

export default App;
