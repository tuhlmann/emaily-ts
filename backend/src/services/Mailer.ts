import SendGrid from "sendgrid"
import { ISurvey, IRecipient } from "../models/Survey"
import keys from "../../config/keys"
const helper = SendGrid.mail

export class SendGridMail extends SendGrid.mail.Mail {}
export class SendGridEmail extends SendGrid.mail.Email {}
export class SendGridContent extends SendGrid.mail.Content {}

// NOTE: Should you need to pass a function, you need to include the param name in the signature, like so:
// constructor(survey: ISurvey, templateFn: (survey: ISurvey) => string)

export class Mailer extends helper.Mail {
  // tslint:disable-next-line variable-name
  private from_email: SendGridEmail
  private subject: string
  private body: SendGridContent
  private recipients: SendGridEmail[]
  private sgApi: any

  constructor(survey: ISurvey, content: string) {
    super()

    this.sgApi = SendGrid(keys.sendGridKey)
    this.from_email = new SendGridEmail("no-reply@emaily.com")
    this.subject = survey.subject
    this.body = new SendGridContent("text/html", content)
    this.recipients = this.formatAddresses(survey.recipients)
    console.log("Mail content", content)

    this.addContent(this.body)
    this.addClickTracking()
    this.addRecipients()
  }

  public async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON(),
    })

    const response = await this.sgApi.API(request)

    return response
  }

  private formatAddresses(recipients: IRecipient[]) {
    return recipients.map(r => new SendGridEmail(r.email))
  }

  private addClickTracking() {
    const trackingSettings = new helper.TrackingSettings()
    const clickTracking = new helper.ClickTracking(true, true)

    trackingSettings.setClickTracking(clickTracking)
    this.addTrackingSettings(trackingSettings)
  }

  private addRecipients() {
    const personalize = new helper.Personalization()
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient)
    })
    this.addPersonalization(personalize)
  }
}
