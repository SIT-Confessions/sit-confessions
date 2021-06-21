import React, { Fragment, useRef } from "react";
import { useDispatch } from "react-redux";
import * as dayjs from "dayjs";
import { Dialog, Transition } from "@headlessui/react";
import { ApproveConfession, RejectConfession } from "../../api";
import { addNotification } from "../../actions";
import { v4 as uuidv4 } from "uuid";
import he from "he";

const ConfessionDetailsModal = (props) => {
  const dispatch = useDispatch();
  let open = props.isOpen;
  let data = props.data;

  const ShowNotification = (data) => {
    dispatch(addNotification(data));
  };

  const setOpen = () => {
    props.closeModal();
  };

  const approveConfession = async (id) => {
    const result = await ApproveConfession(id);
    props.closeModal();
    ShowNotification({
      id: uuidv4(),
      title: "It's a Success!!",
      message: result.data.msg,
      type: "success",
    });
  };

  const rejectConfession = async (id) => {
    const result = await RejectConfession(id);
    props.closeModal();
    ShowNotification({
      id: uuidv4(),
      title: "It's a Success!!",
      message: result.data.msg,
      type: "success",
    });
  };

  const decodeData = (data) => {
    if (data !== undefined) {
      return he.decode(data);
    } else {
      return "";
    }
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
                          {decodeData(data.text)}
                        </dd>
                      </div>
                      <div className="bg-white dark:bg-dark-gray px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-gray-700">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Submitted On
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-gray-100">
                          {dayjs(data.createdAt).format(
                            "D MMM YYYY, h:mm:ss A"
                          )}
                        </dd>
                      </div>
                      <div className="bg-white dark:bg-dark-gray px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-gray-700">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Status
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {(() => {
                            if (data.status === "APPROVED") {
                              if (data.isPostedToFB) {
                                return (
                                  <>
                                    <span className="px-2 mr-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-300 dark:text-green-900">
                                      Approved
                                    </span>
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-300 dark:text-blue-900">
                                      Posted
                                    </span>
                                  </>
                                );
                              } else if (data.isQueued) {
                                return (
                                  <>
                                    <span className="px-2 mr-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-300 dark:text-green-900">
                                      Approved
                                    </span>
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-pink-100 text-pink-800 dark:bg-pink-300 dark:text-pink-900">
                                      Queued
                                    </span>
                                  </>
                                );
                              } else {
                                return (
                                  <span className="px-2 mr-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-300 dark:text-green-900">
                                    Approved
                                  </span>
                                );
                              }
                            } else if (data.status === "PENDING")
                              return (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-300 dark:text-yellow-900">
                                  Pending Approval
                                </span>
                              );
                            else if (data.status === "REJECTED")
                              return (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-300 dark:text-red-900">
                                  Rejected
                                </span>
                              );
                          })()}
                        </dd>
                      </div>
                      {data.status === "APPROVED" ? (
                        <div className="bg-white dark:bg-dark-gray px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-gray-700">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Approved
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-gray-100">
                            {data.approvedBy}
                            <br />
                            {dayjs(data.approvedDate).format(
                              "D MMM YYYY, h:mm:ss A"
                            )}
                          </dd>
                        </div>
                      ) : (
                        data.status === "REJECTED" && (
                          <>
                            <div className="bg-white dark:bg-dark-gray px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-gray-700">
                              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Rejected
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-gray-100">
                                {data.rejectedBy}
                                <br />
                                {dayjs(data.rejectedDate).format(
                                  "D MMM YYYY, h:mm:ss A"
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
                          </>
                        )
                      )}
                      {data.isPostedToFB && (
                        <div className="bg-white dark:bg-dark-gray px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b dark:border-gray-700">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Facebook Post URL
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-gray-100">
                            <a
                              href={data.fbURL}
                              target="_blank"
                              className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-500 dark:hover:text-indigo-400"
                            >
                              {data.fbURL}
                            </a>
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-dark-gray-lighter px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {data.status === "PENDING" ? (
                  <div>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => rejectConfession(data._id)}
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => approveConfession(data._id)}
                      ref={approveButtonRef}
                    >
                      Approve
                    </button>
                  </div>
                ) : data.status === "REJECTED" ? (
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => approveConfession(data._id)}
                    ref={approveButtonRef}
                  >
                    Approve
                  </button>
                ) : null}
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:bg-dark-gray dark:hover:bg-dark-gray-lighter focus:outline-none focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
