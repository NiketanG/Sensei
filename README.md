# Sensei

## Make your Smartphone a Remote Controller

##### PS: Not the best & relevant name, I know. Please, suggest a better one.

## What is it ?

A pointer/laser like remote using nothing but a Smartphone and
built-in sensors like Accelerometer & Gyroscope.

### Demo :

https://sensei-remote.herokuapp.com/ - Note : Due to Server Location, this might have some latency issues.
![Demo](./public/Demo/demo.gif)

As you can see, I can point my Phone towards the screen and the Red Dot moves there as if the phone was a laser pointer. This is done with nothing but Sensors like Accelerometer, Gyroscope on the Device.

## How does this work ?

The Client utilizes the [Generic Sensor API](https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs) to access sensor data and then translates it into a position of
pointer on your laptop/desktop screen. The data is transmitted in
realtime using WebSockets through Socket-io and is drawn on the
canvas.

## Prerequisites

As of writing this, the Generic Sensor API is only supported in Google Chrome v71+ and only on Android Devices. So the Client must be running on supported browser and device.

### Development

The Server consists of an Express-backed Node Server, customized to optionally serve using https that is required for the Generic Sensor API. (Configure Env Variable & generate Self Signed Certificate.)

Make sure to have a .env file configured with PORT (number) and HTTPS (Boolean).

Install Dependencies :

```
yarn
# OR
npm install
```

Development Server - with Hot Reload:

```
yarn dev
# OR
npm run dev
```

Production Server:

```
yarn start
# OR
npm run start
```

### License

MIT
