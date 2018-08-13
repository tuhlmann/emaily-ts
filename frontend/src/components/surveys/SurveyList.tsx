import * as React from "react"
import { connect } from "react-redux"
import { fetchSurveys } from "../../actions"
import { IApplicationState } from "../../types"
import { ISurvey } from "../../../../shared/src/models/Survey"

// The props used when calling this component

interface StateProps {
  surveys: ISurvey[]
}

interface DispatchProps {
  fetchSurveys: () => void
}

type Props = StateProps & DispatchProps

class SurveyList extends React.Component<Props, {}> {
  public componentDidMount() {
    this.props.fetchSurveys()
  }

  public render() {
    return (
      <div>
        <h3>Your Surveys:</h3>
        {this.renderSurveys()}
      </div>
    )
  }

  private renderSurveys() {
    return this.props.surveys.map(survey => (
      <div key={survey._id} className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">{survey.title}</span>
          <p>{survey.body}</p>
          <p className="right">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
        </div>
        <div className="card-action">
          <a>Yes: {survey.yes}</a>
          <a>No: {survey.no}</a>
          {survey.lastResponded ? (
            <span className="right">Last responded: {new Date(survey.dateSent).toLocaleDateString()}</span>
          ) : (
            <span />
          )}
        </div>
      </div>
    ))
  }
}

function mapStateToProps({ surveys }: IApplicationState) {
  return { surveys }
}

export default connect<StateProps, DispatchProps, {}, IApplicationState>(
  mapStateToProps,
  { fetchSurveys },
)(SurveyList)
