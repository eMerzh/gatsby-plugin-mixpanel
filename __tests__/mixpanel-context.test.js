import React, { PureComponent } from 'react'
import { MixpanelConsumer, MixpanelProvider, withMixpanel } from '../src'
import { mount } from 'enzyme'

const DumbComponent = () => {
  return <h1>Dumb</h1>
}

@withMixpanel()
class DumbComponentWithDecoratorMixpanel extends PureComponent {
  render() {
    return <h1>Dumb</h1>
  }
}

const wrapMixpanelProvider = component => {
  return <MixpanelProvider>{component}</MixpanelProvider>
}

describe('Get mixpanel library', () => {
  it('on a consumer component', () => {
    const wrapper = mount(
      wrapMixpanelProvider(
        <MixpanelConsumer>
          <DumbComponent />
        </MixpanelConsumer>
      )
    )

    expect(wrapper.find('DumbComponent').props('mixpanel')).toBeDefined()
    expect(wrapper).toMatchSnapshot()
  })

  it('withMixpanel wrapped function', () => {
    const ComponentWithMixpanel = withMixpanel()(DumbComponent)
    const wrapper = mount(wrapMixpanelProvider(<ComponentWithMixpanel />))

    expect(wrapper.find('DumbComponent').props('mixpanel')).toBeDefined()
    expect(wrapper).toMatchSnapshot()
  })

  it('withMixpanel decorator function', () => {
    const wrapper = mount(
      wrapMixpanelProvider(<DumbComponentWithDecoratorMixpanel />)
    )

    expect(
      wrapper.find('DumbComponentWithDecoratorMixpanel').props('mixpanel')
    ).toBeDefined()
    expect(wrapper).toMatchSnapshot()
  })

})
