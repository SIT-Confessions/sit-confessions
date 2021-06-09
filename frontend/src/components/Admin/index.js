import React, { Fragment, useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ConfessionDetailsModal from "./ConfessionDetailsModal";
import SummaryCard from "./SummaryCard";
import { GetAllConfessions } from "../../api";
import { getAllConfessions, setAllConfessions } from "../../actions";
import * as dayjs from "dayjs";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [confessionDetails, setConfessionDetails] = useState({});
  const confessions = useSelector((state) => state.allConfessions);
  const dispatch = useDispatch();

  useEffect(() => {
    let getData = async () => {
      let resultData = await GetAllConfessions();
      console.log("Test console from Admin", resultData);
      dispatch(setAllConfessions(resultData));
    };
    getData();
    console.log("conf", confessions);
  }, []);

  const SetDetailsOnModal = (data) => {
    setConfessionDetails((prevState) => {
      return data;
    });
    setOpen(true);
  };

  const closeDescriptionCard = () => {
    setOpen(false);
  };

  return (
    <div className="px-4 sm:px-0">
      <ConfessionDetailsModal
        isOpen={open}
        data={confessionDetails}
        closeModal={closeDescriptionCard}
      />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-5">
        Welcome to the dashboard, Admin!
      </h1>
      <SummaryCard />
      <div className="mt-5">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Confession ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Confession Preview
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Submitted
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {confessions.posts.map((confession) => (
                      <tr key={confession._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          #{confession._id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-900 max-w-lg truncate">
                            {confession.text}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {dayjs(confession.createdAt).format(
                            "D MMM YYYY, h:HH:ss A"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {confession.approved === true ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Approved
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Not Approved
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => SetDetailsOnModal(confession)}
                          >
                            View more
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
