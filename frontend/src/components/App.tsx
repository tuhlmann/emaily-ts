import * as React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { connect } from "react-redux"
import * as actions from "../actions"

import "./App.css"

const { Component } = React

// import logo from "./logo.svg"

import Header from "./Header"
import Landing from "./Landing"

const Dashboard = () => {
  return <h2>Dashboard</h2>
}

const SurveyNew = () => {
  return <h2>SurveyNew</h2>
}

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
    return (
      <div className="container">
        <BrowserRouter>
          <div>
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

export default connect<StateProps, DispatchProps, OwnProps>(null, actions)(App)
