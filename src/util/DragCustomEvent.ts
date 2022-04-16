/*
 * @Date: 2022-04-15 23:14:37
 * @Author: handsome_anthony
 * @LastEditors: handsome_anthony
 * @Description: 拖拽的事件类
 */

import { reportError } from '@/util/error/index'

// 事件列表类型
interface EventListType {
  string: Array<Function>
}

class DragCustomEvent {
  private events: Array<EventListType> = [];

  // 订阅事件方法
  on(event: string, fn: Function) {
    let _this = this;
    // 如果对象中没有对应的 event 值，也就是说明没有订阅过，就给 event 创建个缓存列表
    // 如有对象中有相应的 event 值，把 fn 添加到对应 event 的缓存列表里
    (_this.events[event] || (_this.events[event] = [])).push(fn);
    return _this;
  }

  // 发布
  emit(event: string, ...args) {
    let _this = this;
    let cbs = _this.events[event];
    if (cbs) {
      // 这里只取回调函数，不取event
      let args = Array.prototype.slice.apply(arguments).slice(1);

      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(_this, args);
        } catch (e) {
          reportError(e);
        }
      }
    }

    return _this;
  }
}


export default DragCustomEvent;