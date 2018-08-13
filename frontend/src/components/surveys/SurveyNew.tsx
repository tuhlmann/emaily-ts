import * as React from "react"
import SurveyForm from "./SurveyForm"
import SurveyReview from "./SurveyReview"
import { reduxForm, InjectedFormProps } from "redux-form"

interface State {
  showFormReview: boolean
}

class SurveyNew extends React.Component<InjectedFormProps<{}, {}>, State> {
  constructor(props: any) {
    super(props)

    this.state = { showFormReview: false }
  }

  public render() {
    return <div>{this.renderContent()}</div>
  }

  private renderContent() {
    if (this.state.showFormReview) {
      return <SurveyReview onCancel={() => this.setState({ showFormReview: false })} />
    }

    return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />
  }
}

export default reduxForm({
  form: "surveyForm",
})(SurveyNew)
