/**
 * @file adapter
 * @desc 当一个业务逻辑在不同环境下的实现有区别时，可以把实现放到这里
 */
import { ua } from "@/utils";

const [appOrH5] = ua();
const adapter = require(`./lib/${appOrH5}`);
export default adapter;