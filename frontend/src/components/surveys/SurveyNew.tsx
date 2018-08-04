import * as React from "react"
import SurveyForm from "./SurveyForm"
import SurveyReview from "./SurveyReview"

interface State {
  showFormReview: boolean
}

export default class SurveyNew extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)

    this.state = { showFormReview: false }
  }

  public render() {
    return <div>{this.renderContent()}</div>
  }

  private renderContent() {
    if (this.state.showFormReview) {
      return <SurveyReview />
    }

    return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />
  }
}
