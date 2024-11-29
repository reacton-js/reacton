import Rtn, { Render } from 'reacton-js'
import Header from './components/Header.htm'
import Menu from './components/Menu.htm'
import Content from './components/Content.htm'
import Home from './components/Home.htm'
import About from './components/About.htm'
import Contacts from './components/Contacts.htm'

// add the Render method as a property of the window object
window._$RtnRender_ = Render

Rtn(Header, Menu, Content, Home, About, Contacts)