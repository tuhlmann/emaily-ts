import * as React from "react"
import { WrappedFieldProps } from "redux-form"

export interface SurveyFieldProps extends WrappedFieldProps {
  label: string
}

export default ({ input, label, meta: { error, touched } }: SurveyFieldProps) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  )
}

// export default class SurveyField extends React.Component<SurveyFieldProps, {}> {

//   public render() {
//     return (
//       <input />
//     )
//   }
// }
