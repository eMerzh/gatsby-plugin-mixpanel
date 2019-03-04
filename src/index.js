import React, {
  PureComponent,
  createContext,
  cloneElement,
  useContext,
} from 'react'
import mixpanel from 'mixpanel-browser'

const MixpanelContext = createContext(mixpanel)

export const MixpanelProvider = ({ children }) => (
  <MixpanelContext.Provider value={mixpanel}>
    {children}
  </MixpanelContext.Provider>
)

export const MixpanelConsumer = ({ children }) => (
  <MixpanelContext.Consumer>
    {mixpanel => cloneElement(children, { mixpanel })}
  </MixpanelContext.Consumer>
)

export const withMixpanel = () => WrappedComponent => {
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

export function useMixpanel() {
  return useContext(MixpanelContext)
}

export { mixpanel }
