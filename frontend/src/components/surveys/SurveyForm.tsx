import * as React from "react"
import { reduxForm, Field, InjectedFormProps, GenericField, FormErrors } from "redux-form"
import { Link } from "react-router-dom"
import SurveyField from "./SurveyField"
import validateEmails from "../../utils/validateEmails"

export interface SurveyFormData {
  title: string
  subject: string
  body: string
  emails: string
}

interface CustomFieldProps {
  label: string
  type: string
}

interface SurveyFormProps {
  onSurveySubmit: () => void
}

const CustomField = Field as new () => GenericField<CustomFieldProps>

const FIELDS: Array<{ label: string; name: string }> = [
  {
    label: "Survey Title",
    name: "title",
  },
  {
    label: "Subject Line",
    name: "subject",
  },
  {
    label: "Email Body",
    name: "body",
  },
  {
    label: "Recipient List",
    name: "emails",
  },
]

class SurveyForm extends React.Component<InjectedFormProps<SurveyFormData, SurveyFormProps> & SurveyFormProps> {
  public render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel <i className="material-icons right">close</i>
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    )
  }

  private renderFields() {
    return FIELDS.map(({ label, name }) => {
      return <CustomField key={name} component={SurveyField} type="text" label={label} name={name} />
    })
  }
}

const validate = (values: SurveyFormData, props: SurveyFormProps): FormErrors<SurveyFormData> => {
  const errors: FormErrors<SurveyFormData> = {}

  errors.emails = validateEmails(values.emails)

  FIELDS.forEach(({ name, label }) => {
    if (!values[name]) {
      errors[name] = `Please provide ${label}`
    }
  })

  return errors
}

export default reduxForm({
  validate,
  form: "survey-form",
})(SurveyForm)
