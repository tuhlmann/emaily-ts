import * as React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import Payments from "./Payments"
import { IApplicationState } from "../types"

interface StateProps {
  auth: any
}

type Props = StateProps

class Header extends React.Component<Props, {}> {
  public render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >Emaily
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }

  private renderContent() {

    switch (this.props.auth) {
      case null:
        return

      case false:
        return <li><a href="/auth/google">Login with Google</a></li>

      default:
        return [
          <li key={"payments"}><Payments /></li>,
          <li key={"credits"} style={{ margin: "0 10px" }}>Credits: {this.props.auth.credits}</li>,
          <li key={"logout"}><a href="api/logout">Logout</a></li>,
        ]
    }
  }

}

function mapStateToProps({ auth }: IApplicationState): StateProps {
  return { auth }
}

export default connect<StateProps, {}, {}, IApplicationState>(mapStateToProps)(Header)
