import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import itemsServices from '../../services/itemsServices';

export default function ProductForm() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const onAddSuccess = (res) => {
    console.log(res);
    return navigate('/')
  }
  const onAddError = (err) => {
    console.log(err);
  }
  const onEditSuccess = (res) => {
    console.log(res);
    return navigate('/')
  }
  const onEditError = (err) => {
    console.log(err);
  }
  const setFormData = () => {
    formik.setFieldValue("serial", state.payload.serial);
    formik.setFieldValue("connection_type", state.payload.connection_type)
    formik.setFieldValue("storage_system", state.payload.storage_system)
    formik.setFieldValue("condition", state.payload.condition)
    formik.setFieldValue("owner", state.payload.owner)
    formik.setFieldValue("location", state.payload.location)
    formik.setFieldValue("manufacturer", state.payload.manufacturer)
    formik.setFieldValue("purchase", state.payload.purchase)
    formik.setFieldValue("i_max", state.payload.i_max)
    formik.setFieldValue("i_b", state.payload.i_b)
    formik.setFieldValue("i_n", state.payload.i_n)
    formik.setFieldValue("seals", state.payload.seals)
    formik.setFieldValue("id", state.payload.id)
  }
  const formik = useFormik({
    initialValues: {
      serial: '',
      connection_type: '',
      storage_system: '',
      condition: '',
      owner: '',
      location: '',
      manufacturer: '',
      purchase: '',
      i_max: '',
      i_b: '',
      i_n: '',
      seals: '',
      id: '',
    },
    onSubmit: state ? (values) => {
      console.log(values);
      itemsServices.edit(values.id, values).then(onEditSuccess).catch(onEditError)
    } :
      (values) => {
        itemsServices.add(values).then(onAddSuccess).catch(onAddError)
        console.log(values)
      },
  })
  useEffect(() => {
    if (state?.type === "ITEM_VIEW") {
      setFormData()
    }
  }, [state])

  return (
    <div className="flex flex-col  shadow-none items-center justify-start px-6  sm:w-9/12 mx-auto sm:h-screen sm:py-0">
      <div className="w-full bg-white rounded shadow-lg md:mt-0 sm:max-w-md xl:p-0  border">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 border">
          <h1 className="text-xl text-purple-800 font-bold leading-tight tracking-tight md:text-2xl ">
            {state ? `Edit Item with id: ${state.payload.id}` : "Create a New Item"}
          </h1>
          <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6" action="#">
            <div className='email-container'>
              <input
                type="text"
                name="serial"
                className="shadow-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm rounded  w-full p-1.5"
                placeholder="Serial"
                onChange={formik.handleChange}
                value={formik.values.serial} />
            </div>
            <input
              type="text"
              name="connection_type"
              className="shadow-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm rounded  w-full p-1.5"
              placeholder="Connection Type"
              onChange={formik.handleChange}
              value={formik.values.connection_type} />
            <div className='storage-container'>
              <input
                type="text"
                name="storage_system"
                className="shadow-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm rounded  w-full p-1.5"
                placeholder="Storage System"
                onChange={formik.handleChange}
                value={formik.values.storage_system} />
            </div>
            <div className='condition-container'>
              <input
                type="text"
                name="condition"
                className="shadow-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm rounded  w-full p-1.5"
                placeholder="Condition"
                onChange={formik.handleChange}
                value={formik.values.condition} />
            </div>
            <div className='owner-container'>
              <input
                type="text"
                name="owner"
                className="shadow-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm rounded  w-full p-1.5"
                placeholder="Owner"
                onChange={formik.handleChange}
                value={formik.values.owner}
              />
            </div>
            <div className='location-container'>
              <input
                type="text"
                name="location"
                className="shadow-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm rounded  w-full p-1.5"
                placeholder="Location"
                onChange={formik.handleChange}
                value={formik.values.location}
              />
            </div>
            <div className='manufacturer-container'>
              <input
                type="text"
                name="manufacturer"
                className="shadow-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm rounded  w-full p-1.5"
                placeholder="Manufacturer"
                onChange={formik.handleChange}
                value={formik.values.manufacturer}
              />
            </div>
            <div className='purchase-container'>
              <input
                type="text"
                name="purchase"
                className="shadow-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm rounded  w-full p-1.5"
                placeholder="Purchase"
                onChange={formik.handleChange}
                value={formik.values.purchase}
              />
            </div>
            <div className='i_max-container'>
              <input
                type="text"
                name="i_max"
                className="shadow-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm rounded  w-full p-1.5"
                placeholder="I max number"
                onChange={formik.handleChange}
                value={formik.values.i_max}
              />
            </div>
            <div className='i_b-container'>
              <input
                type="text"
                name="i_b"
                className="shadow-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm rounded  w-full p-1.5"
                placeholder="I B number"
                onChange={formik.handleChange}
                value={formik.values.i_b}
              />
            </div>
            <div className='i_n-container'>
              <input
                type="text"
                name="i_n"
                className="shadow-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm rounded  w-full p-1.5"
                placeholder="I N number"
                onChange={formik.handleChange}
                value={formik.values.i_n}
              />
            </div>
            <div className='seals-container'>
              <input
                type="text"
                name="seals"
                className="shadow-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm rounded  w-full p-1.5"
                placeholder="Seals number"
                onChange={formik.handleChange}
                value={formik.values.seals}
              />
            </div>

            {state ?
              (<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full  outline-0 rounded-md  bg-green-600 px-4 py-2 text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="inline-flex w-full outline-0 rounded-md  bg-red-600 px-4 py-2 text-white hover:bg-red-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => (navigate('/'))}
                >
                  Cancel
                </button>
              </div>) : (
                <button
                  type="submit"
                  className=" text-white shadow bg-orange-500 hover:bg-orange-600 rounded text-sm px-5 py-2.5 my-auto  text-center"
                >
                  Create
                </button>
              )
            }
          </form>
        </div>
      </div>
    </div>
  )
}
