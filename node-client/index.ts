/**
 * The node program that captures local performance data and sends it to the socket.io server.
 *
 * Information about needed about the system (from node.js os module):
 * - CPU usage (current and total)
 * - Memory usage (free and total)
 * - OS type and version
 * - Up time
 * - CPU info (type, number of cores, clock speed)
 */

import { getMacAddress } from './utils/getMacAddress';
import { getPerformanceData } from './utils/getPerformanceData';
import { io } from 'socket.io-client';

const socket = io('http://127.0.0.1:8181');

socket.on('connect', () => {
  console.log('Connected to socket.io server');

  // Client auth with single key value
  socket.emit('client-auth', 'pelusa');

  getPerformanceData().then((perfData) => {
    // console.log(perfData);
    // console.log(getMacAddress());
    socket.emit('init-performance-data', {
      ...perfData,
      macAddress: getMacAddress(),
    });
  });

  // Send performance data to server every second
  const performanceDataInterval = setInterval(async () => {
    const performanceData = await getPerformanceData();

    socket.emit('performance-data', performanceData);
  }, 1000);

  socket.on('disconnect', () => {
    // If the server restarts or the client reconnect to the server, the interval will be cleared
    clearInterval(performanceDataInterval);
  });
});
