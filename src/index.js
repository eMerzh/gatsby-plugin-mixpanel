import React, { PureComponent, createContext, cloneElement } from 'react'
import mixpanel from 'mixpanel-browser'

const MixpanelContext = createContext()

export const MixpanelProvider = ({ children, options }) => {
  if (options.isEnable) {
    mixpanel.init(options.apiToken, { debug: options.debug })
  } else {
    mixpanel.init('disable', { autotrack: false })
    mixpanel.disable()
  }
  return (
    <MixpanelContext.Provider value={mixpanel}>
      {children}
    </MixpanelContext.Provider>
  )
}

export const MixpanelConsumer = ({ children }) => {
  return (
    <MixpanelContext.Consumer>
      {mixpanel => cloneElement(children, { mixpanel })}
    </MixpanelContext.Consumer>
  )
}

export const addMixpanel = () => WrappedComponent => {
  return class extends PureComponent {
    render() {
      return (
        <MixpanelConsumer>
          <WrappedComponent {...this.props} />
        </MixpanelConsumer>
      )
    }
  }
}

export const withMixpanel = Component => props => (
  <MixpanelContext.Consumer>
    {mixpanel => <Component {...props} mixpanel={mixpanel} />}
  </MixpanelContext.Consumer>
)

export { mixpanel }
