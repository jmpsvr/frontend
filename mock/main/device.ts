import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultPageSuccess, resultSuccess } from '../_util';

const deviceList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      name: '@first',
      type: '1',
      area: '@cname()',
      createTime: '@datetime',
      remark: '@cword(10,20)',
    });
  }
  return result;
})();

const areaList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 3; index++) {
    result.push({
      id: `${index}`,
      deptName: ['三楼机房', '四楼机房', '西小院机房'][index],
      orderNo: index + 1,
      createTime: '@datetime',
      remark: '@cword(10,20)',
      'status|1': ['0', '0', '1'],
      children: (() => {
        const children: any[] = [];
        for (let j = 0; j < 4; j++) {
          children.push({
            id: `${index}-${j}`,
            deptName: ['101', '202', '303', '404'][j],
            orderNo: j + 1,
            createTime: '@datetime',
            remark: '@cword(10,20)',
            'status|1': ['0', '1'],
            parentDept: `${index}`,
            children: undefined,
          });
        }
        return children;
      })(),
    });
  }
  return result;
})();

export default [
  {
    url: '/basic-api/device/getDeviceList',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, deviceList);
    },
  },
  {
    url: '/basic-api/device/getAreaList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(areaList);
    },
  },
  {
    url: '/basic-api/device/deviceExist',
    timeout: 500,
    method: 'post',
    response: ({ body }) => {
      const { device } = body || {};
      if (device && device.indexOf('admin') !== -1) {
        return resultError('该字段不能包含admin');
      } else {
        return resultSuccess(`${device} can use`);
      }
    },
  },
] as MockMethod[];
