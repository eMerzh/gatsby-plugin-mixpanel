[![npm package](https://img.shields.io/npm/v/gatsby-plugin-mixpanel.svg?style=flat-square)](https://www.npmjs.org/package/gatsby-plugin-mixpanel)

# gatsby-plugin-mixpanel

For Gatsby v2

Integrate [mixpanel](https://www.mixpanel.com) on your [gatsby](https://github.com/gatsbyjs/gatsby) project

## Install

`npm install --save gatsby-plugin-mixpanel` or `yarn add gatsby-plugin-mixpanel`

## How to use

Add the plugin in your gatsby-config.js and set your mixpanel api token

```javascript
plugins: [
  {
    resolve: 'gatsby-plugin-mixpanel',
    options: {
      apiToken: 'YOUR_MIXPANEL_API_TOKEN', // required
    },
  },
];
```

You can access to mixpanel library in the props of your component by using the function ```addMixpanel``` available in the plugin

```javascript
import { withMixpanel } from 'gatsby-plugin-mixpanel'

class HelloWorld extends Component {
    componentDidMount() {
        const { mixpanel } = this.props
        mixpanel.track('Hello'); // send event 'Hello' to mixpanel
    }
    render() {/*...*/}
}

export default withMixpanel()(HelloWorld)

// or with decorators
@withMixpanel()
class HelloWorld extends Component {
    componentDidMount() {
        const { mixpanel } = this.props
        mixpanel.track('Hello'); // send event 'Hello' to mixpanel
    }
    render() {/*...*/}
}
```

This plugin performs ```mixpanel.init(YOUR_MIXPANEL_API_TOKEN)``` automatically

### Configuration

The plugin is configurable, here are the configs by default.

```javascript
plugins: [
  {
    resolve: 'gatsby-plugin-mixpanel',
    options: {
      apiToken: 'YOUR_MIXPANEL_API_TOKEN', // required
      // optional fields, default values
      debug: false, // if true activate debug mode on mixpanel library
      enableOnDevMode: true, // if false mixpanel will be activated on NODE_ENV=production only
      pageViews: null // see below
    },
  },
];
```

On the object pageViews you can declare url path and events that will be send on mixpanel.

example: 
```javascript
plugins: [
  {
    resolve: 'gatsby-plugin-mixpanel',
    options: {
      apiToken: 'YOUR_MIXPANEL_API_TOKEN',
      pageViews: {
        '/blog': 'Page blog view', // an event 'Page blog view' will be send to mixpanel on every visit on the /blog page
        '/404': 'Page 404 view',
      }
    },
  },
];
```


Enjoy this little plugin and feel free to contribute :smiley:
