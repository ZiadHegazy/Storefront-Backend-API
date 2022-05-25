import express from 'express';
import cors from 'cors';
import productMount from './handlers/ProductHandler';
import orderMount from './handlers/OrderHandler';
import userMount from './handlers/UserHandler';
const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cors());
productMount(app);
orderMount(app);
userMount(app);
app.listen(3000, function () {
  console.log('listening to port 3000');
});
export default app;
