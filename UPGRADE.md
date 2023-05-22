<p align="center"> <img width="233" src="https://situm.com/wp-content/themes/situm/img/logo-situm.svg" style="margin-bottom:1rem" /> <h1 align="center">Upgrading @situm/react-native-wayfinding</h1> </p>

## Introduction <a name="introduction"></a>

In this file we share a way to upgrade previous versions of situm wayfinding plugin to newer versions.

---

## 0.2.X to 1.0.0 <a name="0.2.X-to-1.0.0"></a>

- Update this plugin to 1.0.0 version on your package.json and install via npm or yarn.
- This new version has its own peer depedencias make sure to install it manually.
- Go to your usage of our component `<Mapview/>` and wrap it with `<SitumProvider> ... </SitumProvider> ` also pass it its needed props.

### Code example

```js
// your imports

const SITUM_EMAIL = 'YOUR_EMAIL_HERE';
const SITUM_API_KEY = 'YOUR_APIKEY_HERE';
const SITUM_BUILDING_ID = 'YOUR_BUILDING_ID_HERE';

const App: React.FC = () => {
  return (
    <View>
      <SitumProvider email={SITUM_EMAIL} apiKey={SITUM_API_KEY}>
        <MapView
          user={SITUM_EMAIL}
          apikey={SITUM_API_KEY}
          buildingId={SITUM_BUILDING_ID}
          // other props
        />
      </SitumProvider>
    </View>
  );
};
```
