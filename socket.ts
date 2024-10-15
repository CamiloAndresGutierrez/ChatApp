import { createConsumer } from '@rails/actioncable';
import localStorage from './src/utils/localStorage';

const authToken = localStorage.getAuthToken();
export const cable = createConsumer(`ws://localhost:3000/cable?token=${authToken}`);