import * as React from "react"
import { connect } from "react-redux"
import { IApplicationState } from "../../types"
import { FIELDS as formFields, SurveyFormData } from "./formFields"
import { withRouter, RouteComponentProps } from "react-router-dom"
import * as H from "history"
import * as actions from "../../actions"
import { Dispatch, AnyAction, bindActionCreators } from "redux"

// The props used when calling this component
interface OwnProps {
  onCancel: () => void
}

interface StateProps {
  formValues: SurveyFormData
}

interface DispatchProps {
  submitSurvey: (values: SurveyFormData, history: H.History) => void
}

type Props = StateProps & DispatchProps & OwnProps

const SurveyReview: React.SFC<RouteComponentProps<any> & Props> = ({ formValues, onCancel, submitSurvey, history }) => {
  const reviewFields = formFields.map(({ label, name }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <p>{formValues[name]}</p>
      </div>
    )
  })

  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div style={{ margin: "10px 0" }}>{reviewFields}</div>
      <button className="yellow darken-3 white-text btn-flat" onClick={() => onCancel()}>
        Go Back
      </button>
      <button className="green btn-flat white-text right" onClick={() => submitSurvey(formValues, history)}>
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  )
}

function mapStateToProps(state: IApplicationState): StateProps {
  return { formValues: state.form.surveyForm.values as SurveyFormData }
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>, ownProps: OwnProps): DispatchProps {
  return bindActionCreators({ submitSurvey: actions.submitSurvey }, dispatch)
  // return {
  //   submitSurvey: actions.submitSurvey,
  // }
}

const routedComponent = withRouter(SurveyReview)

export default connect<StateProps, DispatchProps, OwnProps, IApplicationState>(
  mapStateToProps,
  mapDispatchToProps, // or actions,
)(routedComponent)
