import * as React from "react"
import { reduxForm, Field, InjectedFormProps, GenericField, FormErrors, GenericFieldHTMLAttributes } from "redux-form"
import { Link } from "react-router-dom"
import SurveyField from "./SurveyField"
import validateEmails from "../../utils/validateEmails"
import { default as formFields, SurveyFormData } from "./formFields"

interface CustomFieldProps {
  label: string
}

interface SurveyFormProps {
  onSurveySubmit: () => void
}

/**
 * Create a new field so we can pass custom attributes like label
 */
const CustomField = Field as new () => GenericField<CustomFieldProps & GenericFieldHTMLAttributes>

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
    return formFields.map(({ label, name }) => {
      return <CustomField key={name} component={SurveyField} type="text" label={label} name={name} />
    })
  }
}

const validate = (values: SurveyFormData, props: SurveyFormProps): FormErrors<SurveyFormData> => {
  const errors: FormErrors<SurveyFormData> = {}

  errors.recipients = validateEmails(values.recipients)

  formFields.forEach(({ name, label }) => {
    if (!values[name]) {
      errors[name] = `Please provide ${label}`
    }
  })

  return errors
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm)
