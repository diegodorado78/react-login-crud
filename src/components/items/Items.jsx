import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import enerbitLogo from '../../assets/enerbit.svg'
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import itemsServices from '../../services/itemsServices'
import ProductItem from './ProductItem'

export default function Items() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsNumber, setItemsNumber] = useState(0);
  const [serialNumber, setSerialNumber] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  const navigate = useNavigate();
  const [pageState, setPageState] = useState({
    itemsArray: [],
    itemsComponents: [],
    filterObject: [],
    filterComponent: []
  })

  useEffect(() => {
    if (!serialNumber) {
      itemsServices.getAllNumber().then(onGetAllNumberSuccess).catch(onGetAllNumberError)
      itemsServices.getAll(currentPage - 1).then(onGetAllSuccess).catch(onGetAllError);
    } else {
      itemsServices.getBySerial(serialNumber).then(onGetBySerialSuccess).catch(onGetBySerialError)
    }
  }, [currentPage, serialNumber, isDeleted])

  const onGetAllSuccess = (res) => {
    const arrayNew = res.items
    setPageState((prev) => {
      const pd = { ...prev }
      pd.itemsArray = arrayNew;
      pd.itemsComponents = arrayNew.map(mapItem)
      return pd;
    })
  }

  const onGetAllError = (err) => { console.error(err); }
  const onGetAllNumberSuccess = (res) => {
    return setItemsNumber(res.total)
  }

  const onGetAllNumberError = (err) => {
    console.error(err)
  }
  //ISOLATED METHODS
  const pagOnChange = (current) => { setCurrentPage(current) }
  const mapItem = (item) => {
    return <ProductItem onEditClicked={onEditRequest} onDeleteClicked={onDeleteRequested} key={item.id} itemObj={item} />
  }

  const onGetBySerialSuccess = (res) => {
    const newObjArr = res.items
    setPageState((prev) => {
      const pd = { ...prev }
      pd.filterObject = newObjArr;
      pd.filterComponent = newObjArr.map(mapItem)
      return pd;
    })
  }

  const onGetBySerialError = (err) => {
    console.error(err);
  }
  //EDITING A ITEM
  const onEditRequest = useCallback((itemObj) => {
    const stateForTransport = { type: "ITEM_VIEW", payload: itemObj };
    navigate(`/items/${itemObj.id}`, { state: stateForTransport });

  });
  //DELETING AN ITEM
  const onDeleteRequested = useCallback((itemObj) => {
    const successHandler = getDeleteSuccessHandler(itemObj.id);
    itemsServices.deleteById(itemObj.id).then(successHandler).catch(onDeleteError);
  }, []);

  const getDeleteSuccessHandler = (idToDelete) => {
    return () => {
      setPageState((prev) => {
        const pd = { ...prev }
        pd.itemsArray = [...pd.itemsArray]
        const itemIndex = pd.itemsArray.filter((item) => item.id === idToDelete);
        pd.itemsArray.splice(itemIndex, 1)
        pd.itemsComponents = pd.itemsArray.map(mapItem)
        return pd
      })
      setIsDeleted((prev) => !prev)
    }
  }

  const onDeleteError = (err) => {
    console.error(err);
  }
  return (
    <>
      <div className='sm:w-10/12 bg-white mx-auto'>
        <div className="flex flex-row justify-between ">
          <img onClick={() => navigate('/items')} className="w-48 h-32 " src={enerbitLogo} alt="" />
          <button onClick={() => navigate('/items/new')} className='text-white bg-orange-500 rounded-lg px-4 h-10 py-1 my-auto mx-2 '> Add Product</button>
        </div>

        <h3 className=' sm:text-left font-bold'>Welcome, you are logged as Administrator</h3>
        <div className='flex flex-row content-center'>
          <p className='my-auto text-purple-800 font-bold'>Search bar</p>
          <input onChange={(e) => setSerialNumber(e.target.value)} className='p-2 w-10/12 m-4  rounded outline outline-2 outline-purple-800 ' type="text" placeholder='Find product by serial ' />
        </div>

        {pageState.itemsArray.length > 0 && !serialNumber &&
          <Pagination
            total={itemsNumber}
            pageSize={10}
            className="flex justify-center"
            current={currentPage}
            locale={locale}
            onChange={pagOnChange}
          />
        }
        <div className="products-container my-2 rounded-lg outline outline-1 outline-zinc-300 p-2 ">
          {pageState.itemsArray?.length > 0 && !serialNumber && pageState.itemsComponents}
          {serialNumber && pageState.filterComponent}
        </div>
      </div>
    </>

  )
}
