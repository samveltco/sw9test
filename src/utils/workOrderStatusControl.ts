export const workOrderStatusControl = (workOrderStatus: string) => (
  {
      beforeAssigned: workOrderStatus !== 'assigned'
          && workOrderStatus !== 'completed'
          && workOrderStatus !== 'approved'
          && workOrderStatus !== 'paid'
          && workOrderStatus !== 'deleted',
      workUncompleted: workOrderStatus !== 'completed'
          && workOrderStatus !== 'approved'
          && workOrderStatus !== 'paid',
      assigned: workOrderStatus === 'assigned',
      inWork: workOrderStatus === 'assigned' || workOrderStatus === 'completed',
      draft: workOrderStatus === 'draft',
      completed: workOrderStatus === 'completed',
      approved: workOrderStatus === 'approved',
      published: workOrderStatus === 'published',
      canceled: workOrderStatus === 'canceled',
      deleted: workOrderStatus === 'deleted',
  }
);
