const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default (recipients: string) => {
  if (recipients) {
    const invalidEmails = recipients
      .split(",")
      .map(s => s.trim())
      .filter(email => email.length && !emailRegex.test(email))

    if (invalidEmails.length) {
      return `These emails are invalid: ${invalidEmails.join(", ")}`
    }
  }

  return undefined
}
