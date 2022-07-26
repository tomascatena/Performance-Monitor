import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import serverStore from '@/server-store/server-store';

export const connectRedisAdapter = () => {
  const pubClient = createClient({ url: 'redis://localhost:6379' });
  const subClient = pubClient.duplicate();

  const io = serverStore.getSocketServerInstance();

  Promise.all([pubClient.connect(), subClient.connect()])
    .then(() => {
      io.adapter(createAdapter(pubClient, subClient));
      io.listen(7171);
    })
    .catch((error) => {
      console.log('Error connecting to Redis', error);
    });
};
