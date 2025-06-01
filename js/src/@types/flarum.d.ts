// 定义Flarum User类型的扩展
import { User } from 'flarum/common/models/User';

declare module 'flarum/common/models/User' {
  interface User {
    hasPermission(permission: string): boolean;
  }
}
