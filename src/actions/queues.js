const ns = "src/actions/queues";
export const ENQUEUE = `${ns}.ENQUEUE`;

export const enqueue = queue => ( { type: ENQUEUE, payload: queue } );