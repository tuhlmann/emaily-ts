import * as React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { connect } from "react-redux"
import Logger from "../utils/Logger"

import * as actions from "../actions"

import "./App.css"

const { Component } = React

// import logo from "./logo.svg"

import Header from "./Header"
import Landing from "./Landing"
import Dashboard from "./Dashboard"
import SurveyNew from "./surveys/SurveyNew"

// The props used when calling this component
export interface OwnProps {}

interface StateProps {}

interface DispatchProps {
  fetchUser: () => void
}

type Props = StateProps & DispatchProps & OwnProps

interface State {}

class App extends Component<Props, State> {
  public componentDidMount() {
    this.props.fetchUser()
  }

  public render() {
    Logger.info("rendering: ", this.props)

    return (
      <div className="container">
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  null,
  actions,
)(App)
