// ©2024 Austin App House. All rights reserved.
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Elements from './elements';

const Notification = (type, event) => {
  switch (type) {
    case 'info':
      toast.info(<Elements event={event} />, {
        closeButton: false,
      });
      break;
    case 'success':
      toast.success(event.message, {
        closeButton: false,
      });
      break;
    case 'warning':
      toast.warn(event.message, {
        closeButton: false,
      });
      break;
      
    case 'error':
      toast.error(<Elements event={event} />, {
        closeButton: false,
      });
      break;
    default:
  }

  return (
    <div>
      <ToastContainer
        hideProgressBar
        newestOnTop
        autoClose={10000}
        style={{
          zIndex: 9999999,
        }}
      />
    </div>
  );
};

export default Notification;
