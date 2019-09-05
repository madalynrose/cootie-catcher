import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import theme from '../style/theme';

import Header from './header';
import './layout.css';

const Container = styled.main`
  width: 100vw;
  overflow-x: hidden;
`;

const Content = styled.section`
  transition: transform 0.3s ease-in-out;
  transform: perspective(200px);
  padding-top: ${p => p.theme.size(5)};
  padding-left: ${p => p.theme.size(1)};
  padding-right: ${p => p.theme.size(1)};
`;

const Overlay = styled.div`
  position: fixed;
  z-index: ${p => p.theme.zIndex.overlay};
  top: 0;
  left: 0;
  background: black;
  width: 100vw;
  height: 100vh;
  transition: opacity 0.3s ease-in-out;
  opacity: ${p => (p.isDrawerOpen ? 0.5 : 0)};
  pointer-events: ${p => (p.isDrawerOpen ? 'all' : 'none')};
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <ThemeProvider theme={theme}>
        <Container>
          <Content>
            {children}
            <footer>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </footer>
          </Content>
        </Container>
        <Header siteTitle={data.site.siteMetadata.title} />
      </ThemeProvider>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
