import { message, notification } from 'ant-design-vue';
import { MessageApi } from 'ant-design-vue/lib/message';
import { NotificationArgsProps } from 'ant-design-vue/lib/notification';

import { SafeAny } from '@/core/types';

const proxyHandler = function (target: SafeAny, object: SafeAny, args: SafeAny[]) {
  console.log(args);
  return Reflect.apply(target, object, args);
};

export const Message: MessageApi = {
  success: new Proxy(message.success, {
    apply: proxyHandler
  }),
  error: new Proxy(message.error, {
    apply: proxyHandler
  }),
  info: new Proxy(message.info, {
    apply: proxyHandler
  }),
  warning: new Proxy(message.warning, {
    apply: proxyHandler
  }),
  warn: new Proxy(message.warn, {
    apply: proxyHandler
  }),
  loading: new Proxy(message.loading, {
    apply: proxyHandler
  }),
  open: message.open,
  config: message.config,
  destroy: message.destroy
};

export const Notification: {
  success(config: NotificationArgsProps): void;
  info(config: NotificationArgsProps): void;
  error(config: NotificationArgsProps): void;
  warning(config: NotificationArgsProps): void;
  warn(config: NotificationArgsProps): void;
  open(config: NotificationArgsProps): void;
  close(key: string): void;
  destroy(): void;
} = {
  success: new Proxy(notification.success, {
    apply: proxyHandler
  }),
  error: new Proxy(notification.error, {
    apply: proxyHandler
  }),
  info: new Proxy(notification.info, {
    apply: proxyHandler
  }),
  warning: new Proxy(notification.warning, {
    apply: proxyHandler
  }),
  warn: new Proxy(notification.warn, {
    apply: proxyHandler
  }),
  open: new Proxy(notification.open, {
    apply: proxyHandler
  }),
  close: notification.close,
  destroy: notification.destroy
};
