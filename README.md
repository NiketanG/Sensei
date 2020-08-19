# Sensei

## Make your Smartphone a Remote Controller

#### PS: Not the best relevant name, I know. Please, suggest a better one.

## What is it ?

A pointer/laser like remote using nothing but a Smartphone and
built-in sensors like Accelerometer & Gyroscope.

### Demo :

![Demo](./public/Demo/demo.gif)

## How does this work ?

The Client utilizes the [Generic Sensor API](https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs) to access sensor data and then translates it into a position of
pointer on your laptop/desktop screen. The data is transmitted in
realtime using WebSockets through Socket-io and is drawn on the
canvas.

## Prerequisites

As of writing this, the Generic Sensor API is only supported in Google Chrome v71+ and only on Android Devices. So the Client must be running on supported browser and device.

### Development

The Server consists of an Express-backed Node Server, customized to optionally server https traffic. (Configure Env Variable & generate Self Signed Certificate.)

Note: The Generic Sensor Api ONLY works on https. So make sure to enable that in the Express server before running the server.
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
