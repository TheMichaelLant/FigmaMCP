import { useState } from 'react'
import { useMsal } from '@azure/msal-react'
import { Link } from 'react-router-dom'
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons'

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { instance } = useMsal()
  const account = instance.getActiveAccount()

  const toggle = () => setIsOpen(!isOpen)

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin,
    })
  }

  return (
    <Navbar color="primary" dark expand="md" className="mb-4" style={{ width: '100%' }}>
      <NavbarBrand tag={Link} to="/">
        <FontAwesomeIcon icon={faBars} className="me-2" />
        My Application
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/claims">Claims</NavLink>
          </NavItem>
        </Nav>
        <Nav navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              <FontAwesomeIcon icon={faUser} className="me-1" />
              {account?.username || 'User'}
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem header>
                {account?.name || account?.username}
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default Header
