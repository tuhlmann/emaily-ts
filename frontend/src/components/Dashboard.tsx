import * as React from "react"
import { Link } from "react-router-dom"
import SurveyList from "./surveys/SurveyList"

// interface StateProps {
//   auth: any
// }

// type Props = StateProps

export default () => {
  return (
    <div>
      <SurveyList />
      <div className="fixed-action-btn">
        <Link className="btn-floating btn-large red" to="/surveys/new">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </div>
  )
}
