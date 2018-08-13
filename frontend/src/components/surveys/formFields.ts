export interface SurveyFormData {
  title: string
  subject: string
  body: string
  recipients: string
}

export const FIELDS: Array<{ label: string; name: string }> = [
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
    name: "recipients",
  },
]

export default FIELDS
