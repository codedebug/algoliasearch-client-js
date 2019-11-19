import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex, TaskStatusResponse } from '../..';

export const getTask = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasGetTask => {
  return {
    ...base,
    getTask(
      taskID: number,
      requestOptions?: RequestOptions
    ): Readonly<Promise<TaskStatusResponse>> {
      return base.transporter.read(
        {
          method: MethodEnum.Get,
          path: encode('1/indexes/%s/task/%s', base.indexName, taskID.toString()),
        },
        requestOptions
      );
    },
  };
};

export type HasGetTask = {
  readonly getTask: (
    taskID: number,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<TaskStatusResponse>>;
};
