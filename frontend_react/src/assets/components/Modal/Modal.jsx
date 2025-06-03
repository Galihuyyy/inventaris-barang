import React from 'react';

const Modal = ({ title, children, footer }) => {
  return (
    <div className={`fixed inset-0 bg-[rgba(0,0,0,.7)] flex items-center justify-center z-50`}>
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
        <div className="px-4 py-3 border-b text-lg font-semibold">
          {title}
        </div>

        <div className="px-4 py-4 text-sm text-gray-700">
          {children}
        </div>

        {footer && (
          <div className="px-4 py-3 border-t bg-gray-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
