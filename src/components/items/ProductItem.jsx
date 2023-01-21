import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

function ProductItem(props) {
  const [viewOpen, setViewOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const onLocalEditClicked = (ejob) => {
    ejob.preventDefault();
    props.onEditClicked(props.itemObj);
  };
  const onLocalDeleteClicked = (event) => {
    event.preventDefault()
    // setDeleteOpen(false);
    props.onDeleteClicked(props.itemObj);
  }
  return (
    <div >
      <div className='flex flex-row justify-between  w-full my-3  hover:outline  hover:outline-1 hover:rounded-lg hover:outline-orange-400'>
        <a className="w-full cursor-pointer" onClick={() => setViewOpen(true)} >
          <div className="item-body  text-left flex-col ">
            <h3 className='mx-2'>  <strong>Serial:</strong> {props.itemObj.serial}</h3>
            <p className='mx-2'> <strong>Connection:</strong>{props.itemObj.connection_type}</p>
            <p className='mx-2'> <strong>ID:</strong>{props.itemObj.id}</p>
            <p className='mx-2'> <strong>Storage:</strong>{props.itemObj.storage_system}</p>
            <p className='mx-2'> <strong>Condition:</strong>{props.itemObj.condition}</p>
            <p className='mx-2'> <strong>Owner:</strong>{props.itemObj.owner}</p>
          </div>
        </a>
        <div className="div-container flex  my-auto">
          <button onClick={onLocalEditClicked} className='mx-2 bg-amber-400 rounded px-3 py-2 text-white text-sm hover:bg-amber-500'>Edit</button>
          <button onClick={() => setDeleteOpen(true)} className='mx-1 bg-red-700 rounded px-3 py-2 text-white text-sm hover:bg-red-800'>Delete</button>
        </div>

      </div>
      <hr />
      {/* MODAL CARD */}
      <Transition.Root show={viewOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setViewOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left  w-full">
                        <Dialog.Title as="h3" className="text-lg  leading-6 text-purple-800 font-bold text-center">
                          <p> Selected Item Information</p>
                        </Dialog.Title>
                        <div className="mt-2 text-left">
                          <p ><strong>Serial:</strong>{props.itemObj.serial}</p>
                          <p > <strong>Connection: </strong>{props.itemObj.connection_type}</p>
                          <p > <strong>Storage: </strong>{props.itemObj.storage_system}</p>
                          <p > <strong>Condition: </strong>{props.itemObj.condition}</p>
                          <p > <strong>Owner: </strong>{props.itemObj.owner}</p>
                          <p > <strong>Location: </strong>{props.itemObj.location}</p>
                          <p > <strong>Purchase Date: </strong>{props.itemObj.purchase}</p>
                          <p > <strong>I B: </strong>{props.itemObj.i_b}</p>
                          <p > <strong>I Max : </strong>{props.itemObj.i_max}</p>
                          <p > <strong>I N: </strong>{props.itemObj.i_n}</p>
                          <p > <strong>Seals: </strong>{props.itemObj.seals}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center outline-0 rounded-md bg-red-600 px-4 py-2 text-base font-medium text-white  hover:bg-red-700  sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setDeleteOpen(true)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center outline-0 rounded-md bg-amber-400 px-4 py-2 text-base font-medium text-white hover:bg-amber-500  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={onLocalEditClicked}
                    >
                      Edit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* DELETE CARD  MODAL*/}
      <Transition.Root show={deleteOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setDeleteOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
                    <Dialog.Title as="h3" className="text-lg  leading-6 text-purple-800 font-bold text-center">
                      <p> Do you really  want to delete this item?</p>
                    </Dialog.Title>
                  </div>
                  <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full  outline-0 rounded-md  bg-green-600 px-4 py-2 text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={onLocalDeleteClicked}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="inline-flex w-full outline-0 rounded-md  bg-red-600 px-4 py-2 text-white hover:bg-red-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setDeleteOpen(false)}
                    >
                      No
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
export default React.memo(ProductItem);
