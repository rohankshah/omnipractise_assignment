import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { publishNewPost } from "../actions/user-actions";

function FeedPage() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [newPost, setNewPost] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handlePublishPost() {
    dispatch(publishNewPost(newPost));
    setNewPost("");
    closeModal();
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-500"
                  >
                    Publish new post
                  </Dialog.Title>
                  <div className="mt-4">
                    <textarea
                      rows={5}
                      className="w-full border-2"
                      style={{ resize: "none" }}
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handlePublishPost}
                    >
                      Publish
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="lg:max-w-[600px] w-full mt-10">
        <div className="flex flex-col">
          <div
            className="rounded px-6 py-2 w-fit bg-pink-600 text-white cursor-pointer mt-10"
            onClick={openModal}
          >
            Write
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedPage;
