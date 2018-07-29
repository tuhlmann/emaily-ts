import * as React from "react"
import { default as StripeCheckout, Token } from "react-stripe-checkout"
import { connect } from "react-redux"
import * as actions from "../actions"

interface DispatchProps {
  handleToken: (token: Token) => void
}

type Props = DispatchProps

class Payments extends React.Component<Props, {}> {
  public render(): JSX.Element {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY || ""}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    )
  }
}

export default connect<{}, DispatchProps, {}>(
  null,
  actions,
)(Payments)

