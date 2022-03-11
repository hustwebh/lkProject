import request from '@/utils/request';
import { SERVICEURL } from '@/utils/const';

export async function getUserMsg({
  current,
  pageSize,
}: {
  current: number;
  pageSize: number;
}) {
  return request(
    `${SERVICEURL}/api/v1/alluser?current=${current}&pageSize=${pageSize}`,
    {
      method: 'GET',
      requestType: 'form',
    },
  );
}
