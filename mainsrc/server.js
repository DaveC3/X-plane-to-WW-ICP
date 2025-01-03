const http = require('http');
const WebSocket = require('ws');
const JsonRPC = require('simple-jsonrpc-js');
const XPlaneLegacyClient = require('../mainsrc/XPlaneLegacyClient.js');

function noop() {}

function heartbeat() {
  this.isAlive = true;
  // console.log('heartbeat');
}

const xPlane = new XPlaneLegacyClient({ debug: true });

const server = http.createServer();

const wss1 = new WebSocket.Server({ noServer: true });
// const wss2 = new WebSocket.Server({ noServer: true });

wss1.on('connection', (ws) => {
  const client = ws;

  // @ts-ignore
  client.isAlive = true;

  client.on('pong', heartbeat);

  // @ts-ignore
  client.jrpc = new JsonRPC();

  // @ts-ignore
  client.jrpc.toStream = function toStream(message) {
    client.send(message);
  };

  client.on('message', function onMessage(message) {
    // console.log(`Raw message: ${message}`);
    // @ts-ignore
    client.jrpc.messageHandler(message);
  });


  client.jrpc.on('sendCommand', ['commandRef'], function onSendCommand(
    commandRef,
  ) {
    console.log(`Got sendCommand ${commandRef}`);
    xPlane.sendCommand(commandRef);
  });

  // @ts-ignore
  client.jrpc.on('setDataRef', ['dataRef', 'value'], function onSetDataRef(
    dataRef,
    value,
  ) {
    console.log(`Got setDataRef ${dataRef} ${value}`);
    xPlane.setDataRef(dataRef, value);
  });

  // @ts-ignore
  client.jrpc.on(
    'requestDataRef',
    ['dataRef', 'timesPerSecond'],
    function onRequestDataRef(dataRef, timesPerSecond) {
      console.log(`Got requestDataRef ${dataRef} ${timesPerSecond}`);
      xPlane.requestDataRef(
        dataRef,
        timesPerSecond,
        (updatedDataRef, updatedValue) => {
          console.log(
            `the dataref ${updatedDataRef} has value ${updatedValue}`,
          );
          // @ts-ignore
          client.jrpc.call('dataRefUpdate', [updatedDataRef, updatedValue]);
        },
      );
    },
  );
});

server.on('upgrade', function upgrade(request, socket, head) {

  wss1.handleUpgrade(request, socket, head, function done(ws) {
    wss1.emit('connection', ws, request);
  });

});

const interval = setInterval(function ping() {
  wss1.clients.forEach(function each(ws) {
    // @ts-ignore
    if (ws.isAlive === false) {
      return ws.terminate();
    }


    ws.isAlive = false;
    return ws.ping(noop);
  });
}, 10000);

wss1.on('close', function close() {
  clearInterval(interval);
});

server.listen(8080);

 xPlane.requestDataRef('sim/cockpit/radios/com1_freq_hz', 1);
 xPlane.requestDataRef('sim/cockpit/radios/nav1_freq_hz', 1);
