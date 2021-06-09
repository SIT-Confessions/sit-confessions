import React, { Fragment, useRef } from "react";
import * as dayjs from "dayjs";
import { Dialog, Transition } from "@headlessui/react";
import { ApproveConfession, RejectConfession } from "../../api";

const ConfessionDetailsModal = (props) => {
  let open = props.isOpen;
  let data = props.data;

  const setOpen = () => {
    props.closeModal();
  };

  const approveConfession = (id) => {
    const result = ApproveConfession(id);
    console.log("printed from confession Modal", result);
    props.closeModal();
  };

  const rejectConfession = (id) => {
    const result = RejectConfession(id);
    props.closeModal();
  };

  const cancelButtonRef = useRef(null);
  const approveButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={approveButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 dark:bg-dark-gray-darkest dark:bg-opacity-80 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white border-0 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle md:max-w-2xl lg:max-w-4xl sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-black">
                <div className="bg-white dark:bg-dark-gray-light shadow overflow-hidden">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Confession Details
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                      View information about confession #{data._id}
                    </p>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700">
                    <dl>
                      <div className="bg-white dark:bg-dark-gray px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-gray-700">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Confession Message
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-gray-100 whitespace-pre-line">
                          {data.text}
                        </dd>
                      </div>
                      <div className="bg-white dark:bg-dark-gray px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-gray-700">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Submitted On
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-gray-100">
                          {dayjs(data.createdAt).format(
                            "D MMM YYYY, h:HH:ss A"
                          )}
                        </dd>
                      </div>
                      <div className="bg-white dark:bg-dark-gray px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-gray-700">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Status
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {data.status === "APPROVED" ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-300 dark:text-green-900">
                              Approved
                            </span>
                          ) : data.status === "PENDING" ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-300 dark:text-yellow-900">
                              Pending Approval
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-300 dark:text-red-900">
                              Rejected
                            </span>
                          )}
                        </dd>
                      </div>
                      <div className="bg-white dark:bg-dark-gray px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-gray-700">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Reason for Rejection
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-gray-100">
                          Explicit Content
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-dark-gray-lighter px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {data.status === "PENDING" ? (
                  <div>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => rejectConfession(data._id)}
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => approveConfession(data._id)}
                      ref={approveButtonRef}
                    >
                      Approve
                    </button>
                  </div>
                ) : data.status === "REJECTED" ? (
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => approveConfession(data._id)}
                    ref={approveButtonRef}
                  >
                    Approve
                  </button>
                ) : null}
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:bg-dark-gray dark:hover:bg-dark-gray-lighter focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ConfessionDetailsModal;
